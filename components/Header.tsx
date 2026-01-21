import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  const content = {
    es: { 
      portfolio: 'Proyectos', 
      about: 'Manifiesto', 
      contact: 'Contacto', 
      pricing: 'Planes'
    },
    en: { 
      portfolio: 'Work', 
      about: 'Manifesto', 
      contact: 'Contact', 
      pricing: 'Plans'
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Slightly higher threshold so the transition doesn't jitter at the very top
      setScrolled(scrollY > 50);
      setShowLogo(scrollY > window.innerHeight * 0.3);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-[padding] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}
      style={{ hideState: scrolled ? 'compact' : 'expanded' }}
    >
      
      {/* 
          Glassmorphism Layer 
          Duration is 300ms vs Header's 700ms to ensure 
          the background vanishes BEFORE the padding expansion finishes.
      */}
      <div 
        className={`absolute inset-0 bg-stone-950/60 backdrop-blur-lg border-b border-white/5 transition-opacity duration-300 ease-out pointer-events-none ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'opacity' }}
      />
      
      <div className="max-w-[95%] mx-auto flex justify-between items-center px-4 relative z-10">
        
        {/* Logo / Name */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className={`group flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="font-serif text-xl md:text-2xl tracking-tighter group-hover:opacity-70 transition-opacity leading-none">
            <span className="text-white">EDGAR</span>
            <span className="text-stone-400 italic ml-1.5">ROCA</span>
          </span>
        </a>

        {/* Desktop Nav - CHANGED TO LG BREAKPOINT FOR TABLET OPTIMIZATION */}
        <div className="hidden lg:flex items-center gap-8 lg:gap-12">
          {['portafolio', 'servicios', 'inversion', 'trayectoria', 'contacto'].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className="text-[10px] font-mono text-stone-300 hover:text-white uppercase tracking-[0.2em] transition-colors duration-300 relative group"
            >
              <span className="relative z-10">
                {id === 'portafolio' ? content[lang].portfolio : 
                 id === 'trayectoria' ? content[lang].about : 
                 id === 'contacto' ? content[lang].contact :
                 id === 'inversion' ? content[lang].pricing :
                 lang === 'es' ? 'Servicios' : 'Services'}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/50 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <div className="flex gap-2 text-[10px] font-mono border-l border-white/10 pl-6 ml-4">
            <button onClick={() => setLang('es')} className={`${lang === 'es' ? 'text-white' : 'text-stone-600 hover:text-white transition-colors duration-300'}`}>ES</button>
            <span className="text-stone-800">/</span>
            <button onClick={() => setLang('en')} className={`${lang === 'en' ? 'text-white' : 'text-stone-600 hover:text-white transition-colors duration-300'}`}>EN</button>
          </div>
        </div>

        {/* Mobile/Tablet Menu Button - CHANGED TO LG BREAKPOINT */}
        <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - z-index increased to 60 to sit ON TOP of the header, ensuring the close button is visible */}
      {isOpen && (
        <div className="fixed inset-0 bg-stone-950 z-[60] flex flex-col justify-center items-start pl-8 gap-6 animate-fade-in">
           {/* Explicit Close Button inside Overlay */}
           <button 
             className="absolute top-6 right-4 p-4 text-stone-400 hover:text-white transition-colors"
             onClick={() => setIsOpen(false)}
             aria-label="Close menu"
           >
             <X size={32} />
           </button>

           {['portafolio', 'servicios', 'inversion', 'trayectoria', 'contacto'].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className={`text-4xl font-serif transition-colors ${
                id === 'contacto' 
                  ? 'text-bronze-500 mt-4 border-l-2 border-bronze-500 pl-4' 
                  : 'text-white hover:text-stone-400'
              }`}
            >
               {id === 'portafolio' ? content[lang].portfolio : 
                id === 'trayectoria' ? content[lang].about : 
                id === 'contacto' ? content[lang].contact : 
                id === 'inversion' ? content[lang].pricing :
                lang === 'es' ? 'Servicios' : 'Services'}
            </a>
          ))}
           <div className="flex gap-4 mt-8 pt-8 border-t border-stone-800 w-32">
            <button onClick={() => {setLang('es'); setIsOpen(false)}} className={`text-xl font-mono ${lang === 'es' ? 'text-white' : 'text-stone-500'}`}>ES</button>
            <button onClick={() => {setLang('en'); setIsOpen(false)}} className={`text-xl font-mono ${lang === 'en' ? 'text-white' : 'text-stone-500'}`}>EN</button>
          </div>
        </div>
      )}
    </header>
  );
};