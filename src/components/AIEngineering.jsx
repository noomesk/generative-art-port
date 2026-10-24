import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { Cpu, Database, Workflow, PlugZap } from 'lucide-react';

const items = [
  {
    icon: <Workflow size={18} />,
    title: 'Agentic Systems',
    desc: 'Goal-oriented agents with tool calling, structured outputs, memory and pragmatic guardrails for real tasks.'
  },
  {
    icon: <Database size={18} />,
    title: 'RAG & Context',
    desc: 'Grounding LLMs with curated project/repo data via embeddings, smart chunking and retrieval to keep answers precise and useful.'
  },
  {
    icon: <PlugZap size={18} />,
    title: 'MCP & Tool Use',
    desc: 'Exploring the Model Context Protocol to safely connect agents to real tools (files, APIs, repos) instead of just chatting.'
  },
  {
    icon: <Cpu size={18} />,
    title: 'Applied AI Products',
    desc: 'Turning agentic ideas into usable, product-focused apps with clean UX, orchestration and traceable logic.'
  }
];

const AIEngineering = () => {
  const { t } = useTranslation();
  return (
    <section id="ai-engineering" className="py-32 border-b border-temporal-border bg-temporal-bg relative overflow-hidden">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="text-sm font-mono text-temporal-accent uppercase tracking-widest mb-4">
              {t('ai.title')}
            </h2>
            <h3 className="text-4xl md:text-5xl text-temporal-text font-medium tracking-tight mb-6">
              {t('ai.heading')}
            </h3>
            <p className="text-lg md:text-xl text-temporal-muted max-w-2xl leading-relaxed">
              {t('ai.desc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-temporal-border border border-temporal-border overflow-hidden">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-temporal-bg p-8 group hover:bg-temporal-bg/80 transition-colors flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-temporal-accent">{item.icon}</div>
                <h4 className="text-temporal-text font-medium group-hover:text-temporal-accent transition-colors">
                  {item.title}
                </h4>
              </div>
              <p className="text-temporal-muted text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <p className="font-mono text-xs text-temporal-muted uppercase tracking-widest">
            Actively learning & building with:{' '}
            <span className="text-temporal-accent">
              Vercel AI SDK • Model Context Protocol • Embeddings • Vector Stores • Tool Calling
            </span>
          </p>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-5 z-0 flex justify-end">
        <div className="w-[60vw] h-[60vw] bg-gradient-to-tr from-temporal-accent/10 to-transparent blur-[140px] transform translate-x-1/4 -translate-y-1/3 rounded-full" />
      </div>
    </section>
  );
};

export default AIEngineering;
