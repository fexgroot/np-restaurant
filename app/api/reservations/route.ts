import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

function toStrapiDateTime(date: string, time: string) {
  if (!date || !time) return null;
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  const dt = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  return dt.toISOString();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  try {
    let filterUrl = `${NEXT_PUBLIC_STRAPI_URL}/api/reservations?`;
    if (date && time) {
      const isoDate = toStrapiDateTime(date, time);
      if (!isoDate) {
        return NextResponse.json({ error: "Invalid date or time" }, { status: 400 });
      }
      filterUrl += `filters[date][$eq]=${encodeURIComponent(isoDate)}`;
    } else if (date) {
      const start = new Date(date + "T00:00:00");
      const end = new Date(date + "T23:59:59");
      filterUrl += `filters[date][$gte]=${encodeURIComponent(
        start.toISOString()
      )}&filters[date][$lte]=${encodeURIComponent(end.toISOString())}`;
    }
    const strapiRes = await fetch(filterUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!strapiRes.ok) {
      return NextResponse.json({ error: "Failed to fetch from Strapi" }, { status: 500 });
    }
    const data = await strapiRes.json();
    const reservations = data.data.map((item: any) => ({
      ...item.attributes,
    }));
    console.log("Fetched reservations:", reservations);
    return NextResponse.json(reservations);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userAgent = req.headers.get("user-agent") || "";
    if (userAgent.toLowerCase().includes("bot")) {
      return NextResponse.json({ error: "Bots niet toegestaan" }, { status: 403 });
    }
    const body = await req.json();
    const { name, email, phone, people, date, time, table, code } = body;
    if (!name || !email) {
      return NextResponse.json({ error: "Naam en e-mail zijn verplicht" }, { status: 400 });
    }
    const isoDate = toStrapiDateTime(date, time);
    if (!isoDate) {
      return NextResponse.json({ error: "Invalid date or time" }, { status: 400 });
    }
    const payload = {
      name,
      email,
      phone,
      people,
      date: isoDate,
      table,
      code,
    };
    const strapiRes = await fetch(`${NEXT_PUBLIC_STRAPI_URL}/api/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: payload }),
    });
    if (!strapiRes.ok) {
      const error = await strapiRes.text();
      return NextResponse.json({ error: "Failed to save reservation", details: error }, { status: 500 });
    }
    const data = await strapiRes.json();
    const reservationCode = data?.data?.attributes?.code;
    const location = "Voorbeeldstraat 1, 1234 AB Amsterdam";
    const cancelUrl = `https://your-restaurant.com/cancel/${data.data.id}`;
    const dateObj = new Date(isoDate);
    const formattedDate = dateObj.toLocaleDateString("nl-NL", { year: "numeric", month: "2-digit", day: "2-digit" });
    const formattedTime = dateObj.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
    const msg = {
      to: email,
      from: "fexgroot@gmail.com",
      subject: "Uw reservering is bevestigd!",
      text: `Beste ${name},\n\nUw reservering is bevestigd.\n\nDetails:\nNaam: ${name}\nEmail: ${email}\nTelefoon: ${
        phone || "-"
      }\nAantal personen: ${people}\nDatum: ${formattedDate}\nTijd: ${formattedTime}\nTafelnummer: ${table}\nLocatie: ${location}\n\nUw toegangscode: ${reservationCode}\n\nAnnuleren? Gebruik deze link: ${cancelUrl}\n\nTot ziens!\n`,
      html: `<div style='font-family:sans-serif;max-width:500px;margin:auto;background:#fff;border-radius:16px;padding:32px 24px 24px 24px;border:1px solid #eee;'>
        <div style='text-align:center;margin-bottom:16px;'>
          <h2 style='color:#d97706;font-size:2rem;margin:0 0 8px 0;'>Uw reservering is bevestigd!</h2>
        </div>
        <p style='font-size:1.1rem;margin-bottom:16px;'>Beste <b>${name}</b>,<br>Uw reservering is bevestigd. Hieronder vindt u uw reserveringsgegevens en toegangscode:</p>
        <ul style='list-style:none;padding:0;font-size:1rem;margin-bottom:16px;'>
          <li><b>Naam:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Telefoon:</b> ${phone || "-"}</li>
          <li><b>Aantal personen:</b> ${people}</li>
          <li><b>Datum:</b> ${formattedDate}</li>
          <li><b>Tijd:</b> ${formattedTime}</li>
          <li><b>Tafelnummer:</b> ${table}</li>
          <li><b>Locatie:</b> ${location}</li>
        </ul>
        <div style='text-align:center;margin:32px 0;'>
          <div style='font-size:1.1rem;color:#333;margin-bottom:8px;'>Uw toegangscode:</div>
          <div style='display:inline-block;background:#f59e42;color:#fff;font-size:2.5rem;font-weight:bold;letter-spacing:0.3em;padding:16px 32px;border-radius:12px;box-shadow:0 2px 8px #f59e4233;'>${reservationCode}</div>
        </div>
        <p style='margin:24px 0 8px 0;'><b>Annuleren?</b> Gebruik deze link: <span style='color:#888'>${cancelUrl}</span></p>
        <p style='margin:0;'>Tot ziens!</p>
      </div>`,
    };
    try {
      await sgMail.send(msg);
    } catch (e: any) {
      console.error("SendGrid error", e, e?.response?.body);
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
