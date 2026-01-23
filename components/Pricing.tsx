import React from 'react';
import { Check, ArrowRight, Sparkles, Box, Layout } from 'lucide-react';
import { Language } from '../types';

interface PricingProps {
  lang: Language;
}

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export const Pricing: React.FC<PricingProps> = ({ lang }) => {
  
  const content = {
    es: {
      plans: "( Planes )",
      title: "Calidad que se",
      titleItalic: "amortiza sola.",
      intro: "No vendo plantillas. Vendo activos digitales diseñados para durar, convertir y posicionar tu marca por encima del ruido.",
      labels: {
        mostPopular: "Más Popular",
        from: "Desde",
        start: "Empezar",
        footer: "¿Necesitas algo más específico?",
        talk: "Hablemos de una solución a medida."
      }
    },
    en: {
      plans: "( Plans )",
      title: "Quality that",
      titleItalic: "pays for itself.",
      intro: "I don't sell templates. I sell digital assets designed to last, convert, and position your brand above the noise.",
      labels: {
        mostPopular: "Most Popular",
        from: "From",
        start: "Start",
        footer: "Need something more specific?",
        talk: "Let's talk about a custom solution."
      }
    }
  };

  const t = content[lang];

  const getPlans = (l: Language): PricingPlan[] => {
    if (l === 'en') {
      return [
        {
          id: 'essence',
          name: 'Essence',
          tagline: 'Strategic Landing Page',
          price: '600€',
          description: 'It is not just a page, it is a visual sales funnel. Ideal for launching a product or service quickly.',
          features: [
            'Cinematic One Page Design',
            'GSAP Animations (Scroll)',
            'SEO Optimization',
            'Basic Persuasive Copywriting',
            'High Conversion Form',
            'Load Speed < 1s'
          ]
        },
        {
          id: 'identity',
          name: 'Identity',
          tagline: 'Corporate Website',
          price: '1.400€',
          description: 'Your digital headquarters. For companies looking for authority, trust, and a robust content management system.',
          features: [
            '4-6 Custom Pages',
            'Manageable CMS (Sanity/Strapi)',
            'SEO Optimized Blog',
            'CRM / Newsletter Integration',
            'Dark / Light Mode',
            'Digital Strategy Session',
          ],
          recommended: true
        },
        {
          id: 'ecosystem',
          name: 'Ecosystem',
          tagline: 'E-commerce / Custom',
          price: '2.500€',
          description: 'A sales machine that doesn\'t break. Cutting-edge technology for businesses that live on online sales.',
          features: [
            'Headless E-commerce (Shopify/Stripe)',
            '3D/WebGL Product Experience',
            'Custom Metrics Dashboard',
            'Custom Payment Gateways',
            'Email Automation',
            'Priority Support 30 days'
          ]
        }
      ];
    }
    return [
      {
        id: 'essence',
        name: 'Essence',
        tagline: 'Landing Page Estratégica',
        price: '600€',
        description: 'No es solo una página, es un embudo de ventas visual. Ideal para lanzar un producto o servicio rápidamente.',
        features: [
          'Diseño One Page Cinematic',
          'Animaciones GSAP (Scroll)',
          'Optimización SEO Avanzada',
          'Copywriting Persuasivo Básico',
          'Formulario de Alta Conversión',
          'Velocidad de Carga < 1s'
        ]
      },
      {
        id: 'identity',
        name: 'Identity',
        tagline: 'Web Corporativa',
        price: '1.400€',
        description: 'Tu sede digital. Para empresas que buscan autoridad, confianza y un sistema de gestión de contenidos robusto.',
        features: [
          '4-6 Páginas Personalizadas',
          'CMS Autogestionable (Sanity/Strapi)',
          'Blog Optimizado para SEO',
          'Integración con CRM / Newsletter',
          'Modo Oscuro / Claro',
          'Sesión de Estrategia Digital'
        ],
        recommended: true
      },
      {
        id: 'ecosystem',
        name: 'Ecosystem',
        tagline: 'E-commerce / A Medida',
        price: '2.500€',
        description: 'Una máquina de ventas que no se rompe. Tecnología punta para negocios que viven de la venta online.',
        features: [
          'E-commerce Headless (Shopify/Stripe)',
          'Experiencia de Producto 3D/WebGL',
          'Panel de Métricas a Medida',
          'Pasarelas de Pago Custom',
          'Automatización de Emails',
          'Soporte Prioritario 30 días'
        ]
      }
    ];
  };

  const plans = getPlans(lang);

  return (
    <section id="inversion" className="py-12 md:py-24 lg:py-32 bg-stone-950 relative overflow-hidden">
       {/* Background Light */}
       <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-stone-900 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="max-w-[95%] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-5">
                <h2 className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-4">{t.plans}</h2>
                <h3 className="font-serif text-4xl lg:text-5xl text-white mb-6">
                    {t.title} <br/><span className="italic text-stone-500">{t.titleItalic}</span>
                </h3>
                <p className="text-stone-400 font-light text-lg max-w-md">
                    {t.intro}
                </p>
            </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
                <div 
                    key={plan.id}
                    className={`relative p-8 lg:p-10 border transition-all duration-500 group flex flex-col ${
                        plan.recommended 
                        ? 'bg-stone-900 border-bronze-900/50 hover:border-bronze-600' 
                        : 'bg-stone-950 border-stone-800 hover:border-stone-600'
                    } ${
                        /* Logic to span the last item on tablet (md) to fill the grid */
                        index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                    }`}
                >
                    {plan.recommended && (
                        <div className="absolute top-0 right-0 bg-bronze-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                            {t.labels.mostPopular}
                        </div>
                    )}

                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            {plan.id === 'essence' && <Layout className="h-5 w-5 text-stone-500" />}
                            {plan.id === 'identity' && <Sparkles className="h-5 w-5 text-bronze-400" />}
                            {plan.id === 'ecosystem' && <Box className="h-5 w-5 text-stone-500" />}
                            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500">{plan.tagline}</h4>
                        </div>
                        <h3 className="text-3xl font-serif text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm text-stone-500 font-mono">{t.labels.from}</span>
                            <span className="text-2xl lg:text-3xl text-white font-light">{plan.price}</span>
                            <span className="text-stone-600 text-xs ml-1 uppercase">+ IVA</span>
                        </div>
                    </div>

                    <p className="text-stone-400 text-sm leading-relaxed mb-8 flex-grow">
                        {plan.description}
                    </p>

                    <ul className={`mb-10 border-t border-stone-800/50 pt-8 ${
                        index === 2 
                        ? 'space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4 lg:block lg:space-y-4' 
                        : 'space-y-4'
                    }`}>
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-stone-300">
                                <Check className="h-4 w-4 text-bronze-500 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <a href="#contacto" className={`w-full py-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold transition-all duration-300 ${plan.recommended ? 'bg-white text-stone-950 hover:bg-bronze-500 hover:text-white' : 'border border-stone-700 text-white hover:bg-white hover:text-stone-950'}`}>
                        {t.labels.start}
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            ))}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-xs text-stone-600 font-mono">
                {t.labels.footer} <a href="#contacto" className="text-stone-400 hover:text-white underline">{t.labels.talk}</a>
            </p>
        </div>
      </div>
    </section>
  );
};
