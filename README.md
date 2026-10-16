
# 🍽️ Dine Menu

> A platform for digital restaurant menus, where restaurants can manage their dishes and visitors can easily discover, search, and filter menus.

## ✨ About the Project

**Dine Menu** is a full-stack project focused on creating a user-friendly platform for restaurants and their menus.

The goal is to allow restaurant businesses to register, manage their menus, and publish dishes, while regular users can explore menus from different restaurants.

---

## 🚀 Features

### For Visitors and Users

- 🔎 Search for dishes and descriptions
- 🗂️ Filter dishes by category
- 🏪 Filter by restaurant — planned feature
- ↕️ Sort dishes
- ❤️ Save dishes as favorites
- 📄 Pagination for dish lists
- 👤 Register an account and log in
- 💬 Comment on dishes as a logged-in user
- 🔐 Reset passwords via email

### For Administrators

- ➕ Create dishes
- ✏️ Edit dishes
- 🗑️ Delete dishes
- 🗂️ Create, edit, and delete categories
- 🔒 Protected admin functionality
- 👥 Manage access based on user roles

### Planned Business Features

- 🏢 Business registration
- 🏪 Restaurant profiles
- 📋 Businesses can manage their own menus
- 👨‍🍳 Businesses can publish and manage dishes
- 🌍 Users can discover menus from multiple restaurants

---

## 🛠️ Technologies

### Frontend

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Server Components and Client Components
- Server Actions
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications
- [Lucide React](https://lucide.dev/) for icons

### Backend and Data Layer

- Next.js API Routes
- [Prisma ORM](https://www.prisma.io/)
- MySQL
- [TiDB Cloud](https://www.pingcap.com/tidb/)
- [Better Auth](https://www.better-auth.com/)
- [Resend](https://resend.com/) for email delivery
- [Zod](https://zod.dev/) for validation

### Deployment

- [Vercel](https://vercel.com/)
- [TiDB Cloud](https://www.pingcap.com/tidb/)
- [Vercel Blob](https://vercel.com/docs/vercel-blob) for file storage

---

## 🏗️ Architecture

The project uses a layered architecture to separate responsibilities and make the code easier to maintain.

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

### Separation of Responsibilities

| Layer | Responsibility |
|---|---|
| Components | Presentation, forms, and user interaction |
| Server Actions | Handle requests and update data |
| API Routes | Expose backend endpoints |
| Services | Business logic and coordination |
| Repositories | Database communication |
| Mappers | Convert database objects into ViewModels |
| Schemas | Data validation using Zod |
| Auth Guards | Verify sessions and user permissions |

---

## 📁 Project Structure

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

> The project structure may evolve over time as additional features and business roles are introduced.

---

## 🔐 Authentication and Security

Dine Menu uses **Better Auth** for authentication with email and password.

The application also includes protected administrative functionality and role-based access control.

---

## ⚙️ Getting Started Locally

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- Access to a MySQL-compatible database, such as TiDB Cloud

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dine-menu
```

Replace `<repository-url>` with your GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL="your-database-connection-string"

BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

RESEND_API_KEY="your-resend-api-key"

NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_LOGO_URL="your-public-logo-url"

BLOB_READ_WRITE_TOKEN="your-blob-token"
```

Replace the placeholder values with your actual configuration.

> **Security:** Never commit real API keys, database credentials, authentication secrets, or other sensitive environment variables to GitHub.

### 4. Generate Prisma Client and Run Migrations

```bash
npx prisma generate
npx prisma migrate dev
```

These commands generate the Prisma Client and apply database migrations to your development database.

### 5. Open Prisma Studio (Optional)

```bash
npx prisma studio
```

Prisma Studio allows you to inspect and manage database records through a graphical interface.

### 6. Start the Development Server

```bash
npm run dev
```

Open the application in your browser:

http://localhost:3000

---

## 👨‍💻 Developer

Created by **David Söderberg**.
