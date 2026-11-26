import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const links = [
  { href: '#about', key: 'nav.about' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#art', key: 'nav.art' },
  { href: '#contact', key: 'nav.contact' },
];

const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-temporal-border bg-temporal-bg/85 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between sm:border-x border-temporal-border">
        <a href="#hero" className="font-mono text-xl font-bold tracking-tighter hover:text-temporal-accent transition-colors text-temporal-text">
          AP
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-mono text-temporal-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-temporal-text transition-colors">{t(l.key)}</a>
          ))}
          <div className="pl-4 border-l border-temporal-border">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          className="md:hidden text-temporal-muted hover:text-temporal-text cursor-pointer p-1"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out border-t border-temporal-border bg-temporal-bg/95 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-5 font-mono text-sm text-temporal-muted">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
              className={`hover:text-temporal-text transition-all duration-300 uppercase tracking-widest ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
              }`}
            >
              {t(l.key)}
            </a>
          ))}
          <div className="pt-4 border-t border-temporal-border">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
