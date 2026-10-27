import React from 'react';
import { motion } from 'framer-motion';
import HollowMetaballs from './HollowMetaballs';
import { useTranslation } from '../i18n/LanguageContext';

const About = () => {
  const { t } = useTranslation();

  const groups = [
    { key: 'visual', label: t('about.groups.visual') },
    { key: 'dev', label: t('about.groups.dev') },
    { key: 'ai', label: t('about.groups.ai') },
    { key: 'science', label: t('about.groups.science') },
    { key: 'other', label: t('about.groups.other') }
  ];

  return (
    <section id="about" className="py-32 border-b border-temporal-border bg-temporal-bg relative overflow-hidden">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border h-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4 relative min-h-[300px] flex">
            <div className="w-full flex-grow relative">
              <HollowMetaballs />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 font-sans flex flex-col justify-center"
          >
            <h2 className="text-sm font-mono text-temporal-accent uppercase tracking-widest mb-6">
              {t('about.title')}
            </h2>
            <h3 className="text-3xl md:text-4xl text-temporal-text font-prata mb-8 leading-tight tracking-tight uppercase">
              {t('about.heading')}
            </h3>
            
            <div className="space-y-6 text-temporal-muted text-lg leading-relaxed max-w-3xl">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              {t('about.focus') && <p>{t('about.focus')}</p>}
            </div>
            
            <div className="mt-16 pt-16 border-t border-temporal-border">
              <h4 className="font-mono text-temporal-text mb-6">{t('about.coreStack')}</h4>
              <div className="space-y-6">
                {groups.map(group => {
                  const tags = t(`about.tags.${group.key}`);
                  const tagList = Array.isArray(tags) ? tags : [];

                  return (
                    <div key={group.key}>
                      <p className="text-xs font-mono text-temporal-accent uppercase tracking-widest mb-3">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm text-temporal-muted">
                        {tagList.map(tech => (
                          <span key={tech} className="px-3 py-1 border border-temporal-border bg-temporal-bg hover:text-temporal-accent hover:border-temporal-accent transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Decorative vertical line */}
      <div className="absolute top-0 bottom-0 left-[33%] w-px bg-temporal-border hidden md:block"></div>
    </section>
  );
};

export default About;
