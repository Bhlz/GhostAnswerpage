"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from "framer-motion";
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

      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/15 bg-black/40 px-4 py-3 shadow-[0_16px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl supports-[backdrop-filter]:bg-black/30 sm:px-6">
          <div className="flex items-center">
            <img
              src="/ghostanswer-logo.webp"
              alt="GhostAnswer"
              className="h-10 w-auto object-contain"
            />
          </div>
          <MagneticButton href="/downloads/ghostanswer-v1.0.0.zip" download>
            <Download className="h-4 w-4" />
            <span>Descargar</span>
          </MagneticButton>
        </div>
      </nav>

      <section className="relative z-10 mx-auto mt-0 flex w-full max-w-7xl flex-col items-center px-6 pb-20 pt-28 md:pt-32">
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

        <HeroDemo />

        <TiltCard className="mt-12 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal><Feature icon={<Terminal className="h-5 w-5" />} title="Comandos naturales" desc="/resumir, /traducir, /ideas… o tu propia sintaxis." /></Reveal>
            <Reveal delay={0.1}><Feature icon={<Shield className="h-5 w-5" />} title="Privacidad primero" desc="Tus claves y prompts locales; tú decides qué enviar." /></Reveal>
            <Reveal delay={0.2}><Feature icon={<Zap className="h-5 w-5" />} title="Ultrarrápida" desc="Atajos, overlay y respuestas en vivo sin romper tu flujo." /></Reveal>
          </div>
        </TiltCard>

        <CommandRibbon />
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
          <img
            src="/ghostanswer-logo.webp"
            alt="GhostAnswer"
            className="mb-4 h-12 w-auto object-contain"
          />
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

const RIBBON_ITEMS = [
  {
    eyebrow: "Selecciona",
    title: "Lo que ves se vuelve contexto al instante.",
    detail: "Texto real de tu pantalla, sin romper tu flujo.",
  },
  {
    eyebrow: "Invoca",
    title: "Un atajo limpio. Una respuesta precisa.",
    detail: "Sin pestañas nuevas, sin copiar y pegar entre ventanas.",
  },
  {
    eyebrow: "Recibe",
    title: "Overlay sutil, lectura inmediata, cero fricción.",
    detail: "Pensado para estudiar, trabajar y responder en segundos.",
  },
];

function CommandRibbon() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % RIBBON_ITEMS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const item = RIBBON_ITEMS[active];

  return (
    <div className="relative mt-10 w-full max-w-5xl">
      <div className="absolute inset-x-12 top-1/2 h-20 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-5 py-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:px-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            GhostAnswer Flow
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-white/55">
            <Pill>Contexto en vivo</Pill>
            <Pill>Sin cambiar de app</Pill>
            <Pill>Overlay discreto</Pill>
          </div>
        </div>

        <div className="relative mt-5 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[112px]"
            >
              <div className="text-xs uppercase tracking-[0.24em] text-white/38">{item.eyebrow}</div>
              <p className="mt-3 max-w-2xl text-xl font-medium leading-tight text-white sm:text-2xl">
                {item.title}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/58 sm:text-[15px]">
                {item.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2 self-start md:self-end">
            {RIBBON_ITEMS.map((entry, index) => (
              <button
                key={entry.eyebrow}
                type="button"
                aria-label={`Ver mensaje ${index + 1}`}
                onClick={() => setActive(index)}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  index === active ? "w-10 bg-white" : "w-2 bg-white/25 hover:bg-white/45"
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl">
      {children}
    </span>
  );
}

// Phases:
// 0: fade-in window
// 1: cursor glides to question
// 2: selection highlight grows over question
// 3: ⌘+K keys press
// 4: "Pensando…" visible (≥1s hold)
// 5: crossfade to answer
// 6: answer held + cursor moves to option B
// 7: click pulse on B
// 8: hold final state (B marked correct)
// 9: fade out, then reset to 0
const PHASE_DURATIONS = [600, 1400, 1100, 900, 1200, 500, 1300, 400, 1700, 900];

function HeroDemo() {
  const [phase, setPhase] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const total = PHASE_DURATIONS.length;
    const d = PHASE_DURATIONS[phase];
    const t = setTimeout(() => {
      setPhase((p) => (p + 1) % total);
    }, d);
    return () => clearTimeout(t);
  }, [phase, prefersReducedMotion]);

  const showKeys = phase === 3;
  const showPensando = phase === 4;
  const showAnswer = phase >= 5 && phase < 9;
  const optionBCorrect = phase >= 7 && phase < 9;
  const fadingOut = phase === 9;
  const clicking = phase === 7;

  // selection: hidden before phase 2, drag-reveal in phase 2, visible in phase 3, cleared after Cmd+K
  const selectionClip =
    phase < 2 ? "inset(0 100% 0 0)" : "inset(0 0% 0 0)";
  const selectionOpacity = phase === 2 || phase === 3 ? 1 : 0;

  // cursor: idle → arrive at question start → drag to question end → keys/overlay → option B
  const cursor =
    phase === 0
      ? { left: "82%", top: "82%" }
      : phase === 1
      ? { left: "6%", top: "23%" }
      : phase <= 5
      ? { left: "90%", top: "48%" }
      : { left: "28%", top: "54%" };

  return (
    <div aria-hidden="true" className="mt-12 w-full max-w-3xl px-2">
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{
          opacity: fadingOut ? 0 : 1,
          y: fadingOut ? 8 : 0,
          scale: fadingOut ? 0.99 : 1,
        }}
        transition={{ duration: fadingOut ? 0.8 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(80% 50% at 50% 0%, rgba(255,255,255,0.06), transparent 70%)",
          }}
        />

        {/* window chrome */}
        <div className="relative flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <div className="mx-auto rounded-md border border-white/5 bg-white/[0.04] px-3 py-0.5 text-[10px] tracking-wide text-white/40">
            Quiz · Civilizaciones
          </div>
          <div className="w-10" />
        </div>

        {/* ghost overlay (pensando / respuesta) */}
        <div className="pointer-events-none absolute inset-x-0 top-[54px] z-30 flex justify-center">
          <AnimatePresence mode="wait">
            {showPensando && (
              <motion.div
                key="pensando"
                initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[13px] font-medium tracking-wide text-white/80 ring-1 ring-white/10 backdrop-blur-md [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]"
              >
                <span>Pensando</span>
                <span className="inline-flex gap-0.5">
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.15 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  >
                    .
                  </motion.span>
                </span>
              </motion.div>
            )}
            {showAnswer && (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: -6, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="whitespace-nowrap rounded-full bg-black/40 px-3 py-1 text-[13px] font-medium tracking-wide text-white/90 ring-1 ring-white/10 backdrop-blur-md [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]"
              >
                La civilización sumeria, en Mesopotamia.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* body */}
        <div className="relative px-6 py-7 sm:px-9 sm:py-9">
          {/* question */}
          <div className="relative inline-block">
            <motion.span
              aria-hidden
              className="absolute inset-y-0 -left-1 -right-1 rounded bg-sky-400/35"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{
                clipPath: selectionClip,
                opacity: selectionOpacity,
              }}
              transition={{
                clipPath: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25 },
              }}
            />
            <p className="relative text-[13px] font-medium leading-snug text-white sm:text-[15px]">
              ¿A qué antigua civilización se atribuye el desarrollo del primer sistema de escritura conocido, el cuneiforme?
            </p>
          </div>

          {/* options */}
          <div className="mt-5 space-y-2">
            <Option letter="A" label="Egipcios" highlighted={false} />
            <Option letter="B" label="Sumerios" highlighted={optionBCorrect} />
            <Option letter="C" label="Griegos" highlighted={false} />
          </div>

          {/* pagination */}
          <div className="mt-6 flex items-center gap-3 text-[10px] text-white/35">
            <span>01</span>
            <div className="h-[2px] flex-1 rounded-full bg-white/10">
              <div className="h-full w-[8%] rounded-full bg-white/50" />
            </div>
            <span>12</span>
            <div className="ml-1 grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/60">
              →
            </div>
          </div>

          {/* cursor */}
          <motion.div
            className="pointer-events-none absolute z-40"
            initial={false}
            animate={{
              left: cursor.left,
              top: cursor.top,
              scale: clicking ? 0.82 : 1,
            }}
            transition={{
              left: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              top: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.18, ease: "easeOut" },
            }}
          >
            <CursorIcon />
            {/* click ripple */}
            <AnimatePresence>
              {clicking && (
                <motion.span
                  key="ripple"
                  className="absolute -left-2 -top-2 h-8 w-8 rounded-full border border-white/60"
                  initial={{ scale: 0.3, opacity: 0.8 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.div>

        </div>

        {/* keys overlay — positioned on the full window, above everything */}
        <AnimatePresence>
          {showKeys && (
            <motion.div
              key="keys"
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-2xl border border-white/20 bg-black/75 px-4 py-3 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-2xl"
            >
              <Key label="⌘" delay={0} />
              <span className="text-sm text-white/40">+</span>
              <Key label="K" delay={0.14} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-white/35">
        Demo · Así se ve en tu pantalla
      </p>
    </div>
  );
}

function Option({ letter, label, highlighted }: { letter: string; label: string; highlighted: boolean }) {
  return (
    <motion.div
      animate={{
        scale: highlighted ? 1.015 : 1,
        borderColor: highlighted ? "rgba(244,114,182,0.45)" : "rgba(255,255,255,0.08)",
        backgroundColor: highlighted ? "rgba(244,114,182,0.14)" : "rgba(255,255,255,0.03)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 rounded-full border px-3 py-2"
    >
      <motion.span
        animate={{
          backgroundColor: highlighted ? "rgba(244,114,182,0.35)" : "rgba(255,255,255,0.10)",
          color: highlighted ? "#ffe4ec" : "rgba(255,255,255,0.85)",
        }}
        transition={{ duration: 0.3 }}
        className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold"
      >
        {letter}
      </motion.span>
      <motion.span
        animate={{ color: highlighted ? "#ffe4ec" : "rgba(255,255,255,0.85)" }}
        transition={{ duration: 0.3 }}
        className="text-[13px] sm:text-sm"
      >
        {label}
      </motion.span>
      {highlighted && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-rose-400/30 text-[10px] text-rose-50"
        >
          ✓
        </motion.span>
      )}
    </motion.div>
  );
}

function Key({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.kbd
      initial={{ scale: 1, boxShadow: "0 0 0 rgba(255,255,255,0)" }}
      animate={{
        scale: [1, 0.88, 1],
        boxShadow: [
          "0 0 0 rgba(255,255,255,0)",
          "0 0 20px rgba(255,255,255,0.35)",
          "0 0 0 rgba(255,255,255,0)",
        ],
      }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="inline-grid h-9 min-w-[2.25rem] place-items-center rounded-xl border border-white/20 bg-white/10 px-2 font-sans text-sm font-semibold text-white"
    >
      {label}
    </motion.kbd>
  );
}

function CursorIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)]"
    >
      <path
        d="M4 2.5 L19.5 12 L13 13.6 L15.8 20.6 L12.5 22 L9.6 15 L4 18 Z"
        fill="white"
        stroke="black"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
