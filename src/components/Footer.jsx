import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-temporal-border py-12 text-temporal-muted bg-temporal-bg">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="font-mono text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Angie Plazas. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="https://github.com/noomesk" target="_blank" rel="noopener noreferrer" aria-label="Github" className="hover:text-temporal-text transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/angie-paola-plazas-a008202a0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-temporal-text transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:aplazasn@unal.edu.co" aria-label="Email" className="hover:text-temporal-text transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
