# 🍽️ Dine Menu

> En modern och elegant plattform för digitala restaurangmenyer, där restauranger kan hantera sina maträtter och besökare enkelt kan upptäcka, söka och filtrera bland menyer.

![Dine Menu](https://placehold.co/1200x500/FBF8F0/C09721?text=Dine+Menu)

## ✨ Om projektet

**Dine Menu** är ett fullstackprojekt med fokus på att skapa en användarvänlig och skalbar plattform för restauranger och deras menyer.

Målet är att restaurangföretag ska kunna registrera sig, administrera sina menyer och publicera maträtter, medan vanliga användare kan utforska menyer från olika restauranger.

Projektet kombinerar en elegant användarupplevelse med rollbaserad åtkomst, autentisering och en tydlig arkitektur mellan frontend, tjänstelager och databas.

---

## 🚀 Funktioner

### För besökare och användare

- 🔎 Söka efter maträtter och beskrivningar
- 🗂️ Filtrera maträtter efter kategori
- 🏪 Filtrera efter restaurang – planerad funktion
- ↕️ Sortera maträtter
- ❤️ Spara maträtter som favoriter
- 📄 Pagination för maträttslistor
- 👤 Registrera konto och logga in
- 💬 Kommentera maträtter som inloggad användare
- 🔐 Återställa lösenord via e-post

### För administratörer

- ➕ Skapa maträtter
- ✏️ Redigera maträtter
- 🗑️ Ta bort maträtter
- 🗂️ Skapa, redigera och ta bort kategorier
- 🔒 Skyddade adminfunktioner
- 👥 Hantera åtkomst baserat på användarroll

### Planerad företagsfunktionalitet

- 🏢 Företagsregistrering
- 🏪 Restaurangprofiler
- 📋 Företag kan hantera sina egna menyer
- 👨‍🍳 Företag kan publicera och administrera maträtter
- 🌍 Användare kan upptäcka menyer från flera restauranger

---

## 🛠️ Tekniker

### Frontend

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Server Components och Client Components
- Server Actions
- Sonner för toast-notifikationer
- Lucide React för ikoner

### Backend och datalager

- Next.js API Routes
- Prisma ORM
- MySQL
- TiDB Cloud
- Better Auth
- Resend för e-postutskick
- Zod för validering

### Deployment

- Vercel
- TiDB Cloud
- Vercel Blob Storage

---

## 🏗️ Arkitektur

Projektet använder en lagerbaserad struktur för att separera ansvar och göra koden enklare att underhålla.

```text
UI / Components
      │
      ▼
Server Actions / API Routes
      │
      ▼
Services
      │
      ▼
Repositories
      │
      ▼
Prisma ORM
      │
      ▼
MySQL / TiDB Cloud
```

### Exempel på ansvarsfördelning

| Lager | Ansvar |
|---|---|
| Components | Presentation, formulär och användarinteraktion |
| Server Actions | Hantera klientanrop och uppdatera data |
| API Routes | Exponera backend-endpoints |
| Services | Affärslogik och samordning |
| Repositories | Kommunikation med databasen |
| Mappers | Konvertera databasobjekt till ViewModels |
| Schemas | Validering med Zod |
| Auth Guards | Kontrollera sessioner och användarbehörighet |

---

## 📁 Projektstruktur

```text
app/
├── api/
│   ├── auth/
│   ├── category/
│   ├── comment/
│   └── food/
├── login/
├── register/
└── ...

components/
├── food/
├── category/
├── menu/
├── sidebar/
└── ...

lib/
├── auth/
├── auth-guard/
├── email/
└── ...

services/
├── food-service.ts
├── category-service.ts
└── ...

repositories/
├── food-repository.ts
├── category-repository.ts
├── comment-repository.ts
└── favorite-repository.ts

prisma/
└── schema.prisma

types/
├── food.ts
├── category.ts
└── api-responses.ts
```

> Filstrukturen kan utvecklas över tid när fler funktioner och företagsroller introduceras.

---

## 🔐 Autentisering och säkerhet

Dine Menu använder **Better Auth** för autentisering med e-post och lösenord.

Projektet innehåller bland annat:

- Sessionsbaserad autentisering
- Skyddade routes
- Kontroll av administratörsbehörighet
- Inloggning och registrering
- Lösenordsåterställning
- Validering av användarinmatning
- Begränsning av kommentarsfunktioner till inloggade användare

Hemliga nycklar och anslutningssträngar ska lagras i miljövariabler och aldrig committas till Git.

---

## ⚙️ Kom igång lokalt

### 1. Klona projektet

```bash
git clone <repository-url>
cd dine-menu
```

### 2. Installera beroenden

```bash
npm install
```

### 3. Skapa miljövariabler

Skapa en `.env.local`-fil i projektets rot:

```env
DATABASE_URL="your-database-connection-string"

BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

RESEND_API_KEY="your-resend-api-key"

NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_LOGO_URL="your-public-logo-url"

BLOB_READ_WRITE_TOKEN="your-blob-token"
```

> Använd projektets faktiska miljövariabler och värden. Lägg aldrig riktiga nycklar i README-filen eller i versionshanteringen.

### 4. Kör Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

Om du behöver öppna Prisma Studio:

```bash
npx prisma studio
```

### 5. Starta utvecklingsservern

```bash
npm run dev
```

Öppna sedan:

```text
http://localhost:3000
```

---

## 🧪 Tillgängliga scripts

```bash
npm run dev       # Starta utvecklingsservern
npm run build     # Bygg projektet för produktion
npm run start     # Starta produktionsservern
npm run lint      # Kör linting
```

---

## 🎨 Design

Dine Menu använder en varm och elegant design med fokus på en premiumliknande restaurangupplevelse.

### Designprinciper

- Ljus och varm bakgrund
- Guldfärgade accenter
- Tydlig typografi
- Runda komponenter och kontroller
- Diskreta borders och skuggor
- Responsiv layout
- Tydliga loading-, error- och empty states

### Färgpalett

| Färg | Hex |
|---|---|
| Primär guld | `#C09721` |
| Ljus guld | `#E8DAB8` |
| Mörk guld | `#A77F18` |
| Varm bakgrund | `#FBF8F0` |

---

## 🗺️ Roadmap

- [x] Skapa och visa maträtter
- [x] Kategorier
- [x] Sökning och filtrering
- [x] Sortering
- [x] Pagination
- [x] Favoriter
- [x] Better Auth
- [x] Adminskydd
- [x] Kommentarsfunktion
- [x] Lösenordsåterställning
- [ ] Företagskonton
- [ ] Restaurangprofiler
- [ ] Menyer kopplade till restauranger
- [ ] Företagsspecifika behörigheter
- [ ] Publika restaurangsidor
- [ ] Utökad sökning mellan restauranger

---

## 📌 Projektets mål

Dine Menu utvecklas med målet att bli en plattform där restauranger kan digitalisera och administrera sina menyer på ett enkelt sätt.

Projektet fungerar även som ett praktiskt fullstackprojekt för att utveckla kunskaper inom:

- Modern React- och Next.js-utveckling
- TypeScript
- Backendarkitektur
- Databashantering med Prisma
- Autentisering och auktorisering
- API-design
- Validering
- Deployment och miljökonfiguration

---

## 👨‍💻 Utvecklare

Skapat av **David Söderberg**.

---

## 📄 Licens

Detta projekt är för närvarande ett privat utvecklingsprojekt. Lägg till en licens här om projektet senare ska publiceras som open source.
