import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Sparkles } from 'lucide-react';

  const knowledge = [
  {
    q: ['who', 'about', 'angie'],
    a: "I'm Angie Plazas — a transdisciplinary Frontend & AI Engineer. I build at the intersection of generative art, creative coding, mathematics, web engineering and applied AI (agents, RAG, tool calling)."
  },
  {
    q: ['stack', 'tech', 'skills'],
    a: "Core: TypeScript, Next.js, React, Tailwind CSS, Node.js. Creative: WebGL/GLSL, Three.js, P5.js. AI: LLMs, Groq API, Vercel AI SDK, Agents, RAG, Tool Calling, MCP. Also exploring bioinformatics & audio processing."
  },
  {
    q: ['projects', 'work'],
    a: "Featured: Cellular Automata Engine (WebGL/GLSL), AI Code Assistant (Groq + Llama + Three.js), Anxiety Companion (FastAPI + React + LLM with guardrails), Genome Cleaner (bioinformatics CLI), Endmoda (fashion gallery)."
  },
  {
    q: ['ai', 'agent', 'rag'],
    a: "Actively building with agents, tool calling, RAG and MCP. Focus: turn manual flows into useful agentic tools with the right context (grounding > chat for everything)."
  },
  {
    q: ['contact', 'hire', 'available'],
    a: "Open to Frontend/AI-leaning roles. Reach me via the contact form or aplazasn@unal.edu.co. Portfolio: https://noomesk.vercel.app/"
  },
  {
    q: ['experience', 'epam', 'neoris'],
    a: "Junior Software Engineer (Trainee) at EPAM Systems / NEORIS (Jun–Oct 2026). Focus: Web Components with Lit/LitElement, Shadow DOM, Cells ecosystem, mixins, i18n and secure software + agentic AI applied to dev workflows."
  }
];

const findAnswer = (input) => {
  const text = input.toLowerCase();
  for (let i = 0; i < knowledge.length; i++) {
    const k = knowledge[i];
    for (let j = 0; j < k.q.length; j++) {
      if (text.includes(k.q[j])) {
        return k.a;
      }
    }
  }
  return "Grounded in my portfolio: I focus on Frontend + AI (agents, RAG, tool calling). Ask about stack, projects, AI work, experience or contact.";
};

const PortfolioAgent = () => {
  const [messages, setMessages] = useState([
    { role: 'agent', text: 'portfolio-agent:~$ ready. Ask me anything about Angie Plazas — stack, projects, AI work, experience...' }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || thinking) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      const ans = findAnswer(userMsg);
      setMessages((prev) => [...prev, { role: 'agent', text: ans }]);
      setThinking(false);
    }, 600);
  };

  return (
    <section id="portfolio-agent" className="py-32 border-b border-temporal-border bg-temporal-bg relative overflow-hidden">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-sm font-mono text-temporal-accent uppercase tracking-widest mb-4">
              02 // Portfolio Q&A Agent
            </h2>
            <h3 className="text-4xl md:text-5xl text-temporal-text font-medium tracking-tight mb-6">
              Ask the agent about my work
            </h3>
            <p className="text-lg md:text-xl text-temporal-muted max-w-2xl leading-relaxed">
              A minimal <span className="text-temporal-text">RAG-inspired</span> terminal agent grounded on my portfolio, CV and projects. Built to demonstrate{' '}
              <span className="text-temporal-accent">context + retrieval</span> over generic chat.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-temporal-muted font-mono text-xs uppercase tracking-widest mt-6 md:mt-0">
            <Sparkles size={14} className="text-temporal-accent" />
            Agents • RAG • Tooling
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="border border-temporal-border bg-black/60 shadow-[0_0_60px_rgba(51,255,153,0.06)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-3 border-b border-temporal-border">
            <div className="flex items-center gap-2 text-temporal-muted">
              <Terminal size={16} />
              <span className="font-mono text-xs uppercase tracking-widest">noomesk/portfolio-agent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-temporal-border" />
              <span className="h-2 w-2 rounded-full bg-temporal-border" />
              <span className="h-2 w-2 rounded-full bg-temporal-accent/60" />
            </div>
          </div>

          <div className="p-6 md:p-8 h-[320px] md:h-[380px] overflow-y-auto font-mono text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-4">
                {msg.role === 'user' ? (
                  <div className="flex gap-3">
                    <span className="text-temporal-accent">guest@noomesk</span>
                    <span className="text-temporal-muted">~$</span>
                    <span className="text-temporal-text">{msg.text}</span>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <span className="text-temporal-accent">agent</span>
                    <span className="text-temporal-muted">:</span>
                    <span className="text-temporal-muted leading-relaxed">{msg.text}</span>
                  </div>
                )}
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3 text-temporal-muted">
                <span className="text-temporal-accent">agent</span>
                <span>:</span>
                <span className="animate-pulse">retrieving context...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-temporal-border px-6 py-4">
            <span className="font-mono text-sm text-temporal-accent">guest@noomesk:~$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ask about stack, projects, ai, experience..."
              className="flex-1 bg-transparent font-mono text-sm text-temporal-text placeholder:text-temporal-muted/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={thinking}
              className="p-2 text-temporal-muted hover:text-temporal-accent transition-colors disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </motion.div>

        <p className="mt-4 font-mono text-xs text-temporal-muted/60">
          *Mock grounded response for demo. Swappable to Groq + embeddings for live RAG.
        </p>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5 z-0 flex justify-start">
        <div className="w-[50vw] h-[50vw] bg-gradient-to-tr from-transparent to-temporal-accent/10 blur-[140px] transform -translate-x-1/3 -translate-y-1/4 rounded-full" />
      </div>
    </section>
  );
};

export default PortfolioAgent;
