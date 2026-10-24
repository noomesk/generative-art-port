import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  const langs = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {langs.map((lang, idx) => (
        <React.Fragment key={lang.code}>
          <button
            onClick={() => setLanguage(lang.code)}
            className={`px-2 py-1 transition-colors ${
              language === lang.code
                ? 'text-temporal-accent'
                : 'text-temporal-muted hover:text-temporal-text'
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
          {idx < langs.length - 1 && <span className="text-temporal-border">/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
