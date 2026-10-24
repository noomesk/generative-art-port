import React, { createContext, useContext, useEffect, useState } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';

const translations = { en, es };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang');
      if (saved && translations[saved]) return saved;
      const browser = navigator.language?.slice(0, 2);
      if (browser === 'es') return 'es';
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (let i = 0; i < keys.length; i++) {
      value = value?.[keys[i]];
      if (value === undefined) break;
    }
    if (value === undefined) {
      let fallback = translations.en;
      for (let i = 0; i < keys.length; i++) {
        fallback = fallback?.[keys[i]];
        if (fallback === undefined) break;
      }
      return fallback ?? key;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
