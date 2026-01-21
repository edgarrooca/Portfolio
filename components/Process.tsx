import React, { useState } from 'react';
import { Language } from '../types';

interface ProcessProps {
  lang: Language;
}

export const Process: React.FC<ProcessProps> = ({ lang }) => {
  const content = {
    es: {
      title: 'El Proceso',
      subtitle: 'De la idea a la pantalla.',
      steps: [
        { 
          id: '01', 
          title: 'El Café', 
          desc: 'Todo empieza con una conversación. Nos sentamos (virtual o presencialmente), nos tomamos un café y me cuentas tu historia. Sin tecnicismos. Solo tú, yo y una hoja en blanco.'
        },
        { 
          id: '02', 
          title: 'Diseño & Estrategia', 
          desc: 'Traduzco tus palabras en arquitectura visual. Definimos el "mood", la tipografía y cómo vamos a diferenciarte de tu competencia. Aquí es donde la magia empieza a tomar forma.'
        },
        { 
          id: '03', 
          title: 'Código Artesanal', 
          desc: 'Me encierro en el estudio. Sin constructores visuales pesados. Escribo código limpio, optimizado y animado a mano para que tu web vuele y Google la ame.'
        },
        { 
          id: '04', 
          title: 'Lanzamiento', 
          desc: 'Revisamos cada píxel. Hacemos las pruebas finales y pulsamos el botón de publicar. Te enseño a gestionar tu contenido y... ¡a celebrar!'
        }
      ]
    },
    en: {
      title: 'The Process',
      subtitle: 'From idea to screen.',
      steps: [
        { 
          id: '01', 
          title: 'The Coffee', 
          desc: 'It all starts with a conversation. We sit down (virtually or locally), grab a coffee, and you tell me your story. No jargon. Just you, me, and a blank sheet of paper.'
        },
        { 
          id: '02', 
          title: 'Design & Strategy', 
          desc: 'I translate your words into visual architecture. We define the mood, typography, and how we will set you apart from the competition. This is where magic takes shape.'
        },
        { 
          id: '03', 
          title: 'Crafted Code', 
          desc: 'I lock myself in the studio. No heavy page builders. I write clean, optimized, hand-animated code so your site flies and Google loves it.'
        },
        { 
          id: '04', 
          title: 'Launch', 
          desc: 'We check every pixel. We run final tests and hit the publish button. I teach you how to manage your content and... time to celebrate!'
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="bg-stone-950 py-12 md:py-24 lg:py-32 border-t border-stone-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative">
        
        {/* Header Centrado */}
        <div className="text-center mb-40 relative z-10">
           <h2 className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-4">
             ( {t.title} )
           </h2>
           <h3 className="font-serif text-4xl lg:text-5xl text-white">
             {t.subtitle}
           </h3>
        </div>

        {/* Línea Vertical Central */}
        <div className="absolute left-6 lg:left-1/2 top-40 bottom-0 w-px bg-gradient-to-b from-stone-950 via-stone-700 to-stone-950 lg:-translate-x-1/2 hidden lg:block opacity-70"></div>

        <div className="space-y-32 lg:space-y-0 relative">
          {t.steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className={`flex flex-col lg:flex-row items-center justify-between relative w-full ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                
                {/* BLOQUE DE CONTENIDO */}
                <div className={`w-full lg:w-5/12 relative group ${isEven ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'} pl-12 lg:pl-0 py-8`}>
                   
                   <div className={`hidden lg:block absolute top-16 h-px bg-stone-700 w-16 transition-all duration-500 group-hover:bg-bronze-500 group-hover:w-24 ${isEven ? 'right-0' : 'left-0'}`}></div>

                   <span className={`absolute -top-16 lg:-top-32 font-serif text-[10rem] lg:text-[20rem] leading-none text-stone-800 select-none z-0 opacity-40 transition-all duration-700 group-hover:text-stone-700 group-hover:opacity-50 ${isEven ? 'right-0 lg:-right-24' : 'left-0 lg:-left-24'}`}>
                     {step.id}
                   </span>

                   <div className="relative z-10 pt-4">
                      <h3 className="text-3xl lg:text-4xl font-serif text-white mb-6 group-hover:text-bronze-100 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-stone-400 font-light text-lg leading-relaxed">
                        {step.desc}
                      </p>
                   </div>

                   <div className="absolute left-0 top-0 bottom-0 w-px bg-stone-800 lg:hidden"></div>
                   <div className="absolute left-[-4px] top-12 w-2 h-2 rounded-full bg-stone-700 lg:hidden ring-4 ring-stone-950"></div>

                </div>

                <div className="w-full lg:w-5/12 hidden lg:block"></div>

                <div className="absolute left-1/2 top-16 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center">
                  <div className="w-2 h-2 bg-stone-950 border border-stone-600 rounded-full group-hover:border-bronze-500 group-hover:scale-150 transition-all duration-300"></div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};