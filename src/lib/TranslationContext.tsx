"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from './en';
import { rw } from './rw';

type Language = 'en' | 'rw';
type Translations = typeof en;

interface TranslationContextType {
  t: Translations;
  language: Language;
  setLanguage: (lang: Language) => void;
  showLanguageModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLanguageState(savedLang);
    } else {
      setShowLanguageModal(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    setShowLanguageModal(false);
  };

  const t = language === 'en' ? en : rw;

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage, showLanguageModal, setShowLanguageModal }}>
      {mounted ? children : null}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}
