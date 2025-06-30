"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  people: number;
  date: string;
  time: string;
  specialRequests: string;
}

export function ReserverenModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [reservationData, setReservationData] = useState<ReservationData>({
    name: "",
    email: "",
    phone: "",
    people: 2,
    date: "",
    time: "",
    specialRequests: "",
  });
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [unavailableTables, setUnavailableTables] = useState<number[]>([]);
  const [reservedTables, setReservedTables] = useState<number[]>([]);
  const [reservedCountByTime, setReservedCountByTime] = useState<{ [key: string]: number }>({});

  // 20 tables, divided into 3 areas: play place, near kitchen, near windows
  const tables = [
    // Play place area (tables 1-6)
    { id: 1, x: 1, y: 1, area: "play" },
    { id: 2, x: 2, y: 1, area: "play" },
    { id: 3, x: 1, y: 2, area: "play" },
    { id: 4, x: 2, y: 2, area: "play" },
    { id: 5, x: 1, y: 3, area: "play" },
    { id: 6, x: 2, y: 3, area: "play" },
    // Near kitchen area (tables 7-12)
    { id: 7, x: 3, y: 1, area: "kitchen" },
    { id: 8, x: 3, y: 2, area: "kitchen" },
    { id: 9, x: 3, y: 3, area: "kitchen" },
    { id: 10, x: 4, y: 1, area: "kitchen" },
    { id: 11, x: 4, y: 2, area: "kitchen" },
    { id: 12, x: 4, y: 3, area: "kitchen" },
    // Near windows area (tables 13-20)
    { id: 13, x: 5, y: 1, area: "window" },
    { id: 14, x: 5, y: 2, area: "window" },
    { id: 15, x: 5, y: 3, area: "window" },
    { id: 16, x: 5, y: 4, area: "window" },
    { id: 17, x: 4, y: 4, area: "window" },
    { id: 18, x: 3, y: 4, area: "window" },
    { id: 19, x: 2, y: 4, area: "window" },
    { id: 20, x: 1, y: 4, area: "window" },
  ];

  const totalTables = tables.length;
  const { toast } = useToast();
  const timeSlots = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

  // Fetch unavailable tables and reserved count for each time slot
  useEffect(() => {
    const fetchReservations = async () => {
      if (reservationData.date) {
        try {
          const res = await fetch(`/api/reservations?date=${reservationData.date}`);
          if (!res.ok) throw new Error("Failed to fetch reservations");
          const data = await res.json();
          // Group by time
          const countByTime: { [key: string]: number } = {};
          data.forEach((r: any) => {
            countByTime[r.time] = (countByTime[r.time] || 0) + 1;
          });
          setReservedCountByTime(countByTime);
          // If time is selected, filter unavailable tables for that slot
          if (reservationData.time) {
            setUnavailableTables(data.filter((r: any) => r.time === reservationData.time).map((r: any) => r.table));
          } else {
            setUnavailableTables([]);
          }
        } catch (err) {
          setUnavailableTables([]);
          setReservedCountByTime({});
        }
      } else {
        setUnavailableTables([]);
        setReservedCountByTime({});
      }
    };
    fetchReservations();
  }, [step, reservationData.date, reservationData.time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reservationData.people >= 8) {
      toast({
        title: "Grote groep",
        description: "Voor groepen van meer dan 8 personen, neem contact op met het restaurant: +31 20 123 4567",
        variant: "destructive",
      });
      return;
    }
    if (!selectedTable) {
      toast({
        title: "Geen tafel geselecteerd",
        description: "Selecteer een beschikbare tafel.",
        variant: "destructive",
      });
      return;
    }
    try {
      // Genereer unieke 4-cijferige code
      function generateRandomCode() {
        return Math.floor(1000 + Math.random() * 9000);
      }
      let code = generateRandomCode();
      // Stuur code mee in de body
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...reservationData,
          table: selectedTable,
          code,
        }),
      });
      if (!res.ok) throw new Error("Failed to save reservation");
      toast({
        title: "Reservering bevestigd!",
        description: "U ontvangt een bevestigingsmail met alle details en annuleringsoptie.",
      });
      setIsOpen(false);
      setStep(1);
      setSelectedTable(null);
      setReservationData({
        name: "",
        email: "",
        phone: "",
        people: 2,
        date: "",
        time: "",
        specialRequests: "",
      });
    } catch (error) {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het maken van uw reservering. Probeer het opnieuw.",
        variant: "destructive",
      });
    }
  };

  function renderStep() {
    switch (step) {
      case 1:
        const isStep1Valid = reservationData.name.trim() !== "" && reservationData.email.trim() !== "";
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Naam *</Label>
              <Input
                id="name"
                value={reservationData.name}
                onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={reservationData.email}
                onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefoon</Label>
              <Input
                id="phone"
                type="tel"
                value={reservationData.phone}
                onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="bg-brand-orange text-white"
                disabled={!isStep1Valid}
              >
                Volgende
              </Button>
            </div>
          </div>
        );
      case 2:
        // Only allow up to 7 people for online reservation
        const maxOnlinePeople = 7;
        const isLargeGroup = reservationData.people > maxOnlinePeople;
        const isStep2Valid =
          reservationData.people > 0 &&
          reservationData.people <= maxOnlinePeople &&
          reservationData.date.trim() !== "" &&
          reservationData.time.trim() !== "";
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="people">Aantal personen *</Label>
              <Select
                value={reservationData.people.toString()}
                onValueChange={(value) => setReservationData({ ...reservationData, people: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "persoon" : "personen"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {isLargeGroup && (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-yellow-900 text-sm font-semibold flex flex-col items-center">
                <span>
                  Voor groepen van 8 personen of meer kunt u niet online reserveren. Neem alstublieft{" "}
                  <a href="/contact" className="underline text-brand-orange hover:text-brand-red">
                    contact
                  </a>{" "}
                  op met het restaurant.
                </span>
              </div>
            )}
            <div>
              <Label htmlFor="date">Datum *</Label>
              <Input
                id="date"
                type="date"
                value={reservationData.date}
                onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                required
                disabled={isLargeGroup}
              />
            </div>
            <div>
              <Label htmlFor="time">Tijd *</Label>
              <Select
                value={reservationData.time}
                onValueChange={(value) => setReservationData({ ...reservationData, time: value })}
                disabled={isLargeGroup}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer tijd" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => {
                    const reservedCount = reservedCountByTime[time] || 0;
                    const isFull = reservedCount >= totalTables;
                    return (
                      <SelectItem key={time} value={time} disabled={isFull} className={isFull ? "opacity-50" : ""}>
                        {time} {isFull ? "(vol)" : ""}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Terug
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                className="bg-brand-orange text-white"
                disabled={!isStep2Valid || isLargeGroup}
              >
                Volgende
              </Button>
            </div>
          </div>
        );
      case 3:
        const isStep3Valid = selectedTable !== null;
        return (
          <div className="space-y-4">
            <div className="mb-2 text-brand-brown font-semibold">Kies uw tafel</div>
            <div className="relative w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              {/* Blueprint grid with area backgrounds */}
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 gap-4 p-4">
                {/* Area backgrounds */}
                <div
                  className="col-span-2 row-span-3 bg-blue-50 rounded-lg opacity-60 z-0"
                  style={{ gridColumn: "1/3", gridRow: "1/4" }}
                />
                <div
                  className="col-span-1 row-span-3 bg-green-50 rounded-lg opacity-60 z-0"
                  style={{ gridColumn: "3/4", gridRow: "1/4" }}
                />
                <div
                  className="col-span-2 row-span-4 bg-yellow-50 rounded-lg opacity-60 z-0"
                  style={{ gridColumn: "4/6", gridRow: "1/5" }}
                />
                {/* Tables */}
                {tables.map((table) => {
                  const isUnavailable = unavailableTables.includes(table.id);
                  return (
                    <button
                      key={table.id}
                      type="button"
                      className={`flex items-center justify-center rounded-lg w-20 h-20 border-2 text-lg font-bold transition-all duration-150 z-20 ${
                        selectedTable === table.id
                          ? "bg-brand-orange text-white border-brand-red"
                          : table.area === "play"
                          ? "bg-blue-100 border-blue-300 hover:bg-blue-200"
                          : table.area === "kitchen"
                          ? "bg-green-100 border-green-300 hover:bg-green-200"
                          : "bg-yellow-100 border-yellow-300 hover:bg-yellow-200"
                      } ${isUnavailable ? "opacity-50 cursor-not-allowed" : ""}`}
                      style={{ gridColumn: table.x, gridRow: table.y }}
                      onClick={() => !isUnavailable && setSelectedTable(table.id)}
                      disabled={isUnavailable}
                    >
                      {table.id}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Area labels below blueprint */}
            <div className="flex justify-between px-4 mt-2 text-xs font-bold">
              <span className="text-blue-700">Speelhoek</span>
              <span className="text-green-700">Bij de keuken</span>
              <span className="text-yellow-700">Bij de ramen</span>
            </div>
            <div className="flex justify-between pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Terug
              </Button>
              <Button
                type="button"
                onClick={() => selectedTable && setStep(4)}
                className="bg-brand-orange text-white"
                disabled={!isStep3Valid}
              >
                Volgende
              </Button>
            </div>
          </div>
        );
      case 4:
        const isStep4Valid =
          reservationData.name.trim() !== "" &&
          reservationData.email.trim() !== "" &&
          reservationData.people > 0 &&
          reservationData.date.trim() !== "" &&
          reservationData.time.trim() !== "" &&
          selectedTable !== null;
        return (
          <div className="space-y-4">
            <div className="mb-2 text-brand-brown font-semibold">Bevestig uw reservering</div>
            <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2 border border-gray-200">
              <div>
                <span className="font-semibold">Naam:</span> {reservationData.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {reservationData.email}
              </div>
              {reservationData.phone && (
                <div>
                  <span className="font-semibold">Telefoon:</span> {reservationData.phone}
                </div>
              )}
              <div>
                <span className="font-semibold">Aantal personen:</span> {reservationData.people}
              </div>
              <div>
                <span className="font-semibold">Datum:</span> {reservationData.date}
              </div>
              <div>
                <span className="font-semibold">Tijd:</span> {reservationData.time}
              </div>
              <div>
                <span className="font-semibold">Tafelnummer:</span> {selectedTable ? selectedTable : "-"}
              </div>
              {reservationData.specialRequests && (
                <div>
                  <span className="font-semibold">Speciale verzoeken:</span> {reservationData.specialRequests}
                </div>
              )}
            </div>
            <div className="flex justify-between pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                Terug
              </Button>
              <Button type="submit" className="bg-brand-orange text-white" disabled={!isStep4Valid}>
                Bevestigen
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-brand-orange hover:bg-brand-red text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-gold"
        onClick={() => setIsOpen(true)}
        aria-label="Reserveer tafel"
      >
        <Calendar className="w-7 h-7" />
      </button>
      {/* Overlay Dialog */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setStep(1);
            setSelectedTable(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-brand-brown">Maak een reservering</DialogTitle>
            <DialogDescription>Stap {step} van 4</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {renderStep()}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
