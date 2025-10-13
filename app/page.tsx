"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Download, Sparkles, Terminal, Shield, Zap, EyeOff, MousePointerClick, Keyboard } from "lucide-react";

export default function GhostAnswerLanding() {
  const [revealed, setRevealed] = useState(false);
  const hasInteracted = useRef(false);

  // Cursor spotlight
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    function revealOnce() {
      if (hasInteracted.current) return;
      hasInteracted.current = true;
      setRevealed(true);
    }
    const opts = { passive: true } as AddEventListenerOptions;
    window.addEventListener("mousemove", revealOnce, opts);
    window.addEventListener("touchstart", revealOnce, opts);
    window.addEventListener("keydown", revealOnce, opts);
    return () => {
      window.removeEventListener("mousemove", revealOnce);
      window.removeEventListener("touchstart", revealOnce);
      window.removeEventListener("keydown", revealOnce);
    };
  }, []);

  return (
    <main className="relative min-h-[100dvh] bg-black text-white overflow-hidden">
      <AnimatedGrid />
      <FloatingOrbs />

      {revealed && (
        <div
          className="pointer-events-none fixed inset-0 z-10 mix-blend-screen"
          style={{
            background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.08), transparent 60%)`,
          }}
        />
      )}

      <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/10">
            <EyeOff className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">GhostAnswer</span>
        </div>
        <MagneticButton href="/downloads/ghostanswer-v1.0.0.zip" download>
          <Download className="h-4 w-4" />
          <span>Descargar</span>
        </MagneticButton>
      </nav>

      <section className="relative z-10 mx-auto mt-4 flex w-full max-w-7xl flex-col items-center px-6 pb-20 pt-10 md:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl"
        >
          <Sparkles className="h-3.5 w-3.5" /> La única IA invisible
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-center text-4xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl"
        >
          Respuestas donde miras.
          <span className="block text-white/70">Sin cambiar de ventana.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-2xl text-center text-base text-white/70 md:text-lg"
        >
          GhostAnswer se activa con atajos y comandos. Copia lo que ves, pregunta al instante y aparece
          la respuesta justo en pantalla. Rápida, privada, <span className="italic">lamedor</span> y minimal.
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PrimaryCTA href="/downloads/ghostanswer-v1.0.0.zip" label="Descargar GhostAnswer" icon={<Download className="h-4 w-4" />} />
          <GlassButton href="#como-funciona" icon={<MousePointerClick className="h-4 w-4" />}>Ver cómo funciona</GlassButton>
        </div>

        <TiltCard className="mt-12 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal><Feature icon={<Terminal className="h-5 w-5" />} title="Comandos naturales" desc="/resumir, /traducir, /ideas… o tu propia sintaxis." /></Reveal>
            <Reveal delay={0.1}><Feature icon={<Shield className="h-5 w-5" />} title="Privacidad primero" desc="Tus claves y prompts locales; tú decides qué enviar." /></Reveal>
            <Reveal delay={0.2}><Feature icon={<Zap className="h-5 w-5" />} title="Ultrarrápida" desc="Atajos, overlay y respuestas en vivo sin romper tu flujo." /></Reveal>
          </div>
        </TiltCard>

        <Marquee className="mt-10 text-white/60">/resumir · /traducir · /ideas · /explicar · /mejorar · /reformular · /pasos · /codigo · /TODO → Personaliza tus propios comandos</Marquee>
      </section>

      <section id="como-funciona" className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-semibold sm:text-4xl">Cómo funciona</h2>
          <p className="mt-4 text-center text-white/70">
            Instala, pega tu <code className="rounded bg-white/10 px-1 py-0.5">OPENAI_API_KEY</code> y listo. Con un atajo, GhostAnswer
            captura el texto que tienes a la vista, lo envía a la IA y te devuelve una respuesta contextual, superpuesta sobre tu pantalla.
          </p>
          <ol className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            <Reveal y={16}><Step n={1} title="Activa" desc="Un atajo desde cualquier app." /></Reveal>
            <Reveal y={16} delay={0.08}><Step n={2} title="Pregunta" desc="Comandos o texto libre." /></Reveal>
            <Reveal y={16} delay={0.16}><Step n={3} title="Recibe" desc="Respuesta overlay, sin cambiar de ventana." /></Reveal>
          </ol>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-white/60">
            <Keyboard className="h-4 w-4" /> Atajo sugerido: <span className="rounded bg-white/10 px-2 py-1">Ctrl/⌘ + Shift + G</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <h3 className="text-2xl font-semibold">Descárgalo y prueba la IA invisible</h3>
          <p className="mt-2 text-white/70">Ligero, minimal, hecho para velocidad y foco.</p>
          <div className="mt-6 flex justify-center">
            <PrimaryCTA href="/downloads/ghostanswer-v1.0.0.zip" label="Descargar ahora" icon={<Download className="h-4 w-4" />} />
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60 backdrop-blur-xl md:flex-row">
          <div>© {new Date().getFullYear()} GhostAnswer. La IA invisible.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#como-funciona">Cómo funciona</a>
            <a className="hover:text-white" href="/downloads/ghostanswer-v1.0.0.zip" download>Descargar</a>
          </div>
        </div>
      </footer>

      <Veil revealed={revealed} />
    </main>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
        {icon}
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-white/70">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-center backdrop-blur-xl">
      <div className="mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full bg-white text-black font-bold">{n}</div>
      <div className="font-medium">{title}</div>
      <div className="mt-1 text-sm text-white/70">{desc}</div>
    </div>
  );
}

function Veil({ revealed }: { revealed: boolean }) {
  return (
    <div
      className={[
        "fixed inset-0 z-[60] bg-black transition-opacity duration-700",
        revealed ? "opacity-0 pointer-events-none" : "opacity-100"
      ].join(" ")}
    >
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-white/70"
        >
          <div className="mb-4 text-sm uppercase tracking-[0.2em]">GhostAnswer</div>
          <div className="text-center text-lg md:text-xl">Mueve el mouse o toca la pantalla para revelar</div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur-xl">
            <EyeOff className="h-4 w-4" /> IA invisible
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
        backgroundSize: "32px 32px",
        maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
      }}
    />
  );
}

function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[32rem] w-[32rem] rounded-full bg-white/5 blur-[120px]"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
    </>
  );
}

function MagneticButton({ children, href, download }: { children: React.ReactNode; href: string; download?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function onMove(e: React.MouseEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  }
  function onLeave() { x.set(0); y.set(0); }
  return (
    <motion.a
      href={href}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      className="group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-xl transition hover:bg-white/15 active:scale-[.98]"
    >
      {children}
      <span className="relative ml-1 block h-[2px] w-0 bg-white transition-all group-hover:w-6" />
    </motion.a>
  );
}

function PrimaryCTA({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      download
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:shadow-xl active:scale-[.98]"
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />
      {icon} {label}
    </a>
  );
}

function GlassButton({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
    >
      {icon} {children}
    </a>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  function onMove(e: React.MouseEvent) {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setRot({ x: py * -6, y: px * 6 });
  }
  function onLeave() { setRot({ x: 0, y: 0 }); }
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      className={className}
    >
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0, y = 10 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function Marquee({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
      <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap text-sm">
        <span className="mx-4">{children}</span>
        <span className="mx-4">{children}</span>
        <span className="mx-4">{children}</span>
      </div>
      <style jsx global>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
