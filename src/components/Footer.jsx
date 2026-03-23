import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-temporal-border py-12 text-temporal-muted bg-temporal-bg">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="font-mono text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} noomesk. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" aria-label="Github" className="hover:text-temporal-text transition-colors">
            <Github size={20} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-temporal-text transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-temporal-text transition-colors">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
