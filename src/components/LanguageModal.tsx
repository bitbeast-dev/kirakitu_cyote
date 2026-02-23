"use client";
import { useTranslation } from '@/lib/TranslationContext';

export default function LanguageModal() {
  const { showLanguageModal, setLanguage } = useTranslation();

  if (!showLanguageModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl animate-slide-up">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.jpg" alt="NEWBEICHINI" className="w-20 h-20 rounded-xl mb-4" />
          <h2 className="text-2xl font-bold text-[#ca0408] text-center">Welcome to NEWBEICHINI</h2>
          <p className="text-sm text-gray-600 text-center mt-2">Please select your preferred language</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setLanguage('en')}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#ca0408] hover:bg-red-50 transition-all group"
          >
            <span className="text-4xl">🇬🇧</span>
            <div className="flex-1 text-left">
              <div className="font-bold text-lg text-gray-800 group-hover:text-[#ca0408]">English</div>
              <div className="text-sm text-gray-500">Continue in English</div>
            </div>
          </button>

          <button
            onClick={() => setLanguage('rw')}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#ca0408] hover:bg-red-50 transition-all group"
          >
            <span className="text-4xl">🇷🇼</span>
            <div className="flex-1 text-left">
              <div className="font-bold text-lg text-gray-800 group-hover:text-[#ca0408]">Kinyarwanda</div>
              <div className="text-sm text-gray-500">Komeza mu Kinyarwanda</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
