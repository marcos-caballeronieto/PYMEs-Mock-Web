"use server";

import { cookies } from "next/headers";

export async function loginAdmin(password: string) {
  if (password === "admin123") {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "1", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 Semana
    });
    return { success: true };
  }
  return { success: false, error: "Contraseña incorrecta" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
}
