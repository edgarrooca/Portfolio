import React from 'react';
import { Language } from '../types';
import { Code2, PenTool } from 'lucide-react';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const stack = ["React", "TypeScript", "Node.js", "WebGL", "DaVinci Resolve", "Premiere Pro"];

  const content = {
    es: {
      manifesto: "( Manifiesto )",
      stack: "( Stack Tecnológico )"
    },
    en: {
      manifesto: "( The Manifesto )",
      stack: "( Tech Stack )"
    }
  };

  return (
    <section id="trayectoria" className="py-12 md:py-32 lg:py-48 bg-stone-950 text-stone-200 border-t border-stone-900/50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Changed grid-cols-1 lg:grid-cols-12 to md:grid-cols-12 to enable side-by-side on tablet */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Manifesto Column (Text) */}
          <div className="md:col-span-7 order-2 md:order-1">
            <span className="block text-xs font-mono text-stone-500 mb-6 uppercase tracking-widest">
              {content[lang].manifesto}
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-10 text-white">
              {lang === 'es' ? 'No soy una agencia.' : 'I am not an agency.'} <br/>
              <span className="text-stone-600 italic font-light">
                {lang === 'es' ? 'Soy un autor.' : 'I am an author.'}
              </span>
            </h2>

            <div className="space-y-8 text-base md:text-xl font-light text-stone-400 leading-relaxed max-w-2xl">
              <p>
                {lang === 'es' 
                  ? 'Internet está lleno de ruido. Para destacar, no necesitas gritar, necesitas contar una buena historia.' 
                  : 'The internet is full of noise. To stand out, you don\'t need to shout, you need to tell a good story.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Aplico los principios del cine al desarrollo web: ritmo, atmósfera y emoción. No diseño para usuarios, diseño para espectadores.'
                  : 'I apply cinema principles to web development: rhythm, atmosphere, and emotion. I don\'t design for users; I design for spectators.'}
              </p>
            </div>

            {/* Signature Area */}
            <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col md:flex-row gap-8 md:items-center justify-between">
               <div>
                  <span className="block text-[10px] font-mono text-stone-600 mb-4 uppercase tracking-widest">
                    {content[lang].stack}
                  </span>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-stone-500">
                    {stack.map(tech => (
                      <span key={tech} className="hover:text-stone-300 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
               </div>
               
               <div className="hidden md:block opacity-30 rotate-[-5deg]">
                 <span className="font-serif italic text-4xl text-stone-500">Edgar R.</span>
               </div>
            </div>

          </div>

          {/* Photo Column */}
          <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
             <div className="relative w-full max-w-[320px]">
                
                <div className="absolute -top-6 -right-6 w-full h-full border border-stone-800/50 hidden md:block"></div>
                <div className="absolute -bottom-6 -left-6 w-full h-full border border-stone-800/50 hidden md:block"></div>

                <div className="relative bg-stone-900 p-2 md:p-4 border border-stone-800 shadow-2xl">
                    <div className="aspect-[3/4] overflow-hidden grayscale contrast-125 brightness-90 relative">
                        <img 
                        src="https://i.ibb.co/bMgDRXnv/IMG-0436.jpg" 
                        alt="Edgar Roca" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out"
                        />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                        <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
                    </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
};