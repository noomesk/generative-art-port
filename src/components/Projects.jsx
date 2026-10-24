import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const { language, t } = useTranslation();
  const [sortedProjects, setSortedProjects] = useState(projects);
  const [activeFocus, setActiveFocus] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const focusParam = params.get('focus');

    if (focusParam) {
      const lowerFocus = focusParam.toLowerCase();

      const displayNames = {
        'cr': t('projects.focusNames.cr'),
        'fs': t('projects.focusNames.fs'),
        'ai': t('projects.focusNames.ai')
      };

      setActiveFocus(displayNames[lowerFocus] || lowerFocus);

      const sorted = [...projects].sort((a, b) => {
        const aHasFocus = a.focusCategories?.includes(lowerFocus) ? 1 : 0;
        const bHasFocus = b.focusCategories?.includes(lowerFocus) ? 1 : 0;
        return bHasFocus - aHasFocus;
      });

      setSortedProjects(sorted);
    }
  }, [language]); // Re-run when language changes to translate activeFocus label

  return (
    <section id="projects" className="py-32 border-b border-temporal-border bg-temporal-bg">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border h-full">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="text-sm font-mono text-temporal-accent uppercase tracking-widest mb-4">
              {t('projects.title')}
            </h2>
            <h3 className="text-4xl text-temporal-text font-medium tracking-tight">
              {t('projects.heading')}
            </h3>
            {activeFocus && (
              <p className="text-temporal-muted mt-2 font-mono text-sm max-w-md">
                {t('projects.autoSorted')}: <span className="text-temporal-accent border border-temporal-accent/30 px-2 py-0.5 rounded-full ml-1">#{activeFocus}</span>
              </p>
            )}
          </div>

          <a
            href="https://github.com/noomesk"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center text-temporal-muted hover:text-temporal-text font-mono text-sm transition-colors mt-4 md:mt-0"
          >
            {t('projects.viewAll')} <ArrowUpRight size={16} className="ml-2" />
          </a>
        </div>

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-temporal-border border border-temporal-border overflow-hidden">
          <AnimatePresence>
            {sortedProjects.map((project, index) => {
              const currentCopy = project.copy?.[language] || project.copy?.['en'] || {};
              const role = currentCopy.role || project.role;
              const problem = currentCopy.problem || project.problem;
              const solution = currentCopy.solution || project.solution;
              const description = currentCopy.description || project.description;

              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01, y: -5 }}
                  className="group relative bg-temporal-bg p-8 md:p-12 hover:border-temporal-accent/50 transition-all flex flex-col h-full"
                >

                  {/* IN PROGRESS OVERLAY */}
                  {project.status === 'in-progress' && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <span className="text-white font-mono text-sm tracking-widest">
                        {t('projects.inProgress')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-2xl text-temporal-text font-medium group-hover:text-temporal-accent transition-colors">
                        {project.title}
                      </h4>
                      {role && (
                        <p className="text-xs font-mono text-temporal-accent uppercase tracking-widest mt-2">
                          {role}
                        </p>
                      )}
                    </div>

                    {project.status === 'live' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition"
                      >
                        <ArrowUpRight size={24} />
                      </a>
                    )}
                  </div>

                  <div className="mb-10 flex-grow space-y-6">
                    {problem && (
                      <div>
                        <p className="text-xs font-mono text-temporal-text uppercase tracking-widest mb-2">
                          {t('projects.problem')}
                        </p>
                        <p className="text-temporal-muted text-base leading-relaxed">
                          {problem}
                        </p>
                      </div>
                    )}
                    {solution && (
                      <div>
                        <p className="text-xs font-mono text-temporal-text uppercase tracking-widest mb-2">
                          {t('projects.solution')}
                        </p>
                        <p className="text-temporal-muted text-base leading-relaxed">
                          {solution}
                        </p>
                      </div>
                    )}
                    {!problem && !solution && description && (
                      <p className="text-temporal-muted text-base leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-temporal-muted px-3 py-1 border border-temporal-border rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* LINKS + CASE STUDY */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono text-temporal-text border border-temporal-accent/60 px-3 py-1 rounded-full hover:bg-temporal-accent hover:text-black transition cursor-pointer"
                    >
                      {t('projects.caseStudy')}
                    </button>
                    {project.status === 'live' && project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-temporal-accent border border-temporal-accent px-3 py-1 rounded-full hover:bg-temporal-accent hover:text-black transition"
                      >
                        {t('projects.live')}
                      </a>
                    )}
                    {project.github && project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-temporal-muted border border-temporal-border px-3 py-1 rounded-full hover:border-temporal-accent transition"
                      >
                        {t('projects.code')}
                      </a>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

        <a
          href="https://github.com/noomesk"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden inline-flex items-center text-temporal-accent mt-8 font-mono text-sm"
        >
          {t('projects.viewAll')} <ArrowUpRight size={16} className="ml-2" />
        </a>

      </div>
    </section>
  );
};

export default Projects;
