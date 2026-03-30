import { requireAdmin } from "@/lib/auth";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  // requireAdmin() redirige automáticamente si:
  // - No hay sesión activa → /auth/login?redirectTo=/admin
  // - El usuario no tiene role: 'admin' → /
  await requireAdmin();

  return <AdminDashboard />;
}
