
import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang = 'es' }) => {
  const content = {
    es: {
      rights: "Todos los derechos reservados."
    },
    en: {
      rights: "All rights reserved."
    }
  };

  return (
    <footer className="bg-stone-950 py-12 border-t border-stone-900 text-stone-500 text-xs font-mono uppercase tracking-widest">
      <div className="max-w-[95%] mx-auto px-4 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
        
        <div>
          <span className="block text-white mb-2">Edgar Roca</span>
          <span>&copy; 2026 {content[lang].rights}</span>
        </div>

        <div className="flex gap-8">
          <a href="https://www.linkedin.com/in/edgar-roca/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>

      </div>
    </footer>
  );
};
