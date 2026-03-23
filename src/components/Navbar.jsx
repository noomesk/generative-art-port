import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-temporal-border bg-temporal-bg/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between sm:border-x border-temporal-border">
        <div className="font-mono text-xl font-bold tracking-tighter hover:text-temporal-accent transition-colors cursor-pointer text-temporal-text">
          AP
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-mono text-temporal-muted">
          <a href="#about" className="hover:text-temporal-text transition-colors">About</a>
          <a href="#projects" className="hover:text-temporal-text transition-colors">Projects</a>
          <a href="#art" className="hover:text-temporal-text transition-colors">Art</a>
          <a href="#contact" className="hover:text-temporal-text transition-colors">Contact</a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden text-temporal-muted hover:text-temporal-text cursor-pointer">
          <Menu size={24} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
