import { Button } from "@/components/ui/button";

export default function Home() {
  // Comprobación rápida de variables de entorno en el servidor
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          SmartClinic OS 🩺
        </h1>

        <div className="space-y-4 text-left p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">Estado del Sistema:</p>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              ✅ Next.js App Router funcionando
            </li>
            <li className="flex items-center gap-2">
              ✅ Tailwind CSS cargado
            </li>
            <li className="flex items-center gap-2">
              {isSupabaseConfigured ? "✅" : "❌"} Supabase .env detectado
            </li>
          </ul>
        </div>

        {/* Si este botón se ve bonito (con hover y bordes), Shadcn está bien configurado */}
        <Button size="lg" className="w-full">
          Test de Componente Shadcn
        </Button>
      </div>
    </main>
  );
}
