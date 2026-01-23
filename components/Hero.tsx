import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const content = {
    es: {
      role: 'Creative Developer & Filmmaker',
      // Convertimos tagline en array para manejarlo mejor responsive
      tagline: ['DISEÑO WEB', 'EDICIÓN DE VÍDEO', 'ESTRATEGIA SEO'],
      desc: 'Fusiono la sensibilidad cinematográfica con la arquitectura de software. No hago webs, construyo atmósferas digitales.',
      scroll: 'Deslizar'
    },
    en: {
      role: 'Creative Developer & Filmmaker',
      tagline: ['WEB DESIGN', 'VIDEO EDITING', 'SEO STRATEGY'],
      desc: 'Merging cinematic sensitivity with software architecture. I don\'t just make websites; I build digital atmospheres.',
      scroll: 'Scroll'
    }
  };

  const handleScrollClick = () => {
    const portfolioSection = document.getElementById('portafolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-stone-950
      justify-end pb-28                        /* Mobile: Anchor bottom */
      md:justify-start md:pt-32                /* Tablet: Pack content from top, eliminating gap between text and button */
      lg:justify-center lg:pt-0 lg:pb-0        /* Desktop: Center alignment */
    ">
      
      {/* Noise Texture Overlay - Reduced opacity and removed animation */}
      <div className="absolute inset-0 z-[1] opacity-[0.008] pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* 
          MOBILE DESCRIPTION - TOP RIGHT 
          Moved out of the bottom content flow.
          Positioned absolute top-24 (tighter to header) and aligned to right margin.
      */}
      <div 
        className="absolute top-24 right-[5%] max-w-[180px] text-right md:hidden z-20 animate-fade-in opacity-0"
        style={{ animationDelay: '0.8s', animationFillMode: 'forwards', willChange: 'opacity' }}
      >
        <p className="text-stone-500 font-light text-xs leading-relaxed">
          {content[lang].desc}
        </p>
      </div>

      {/* Main Content Wrapper 
          Ajuste Tablet/Desktop: 
          - md:mt-0 (Tablet): Reset margins.
          - lg:-mt-32 (Desktop): Standard negative margin for optical centering.
      */}
      <div className="relative z-10 max-w-[95%] mx-auto w-full mb-8 md:mb-0 md:mt-0 lg:-mt-32">
        
        {/* Kinetic Typography */}
        <div className="flex flex-col">
          <h1 
            className="font-serif text-[15vw] md:text-[13vw] leading-[0.8] text-white mix-blend-difference tracking-tighter animate-slide-up opacity-0 cursor-default select-none" 
            style={{ animationFillMode: 'forwards', willChange: 'transform, opacity' }}
          >
            <span className="block hover:translate-x-4 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">EDGAR</span>
            <span className="block text-right italic text-stone-600 hover:-translate-x-4 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">ROCA</span>
          </h1>
          
          {/* Service Tagline */}
          <div 
            className="flex flex-col items-end md:flex-row md:justify-end mt-8 md:mt-4 animate-fade-in opacity-0 gap-1 md:gap-0" 
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards', willChange: 'opacity' }}
          >
            {content[lang].tagline.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-[11px] md:text-[9px] lg:text-[11px] font-mono text-stone-400 md:text-stone-500 uppercase tracking-[0.25em] md:tracking-[0.25em] lg:tracking-[0.4em] text-right">
                  {item}
                </span>
                {/* Separator only on Desktop */}
                {index < content[lang].tagline.length - 1 && (
                  <span className="hidden md:inline-block mx-3 text-stone-700 md:text-[9px] lg:text-[11px]">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* 
              DESKTOP DESCRIPTION 
              Visible only on tablet/desktop (hidden md:flex).
              Positioned below the tagline.
          */}
          <div 
            className="hidden md:flex justify-end mt-6 md:mt-8 animate-fade-in opacity-0"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards', willChange: 'opacity' }}
          >
            <p className="text-stone-500 md:text-stone-400 font-light text-xs leading-relaxed md:text-lg lg:text-2xl text-right max-w-[300px] md:max-w-2xl">
              {content[lang].desc}
            </p>
          </div>

        </div>

      </div>

      {/* Scroll Indicator 
          - Mobile: absolute bottom-8
          - Tablet: static + self-center + margin top (md:mt-16) to stick to content without gap
          - Desktop: absolute bottom-12
      */}
      <div 
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2 
          md:static md:transform-none md:self-center md:mt-16
          lg:absolute lg:bottom-12 lg:left-1/2 lg:-translate-x-1/2 
          flex flex-col items-center gap-4 opacity-0 animate-fade-in cursor-pointer group z-20
        "
        style={{ animationDelay: '1.2s', animationFillMode: 'forwards', willChange: 'opacity' }}
        onClick={handleScrollClick}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-300 font-mono group-hover:text-white transition-colors duration-300">
          {content[lang].scroll}
        </span>
        <div className="animate-bounce">
          <ArrowDown className="h-4 w-4 text-stone-400 group-hover:text-white transition-colors duration-300" />
        </div>
      </div>

    </section>
  );
};
