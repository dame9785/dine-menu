import { requireSession } from '@/lib/auth-guard';

export default async function AdminPage() {
  const session = await requireSession();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
      <p className="mt-2 text-gray-500">You are logged in.</p>
    </main>
  );
}
