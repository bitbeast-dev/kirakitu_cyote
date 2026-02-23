"use client";
import { useTranslation } from '@/lib/TranslationContext';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const { language, setLanguage, setShowLanguageModal } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe className="w-5 h-5 text-[#ca0408]" />
        <span className="text-2xl">{language === 'en' ? '🇬🇧' : '🇷🇼'}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
            <button
              onClick={() => { setLanguage('en'); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${language === 'en' ? 'bg-red-50' : ''}`}
            >
              <span className="text-2xl">🇬🇧</span>
              <span className="font-medium text-gray-800">English</span>
            </button>
            <button
              onClick={() => { setLanguage('rw'); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${language === 'rw' ? 'bg-red-50' : ''}`}
            >
              <span className="text-2xl">🇷🇼</span>
              <span className="font-medium text-gray-800">Kinyarwanda</span>
            </button>
            <button
              onClick={() => { localStorage.removeItem('language'); setShowLanguageModal(true); setIsOpen(false); }}
              className="w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 border-t border-gray-200 transition-colors"
            >
              Reset Language
            </button>
          </div>
        </>
      )}
    </div>
  );
}
