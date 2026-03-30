import { Activity } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="p-2 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">SmartClinic <span className="text-zinc-500 font-normal">OS</span></span>
          </Link>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          {/* Subtle reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
          {children}
        </div>

        <p className="text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} SmartClinic OS. Tu salud, optimizada.
        </p>
      </div>
    </div>
  );
}
