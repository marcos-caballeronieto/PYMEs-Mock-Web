import { cookies } from "next/headers";
import LoginMock from "./LoginMock";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "1";

  if (!isAdmin) {
    return <LoginMock />;
  }

  return <AdminDashboard />;
}
