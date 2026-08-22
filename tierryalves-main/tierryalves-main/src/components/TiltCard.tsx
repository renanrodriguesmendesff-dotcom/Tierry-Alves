import { useRef, useState, type ReactNode } from "react";

/** Card that tilts toward the pointer (mouse) and lifts on touch. */
export function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<{ transform: string }>({ transform: "" });
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  function move(clientX: number, clientY: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (clientX - r.left) / r.width;
    const py = (clientY - r.top) / r.height;
    setGlow({ x: px * 100, y: py * 100, on: true });
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * intensity}deg) rotateY(${
        (px - 0.5) * intensity
      }deg) translateY(-6px)`,
    });
  }

  function reset() {
    setStyle({ transform: "" });
    setGlow((g) => ({ ...g, on: false }));
  }

  return (
    <div
      ref={ref}
      onMouseMove={(e) => move(e.clientX, e.clientY)}
      onMouseLeave={reset}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (t) move(t.clientX, t.clientY);
      }}
      onTouchEnd={reset}
      style={{ ...style, transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
      className={`relative overflow-hidden rounded-lg border border-border bg-card ${className}`}
    >
      <span
        aria-hidden
        style={{
          background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, var(--gold), transparent 70%)`,
          opacity: glow.on ? 0.14 : 0,
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
