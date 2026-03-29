"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BorderGlowCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative rounded-[2.5rem] bg-zinc-100 p-[2px] overflow-hidden group/glow shadow-lg shadow-zinc-200/50 hover:shadow-xl hover:shadow-primary/10 transition-shadow",
        className
      )}
    >
      {/* El halo de luz brillante que dibuja el borde */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out pointer-events-none"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.7), transparent 40%)`, // Azul vibrante
        }}
      />
      
      {/* Añadimos un segundo halo de otro color (p.ej. violeta) para hacer un efecto degradado mágico */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-500 ease-in-out pointer-events-none mix-blend-overlay"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.6), transparent 50%)`, // Violeta intermedio
        }}
      />
      
      {/* Fondo de borde estático neutro (para cuando no hay ratón cerca) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-200 to-zinc-100 opacity-50" />

      {/* Contenido interior (La tarjeta BLANCA opaca que tapa el centro) */}
      <div className="relative h-full w-full rounded-[calc(2.5rem-2px)] bg-white z-10 flex flex-col">
        {/* Glow interno súper suave dentro de la tarjeta blanca */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 ease-in-out pointer-events-none opacity-0 group-hover/glow:opacity-100 rounded-[calc(2.5rem-2px)] overflow-hidden"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.03), transparent 40%)`,
          }}
        />
        
        {/* Contenido inyectado */}
        <div className="relative z-20 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
