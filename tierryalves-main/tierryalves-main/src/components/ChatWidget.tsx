import { useEffect, useRef, useState } from "react";

const WHATSAPP = "https://wa.me/5533987079131";

type Msg = { from: "bot" | "user"; text: string };

const QUICK: { label: string; answer: string }[] = [
  {
    label: "Áreas de atuação",
    answer:
      "Atuamos em Direito Civil, Trabalhista, Previdenciário, de Família e Sucessões, Consumidor, Direito Empresarial e consultoria jurídica preventiva. Me diga o seu caso que eu te oriento.",
  },
  {
    label: "Agendar consulta",
    answer:
      "As consultas são atendidas no escritório (R. Israel Pinheiro, 2801 — Sl 106 e 109, Centro, Gov. Valadares) ou online. Toque em “Falar no WhatsApp” e já reservamos seu horário.",
  },
  {
    label: "Horário de atendimento",
    answer:
      "Segunda a sexta, das 08h às 18h. Sábados das 08h às 13h. Urgências são avaliadas a qualquer momento pelo WhatsApp.",
  },
  {
    label: "Endereço e como chegar",
    answer:
      "Edifício Fortaleza — R. Israel Pinheiro, 2801, Salas 106 e 109, Centro, Governador Valadares/MG, 35010-130. Há rota direta no Google Maps na seção “Escritório”.",
  },
  {
    label: "Quanto custa?",
    answer:
      "Os honorários seguem a tabela da OAB/MG e variam conforme a complexidade. A primeira conversa para entender o caso é sem compromisso.",
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Olá! Sou o assistente do escritório Tierry Alves. Como posso te ajudar hoje?",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing, open]);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 12000);
    return () => clearTimeout(t);
  }, []);

  function reply(userText: string, answer: string) {
    setMsgs((m) => [...m, { from: "user", text: userText }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: answer }]);
    }, 900);
  }

  function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    const hit = QUICK.find((q) =>
      q.label
        .toLowerCase()
        .split(" ")
        .some((w) => w.length > 4 && text.toLowerCase().includes(w)),
    );
    reply(
      text,
      hit
        ? hit.answer
        : "Obrigado pela mensagem! Para uma orientação precisa sobre isso, o ideal é falar direto com o Dr. Tierry no WhatsApp — o atendimento é rápido e sigiloso.",
    );
  }

  return (
    <>
      <button
        aria-label={open ? "Fechar chat" : "Abrir chat"}
        onClick={() => {
          setOpen((o) => !o);
          setPulse(false);
        }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lux transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {pulse && !open && (
          <span className="absolute inset-0 animate-glow-pulse rounded-full bg-primary/50" />
        )}
        <span className="relative text-lg">{open ? "✕" : "💬"}</span>
      </button>

      <div
        className={`fixed bottom-24 right-5 z-50 w-[min(92vw,22rem)] origin-bottom-right overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all duration-400 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="bg-deep border-b border-border px-4 py-3">
          <p className="font-display text-lg leading-none text-gold-gradient">
            Atendimento Tierry Alves
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            <span className="mr-1 inline-block h-2 w-2 animate-glow-pulse rounded-full bg-primary align-middle" />
            Normalmente responde em minutos
          </p>
        </div>

        <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`animate-rise-fade max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                m.from === "bot"
                  ? "bg-secondary text-secondary-foreground"
                  : "ml-auto bg-primary text-primary-foreground"
              }`}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="flex w-16 gap-1 rounded-lg bg-secondary px-3 py-3">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  style={{ animationDelay: `${d * 180}ms` }}
                  className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-primary"
                />
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-border px-3 py-3">
          {QUICK.map((q) => (
            <button
              key={q.label}
              onClick={() => reply(q.label, q.answer)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {q.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-border p-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escreva sua dúvida…"
            className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
          />
          <button
            onClick={send}
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Enviar
          </button>
        </div>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="shimmer block bg-deep py-3 text-center text-sm font-medium text-primary transition-colors hover:text-gold-soft"
        >
          Falar no WhatsApp →
        </a>
      </div>
    </>
  );
}
