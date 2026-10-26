import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

const PortfolioAgent = () => {
  const { t, language } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  // Load localized knowledge base
  const kbTranslation = t('agent.kb');
  const knowledge = Array.isArray(kbTranslation) ? kbTranslation : [];

  const findAnswer = (textInput) => {
    const text = textInput.toLowerCase();
    for (let i = 0; i < knowledge.length; i++) {
      const k = knowledge[i];
      if (k && Array.isArray(k.q)) {
        for (let j = 0; j < k.q.length; j++) {
          if (text.includes(k.q[j].toLowerCase())) {
            return k.a;
          }
        }
      }
    }
    return t('agent.fallback');
  };

  // Reset/Initialize messages when language changes
  useEffect(() => {
    setMessages([
      { role: 'agent', text: t('agent.ready') }
    ]);
  }, [language]);

  useEffect(() => {
    // Only scroll to bottom if there are user messages or active thinking to avoid jumping on load
    if (messages.length > 1 || thinking) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, thinking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || thinking) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setThinking(true);

    let ans;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg, language }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      ans = data.answer;
    } catch {
      // Sin API disponible (dev local, límite de cuota o red): usa la base local
      ans = findAnswer(userMsg);
    }

    setMessages((prev) => [...prev, { role: 'agent', text: ans }]);
    setThinking(false);
  };

  return (
    <section id="portfolio-agent" className="py-32 border-b border-temporal-border bg-temporal-bg relative overflow-hidden">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-sm font-mono text-temporal-accent uppercase tracking-widest mb-4">
              {t('agent.kicker')}
            </h2>
            <h3 className="text-4xl md:text-5xl text-temporal-text font-medium tracking-tight mb-6">
              {t('agent.heading')}
            </h3>
            <p className="text-lg md:text-xl text-temporal-muted max-w-2xl leading-relaxed">
              {t('agent.introA')} <span className="text-temporal-text">{t('agent.hl1')}</span>{' '}
              {t('agent.introB')}{' '}
              <span className="text-temporal-accent">{t('agent.hl2')}</span>{' '}
              {t('agent.introC')}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-temporal-muted font-mono text-xs uppercase tracking-widest mt-6 md:mt-0">
            <Sparkles size={14} className="text-temporal-accent" />
            {t('agent.tags')}
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
                <span className="animate-pulse">{t('agent.retrieving')}</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-temporal-border px-6 py-4">
            <span className="font-mono text-sm text-temporal-accent">guest@noomesk:~$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('agent.placeholder')}
              className="flex-1 bg-transparent font-mono text-sm text-temporal-text placeholder:text-temporal-muted/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={thinking}
              className="p-2 text-temporal-muted hover:text-temporal-accent transition-colors disabled:opacity-40 cursor-pointer"
              aria-label={t('agent.send')}
            >
              <Send size={16} />
            </button>
          </form>
        </motion.div>

        <p className="mt-4 font-mono text-xs text-temporal-muted/60">
          {t('agent.disclaimer')}
        </p>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5 z-0 flex justify-start">
        <div className="w-[50vw] h-[50vw] bg-gradient-to-tr from-transparent to-temporal-accent/10 blur-[140px] transform -translate-x-1/3 -translate-y-1/4 rounded-full" />
      </div>
    </section>
  );
};

export default PortfolioAgent;
