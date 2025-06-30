# NP-Restaurant

## Install

1. Zet ten eerste een punt voor het env bestand.

2. Run de volgende commando's om de app te draaien (--force helpt vaak bij errors):

```bash
npm i --force
```

3. Ga naar de backend map:

```bash
cd backend
npm i --force
npm run dev
```

4. Open een nieuwe terminal in de root van de app en draai:

```bash
npm run dev
```

5. De server (backend) draait op `http://localhost:1337` en de app (front-end) draait op `http://localhost:3000`.

6. Maak een gebruiker aan via `http://localhost:1337/admin`.

7. Zet daarna de permissies voor de `Activity` en `Reservation` collection type aan zodat iedereen (publiek) deze kan lezen. Dit doe je in de Strapi admin onder `Settings > Roles > Public > (Activity en daarna ook Reservation)`. Klik op `Select all` om alle permissies aan te zetten en klik daarna op `Save`.
