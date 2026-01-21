import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Language } from '../types';

interface FAQProps {
  lang: Language;
}

export const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const content = {
    es: {
      title: 'Dudas Frecuentes',
      subtitle: 'Claridad ante todo.',
      items: [
        {
          question: "¿Cuánto tiempo tarda el desarrollo web?",
          answer: "La precisión requiere tiempo. Una One Page estratégica toma aprox. 2 semanas. Un sitio corporativo completo o E-commerce boutique, entre 4 y 6 semanas."
        },
        {
          question: "¿El código está optimizado para SEO?",
          answer: "Absolutamente. No solo diseño; estructuro la información (H1, Schema, Meta-tags) para que Google entienda y priorice tu negocio."
        },
        {
          question: "¿Qué tecnologías utilizas?",
          answer: "Trabajo con stacks modernos. React/Next.js para máximo rendimiento, o WordPress/Shopify customizado si necesitas autogestión total."
        },
        {
          question: "¿Ofreces mantenimiento?",
          answer: "Sí. Ofrezco planes de cuidado digital (actualizaciones, seguridad, monitoreo) para que tu inversión esté siempre protegida."
        }
      ]
    },
    en: {
      title: 'Common Questions',
      subtitle: 'Clarity first.',
      items: [
        {
          question: "How long does web development take?",
          answer: "Precision takes time. A strategic One Page takes approx. 2 weeks. A full corporate site or boutique E-commerce, between 4 to 6 weeks."
        },
        {
          question: "Is the code SEO optimized?",
          answer: "Absolutely. I don't just design; I structure information (H1, Schema, Meta-tags) so Google understands and prioritizes your business."
        },
        {
          question: "What tech stack do you use?",
          answer: "I work with modern stacks. React/Next.js for peak performance, or custom WordPress/Shopify if you need full CMS control."
        },
        {
          question: "Do you offer maintenance?",
          answer: "Yes. I offer digital care plans (updates, security, monitoring) so your investment is always protected."
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-stone-950 border-t border-stone-900">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-4">
            ( {t.title} )
          </h2>
          <p className="font-serif text-4xl text-white">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-0 border-t border-stone-800">
          {t.items.map((faq, index) => (
            <div key={index} className="border-b border-stone-800 group">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-8 text-left focus:outline-none"
              >
                <span className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-stone-400 group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <span className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${openIndex === index ? 'border-bronze-500 text-bronze-500 rotate-180 bg-stone-900' : 'border-stone-700 text-stone-500 group-hover:border-stone-500'}`}>
                  {openIndex === index ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-60 opacity-100 mb-8' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-stone-400 font-light leading-relaxed max-w-2xl text-lg">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};