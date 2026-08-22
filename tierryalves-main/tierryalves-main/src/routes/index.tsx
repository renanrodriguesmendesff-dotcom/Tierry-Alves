import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import portrait from "@/assets/tierry-portrait.webp.asset.json";
import suit from "@/assets/tierry-suit.webp.asset.json";
import { ChatWidget } from "@/components/ChatWidget";
import { TiltCard } from "@/components/TiltCard";
import { Reveal, useReveal } from "@/components/useReveal";

const TITLE = "Tierry Alves Advocacia | Advogado em Governador Valadares MG";
const DESC =
  "Escritório de advocacia e consultoria jurídica especializada em Governador Valadares/MG. Direito civil, trabalhista, previdenciário, família e empresarial. Atendimento humano e sigiloso.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const WHATSAPP = "https://wa.me/5533987079131";
const INSTAGRAM = "https://www.instagram.com/tierryalves.adv/";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=R.+Israel+Pinheiro,+2801+Sala+106+Centro+Governador+Valadares+MG";

const NAV = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "areas", label: "Áreas" },
  { id: "processo", label: "Como atuamos" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "escritorio", label: "Escritório" },
  { id: "contato", label: "Contato" },
];

const AREAS = [
  {
    icon: "⚖️",
    title: "Direito Civil",
    text: "Contratos, indenizações, cobranças, responsabilidade civil e defesa do seu patrimônio.",
  },
  {
    icon: "👷",
    title: "Direito Trabalhista",
    text: "Verbas rescisórias, horas extras, reconhecimento de vínculo, assédio e acordos.",
  },
  {
    icon: "🕊️",
    title: "Previdenciário",
    text: "Aposentadorias, auxílios, BPC/LOAS, revisões de benefício e recursos junto ao INSS.",
  },
  {
    icon: "🏛️",
    title: "Família e Sucessões",
    text: "Divórcio, guarda, alimentos, união estável, inventário e planejamento sucessório.",
  },
  {
    icon: "🛡️",
    title: "Direito do Consumidor",
    text: "Cobranças indevidas, negativação, bancos, planos de saúde, aéreas e telefonia.",
  },
  {
    icon: "🏢",
    title: "Empresarial e Consultoria",
    text: "Contratos, societário, compliance e consultoria preventiva para o seu negócio.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Primeiro contato",
    text: "Você conta o que aconteceu pelo WhatsApp ou no escritório. Escuta atenta, sem juridiquês.",
  },
  {
    n: "02",
    title: "Análise técnica",
    text: "Estudo dos documentos, das teses aplicáveis e da jurisprudência mais recente.",
  },
  {
    n: "03",
    title: "Estratégia clara",
    text: "Apresentamos caminhos, riscos, prazos e custos antes de qualquer decisão.",
  },
  {
    n: "04",
    title: "Atuação e acompanhamento",
    text: "Condução do caso com atualizações constantes — você nunca fica no escuro.",
  },
];

const STATS = [
  { value: 5, suffix: ",0", label: "Nota no Google" },
  { value: 100, suffix: "%", label: "Sigilo e ética" },
  { value: 24, suffix: "h", label: "Retorno de contato" },
  { value: 6, suffix: "+", label: "Áreas de atuação" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const { ref, visible } = useReveal<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1300, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to]);

  return (
    <span ref={ref} className="font-display text-5xl text-gold-gradient">
      {n}
      {suffix}
    </span>
  );
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function Portrait() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - r.top) / r.height - 0.5) * -10,
          y: ((e.clientX - r.left) / r.width - 0.5) * 10,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative mx-auto w-full max-w-md"
    >
      <div
        aria-hidden
        className="animate-ring-spin absolute -inset-6 rounded-full border border-dashed border-primary/30"
      />
      <div
        aria-hidden
        className="animate-glow-pulse absolute inset-4 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
        className="relative overflow-hidden rounded-t-[14rem] rounded-b-lg border border-primary/40 shadow-lux"
      >
        <img
          src={portrait.url}
          alt="Dr. Tierry Alves, advogado em Governador Valadares - MG"
          width={640}
          height={640}
          className={`block w-full object-cover ${visible ? "animate-portrait-in" : "opacity-0"}`}
        />
        <span
          aria-hidden
          className="animate-sweep pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent px-6 pb-5 pt-14">
          <p className="font-display text-2xl">Dr. Tierry Alves</p>
          <p className="text-xs tracking-[0.28em] text-primary uppercase">
            Advogado · OAB/MG
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-xs tracking-[0.35em] text-primary uppercase">{kicker}</p>
      <h2 className="mt-3 text-4xl md:text-5xl">{title}</h2>
      <div className="gold-rule mx-auto mt-5 max-w-[8rem]" />
      {text && <p className="mt-5 text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

function Home() {
  const progress = useScrollProgress();
  const [active, setActive] = useState("inicio");
  const [menu, setMenu] = useState(false);
  const spot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = spot.current;
      if (!el) return;
      el.style.opacity = "1";
      el.style.transform = `translate3d(${e.clientX - 180}px, ${e.clientY - 180}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="bg-deep relative min-h-screen">
      <div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-primary transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
      <div
        ref={spot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[360px] w-[360px] rounded-full opacity-0 transition-opacity duration-500 md:block"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 16%, transparent), transparent 65%)",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded border border-primary/50 font-display text-lg text-primary transition-transform duration-500 group-hover:rotate-[8deg]">
              TA
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg">Tierry Alves</span>
              <span className="block text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
                Advocacia & Consultoria
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`underline-gold text-sm transition-colors ${
                  active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="shimmer hidden rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-105 active:scale-95 sm:inline-block"
            >
              Falar agora
            </a>
            <button
              aria-label="Abrir menu"
              onClick={() => setMenu((m) => !m)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-border lg:hidden"
            >
              <span
                className={`h-px w-5 bg-foreground transition-transform duration-300 ${menu ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-foreground transition-transform duration-300 ${menu ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden border-t border-border/60 transition-[max-height,opacity] duration-500 lg:hidden ${
            menu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenu(false)}
                className="border-b border-border/40 py-3 text-sm text-muted-foreground transition-colors active:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden px-5 py-20 md:py-28">
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-xs tracking-[0.35em] text-primary uppercase">
                Governador Valadares · MG
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-5 text-5xl leading-[1.05] md:text-6xl">
                Advocacia <span className="text-gold-gradient">séria</span>,
                <br /> resultado com{" "}
                <span className="text-gold-gradient">estratégia</span>.
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-lg text-muted-foreground">
                Escritório de advocacia e consultoria jurídica especializada. Atendimento
                próximo, linguagem clara e defesa técnica em cada etapa do seu processo.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="shimmer rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  Consultar meu caso
                </a>
                <a
                  href="#areas"
                  className="rounded border border-border px-6 py-3 text-sm font-medium transition-colors duration-300 hover:border-primary hover:text-primary"
                >
                  Áreas de atuação
                </a>
              </div>
            </Reveal>
            <Reveal delay={480}>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="text-primary">★★★★★</span> 5,0 no Google
                </span>
                <span className="hidden h-4 w-px bg-border sm:block" />
                <span>Escritório que acolhe a comunidade LGBTQ+</span>
              </div>
            </Reveal>
          </div>

          <div className="animate-float-slow">
            <Portrait />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border/60 bg-background/40 py-4">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10">
              {[
                "Direito Civil",
                "Trabalhista",
                "Previdenciário",
                "Família e Sucessões",
                "Consumidor",
                "Empresarial",
                "Consultoria Preventiva",
              ].map((t) => (
                <span
                  key={t + k}
                  className="font-display text-xl text-muted-foreground/70"
                >
                  {t} <span className="text-primary">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sobre */}
      <section id="sobre" className="px-5 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <Reveal>
            <TiltCard intensity={6} className="shadow-soft">
              <img
                src={suit.url}
                alt="Dr. Tierry Alves em traje formal no escritório"
                width={640}
                height={640}
                loading="lazy"
                className="block w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </TiltCard>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs tracking-[0.35em] text-primary uppercase">Sobre</p>
              <h2 className="mt-3 text-4xl md:text-5xl">
                Quem defende <span className="text-gold-gradient">a sua causa</span>
              </h2>
              <div className="gold-rule mt-5 max-w-[8rem]" />
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-muted-foreground">
                Dr. Tierry Alves conduz cada atendimento com prontidão e transparência —
                do primeiro contato ao encerramento do processo. A atuação combina técnica
                jurídica apurada com uma escuta genuína: entender a vida por trás do caso é
                parte do trabalho.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-4 text-muted-foreground">
                O escritório, no Edifício Fortaleza, no Centro de Governador Valadares,
                atende clientes de toda a região do Vale do Rio Doce, presencialmente e de
                forma online.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Atendimento direto com o advogado",
                  "Comunicação sem juridiquês",
                  "Sigilo absoluto",
                  "Ambiente acolhedor e plural",
                ].map((t) => (
                  <li
                    key={t}
                    className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">
                      ✦
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-background/40 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 110}>
              <Counter to={s.value} suffix={s.suffix} />
              <p className="mt-2 text-xs tracking-[0.25em] text-muted-foreground uppercase">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Áreas */}
      <section id="areas" className="px-5 py-24">
        <SectionTitle
          kicker="Áreas de atuação"
          title="Soluções jurídicas completas"
          text="Toque ou passe o mouse em cada área para saber como podemos atuar no seu caso."
        />
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 90}>
              <TiltCard className="h-full">
                <div className="flex h-full flex-col p-7">
                  <span className="text-3xl transition-transform duration-500 group-hover:scale-110">
                    {a.icon}
                  </span>
                  <h3 className="mt-5 text-2xl">{a.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{a.text}</p>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-gold mt-6 self-start text-sm text-primary"
                  >
                    Consultar sobre isso
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="border-y border-border/60 bg-background/40 px-5 py-24">
        <SectionTitle kicker="Como atuamos" title="Um caminho previsível" />
        <div className="mx-auto mt-14 max-w-3xl">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="group relative flex gap-6 pb-10 pl-2">
                <div className="relative flex flex-col items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/50 font-display text-lg text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    {s.n}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                </div>
                <div className="pt-1.5">
                  <h3 className="text-2xl transition-colors duration-300 group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Avaliações */}
      <section id="avaliacoes" className="px-5 py-24">
        <SectionTitle kicker="Avaliações" title="O que dizem os clientes" />
        <Reveal delay={120}>
          <TiltCard intensity={5} className="mx-auto mt-14 max-w-2xl">
            <blockquote className="p-9 text-center">
              <p className="text-primary">★★★★★</p>
              <p className="mt-5 font-display text-2xl leading-relaxed">
                “Excelente profissional, demonstrou muita prontidão durante o atendimento,
                ao longo do processo e em quaisquer suportes que precisei.”
              </p>
              <footer className="mt-6 text-sm text-muted-foreground">
                Mariana de Souza Telles Bretas · avaliação no Google
              </footer>
            </blockquote>
          </TiltCard>
        </Reveal>
      </section>

      {/* Escritório */}
      <section id="escritorio" className="border-y border-border/60 bg-background/40 px-5 py-24">
        <SectionTitle kicker="Escritório" title="Onde nos encontrar" />
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-3">
          <Reveal>
            <TiltCard className="h-full">
              <div className="p-7">
                <h3 className="text-2xl">Endereço</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  R. Israel Pinheiro, 2801 — Salas 106 e 109
                  <br />
                  Edifício Fortaleza · Centro
                  <br />
                  Governador Valadares — MG, 35010-130
                </p>
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-gold mt-5 inline-block text-sm text-primary"
                >
                  Traçar rota →
                </a>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal delay={120}>
            <TiltCard className="h-full">
              <div className="p-7">
                <h3 className="text-2xl">Horários</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {[
                    ["Segunda a sexta", "08h – 18h"],
                    ["Sábado", "08h – 13h"],
                    ["Domingo", "Fechado"],
                  ].map(([d, h]) => (
                    <li key={d} className="flex justify-between border-b border-border/40 pb-2">
                      <span>{d}</span>
                      <span className="text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Urgências avaliadas a qualquer momento pelo WhatsApp.
                </p>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal delay={240}>
            <TiltCard className="h-full">
              <div className="p-7">
                <h3 className="text-2xl">Contato</h3>
                <ul className="mt-3 space-y-3 text-sm">
                  <li>
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-gold text-muted-foreground transition-colors hover:text-primary"
                    >
                      WhatsApp (33) 98707-9131
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+5533987079131"
                      className="underline-gold text-muted-foreground transition-colors hover:text-primary"
                    >
                      Ligar agora
                    </a>
                  </li>
                  <li>
                    <a
                      href={INSTAGRAM}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-gold text-muted-foreground transition-colors hover:text-primary"
                    >
                      @tierryalves.adv
                    </a>
                  </li>
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <div className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-lg border border-border">
            <iframe
              title="Mapa do escritório Tierry Alves Advocacia"
              src="https://www.google.com/maps?q=R.+Israel+Pinheiro,+2801,+Centro,+Governador+Valadares+-+MG,+35010-130&output=embed"
              loading="lazy"
              className="h-80 w-full grayscale transition-all duration-700 hover:grayscale-0"
            />
          </div>
        </Reveal>
      </section>

      {/* Contato */}
      <section id="contato" className="relative overflow-hidden px-5 py-24">
        <span
          aria-hidden
          className="animate-glow-pulse absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.35em] text-primary uppercase">Contato</p>
          <h2 className="mt-3 text-4xl md:text-5xl">
            Seu caso merece <span className="text-gold-gradient">atenção real</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Conte o que aconteceu. A primeira conversa serve para entender a sua situação e
            apontar o caminho jurídico possível — sem compromisso.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="shimmer rounded bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              Falar no WhatsApp
            </a>
            <a
              href="tel:+5533987079131"
              className="rounded border border-border px-7 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              (33) 98707-9131
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-border/60 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center text-xs text-muted-foreground">
          <span className="font-display text-lg text-primary">Tierry Alves Advocacia</span>
          <p>
            Advocacia e Consultoria Jurídica Especializada · Governador Valadares — MG
          </p>
          <p className="max-w-xl">
            Este site tem caráter meramente informativo, em conformidade com o Código de
            Ética e Disciplina da OAB. Não constitui oferta de serviços ou captação de
            clientela.
          </p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
