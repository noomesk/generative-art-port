import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Github } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  const { language, t } = useTranslation();

  const currentCopy = project.copy?.[language] || project.copy?.['en'] || {};
  const role = currentCopy.role || project.role;
  const problem = currentCopy.problem || project.problem;
  const solution = currentCopy.solution || project.solution;
  const highlights = currentCopy.highlights || project.highlights || [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y:  0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-temporal-border bg-temporal-bg shadow-[0_0_80px_rgba(51,255,153,0.08)]"
        >
          <div className="flex items-start justify-between border-b border-temporal-border p-6 md:p-8">
            <div>
              {role && (
                <p className="font-mono text-xs text-temporal-accent uppercase tracking-widest mb-2">
                  {role}
                </p>
              )}
              <h3 className="text-3xl md:text-4xl text-temporal-text font-medium tracking-tight">
                {project.title}
              </h3>
              {project.year && (
                <p className="font-mono text-xs text-temporal-muted uppercase tracking-widest mt-3">
                  {project.year}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-temporal-muted hover:text-temporal-text transition-colors cursor-pointer"
              aria-label={t('modal.close')}
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {problem && (
                <div>
                  <h4 className="font-mono text-xs text-temporal-text uppercase tracking-widest mb-3">
                    {t('modal.problem')}
                  </h4>
                  <p className="text-temporal-muted leading-relaxed">
                    {problem}
                  </p>
                </div>
              )}
              {solution && (
                <div>
                  <h4 className="font-mono text-xs text-temporal-text uppercase tracking-widest mb-3">
                    {t('modal.solution')}
                  </h4>
                  <p className="text-temporal-muted leading-relaxed">
                    {solution}
                  </p>
                </div>
              )}
            </div>

            {highlights && highlights.length > 0 && (
              <div>
                <h4 className="font-mono text-xs text-temporal-text uppercase tracking-widest mb-3">
                  {t('modal.highlights')}
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-temporal-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-temporal-accent/80 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="font-mono text-xs text-temporal-text uppercase tracking-widest mb-3">
                {t('modal.stack')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-temporal-muted px-3 py-1 border border-temporal-border rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-temporal-border">
              {project.status === 'live' && project.link && project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-temporal-text text-temporal-bg font-mono text-sm hover:bg-temporal-accent transition-colors"
                >
                  {t('modal.viewDemo')}
                  <ArrowUpRight size={16} />
                </a>
              )}
              {project.github && project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-temporal-border text-temporal-text font-mono text-sm hover:border-temporal-accent hover:text-white transition-colors"
                >
                  {t('modal.viewSource')}
                  <Github size={16} />
                </a>
              )}
              {project.status === 'in-progress' && (
                <span className="inline-flex items-center justify-center px-6 py-3 border border-temporal-border text-temporal-muted font-mono text-sm">
                  {t('modal.inProgress')}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
