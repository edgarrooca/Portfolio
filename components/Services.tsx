import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface ServicesProps {
  lang: Language;
}

interface ServiceDetail {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  stack: string[];
  tools: string[];
}

// --- CONFIGURACIÓN DE DATOS ---
const getServicesData = (lang: Language): ServiceDetail[] => {
  if (lang === 'en') {
    return [
      { 
        id: '01', 
        name: 'Art Direction', 
        shortDesc: 'Visual Identity & Brand Voice',
        description: 'I build visual systems that survive trends. It\'s not just about a logo, but how your brand breathes in every digital touchpoint.',
        deliverables: ['Style Guides (Brandbook)', 'Responsive Logos', 'Digital Art Direction', 'Social Media Assets'],
        stack: ['Adobe CC', 'Figma', 'Blender', 'Midjourney'],
        tools: ['Typography', 'Color Theory', 'Composition']
      },
      { 
        id: '02', 
        name: 'Web Development', 
        shortDesc: 'Creative Coding & Performance',
        description: 'High-performance frontend engineering. I merge interactive design with robust architecture to create websites that Google loves and users don\'t forget.',
        deliverables: ['Corporate Web / Portfolio', 'Headless E-commerce', 'WebGL Experiences', 'Manageable CMS'],
        stack: ['React / Next.js', 'Tailwind CSS', 'TypeScript', 'Three.js'],
        tools: ['VS Code', 'Github', 'Vercel']
      },
      { 
        id: '03', 
        name: 'Filmmaking', 
        shortDesc: 'Direction, Edit & Color',
        description: 'Audiovisual narrative with a cinematic finish. From script to final color grading, I create pieces that connect emotionally.',
        deliverables: ['Commercial Spots', 'Social Media Reels', 'Corporate Videos', 'Product Photography'],
        stack: ['DaVinci Resolve', 'Premiere Pro', 'After Effects', 'Cinema 4D'],
        tools: ['Sony FX3', 'Lighting', 'Sound Design']
      },
      { 
        id: '04', 
        name: 'SEO Strategy', 
        shortDesc: 'Positioning & Analytics',
        description: 'It\'s useless to have the prettiest website if no one sees it. Organic positioning strategies based on data, not intuition.',
        deliverables: ['Technical Audit', 'Keyword Research', 'On-Page Optimization', 'Content Strategy'],
        stack: ['Google Search Console', 'Semrush', 'Ahrefs', 'Screaming Frog'],
        tools: ['Analytics', 'Data Studio', 'Indexing']
      },
    ];
  }
  
  // Spanish (Default)
  return [
    { 
      id: '01', 
      name: 'Dirección de Arte', 
      shortDesc: 'Identidad Visual & Voz de Marca',
      description: 'Construyo sistemas visuales que sobreviven a las tendencias. No se trata solo de un logo, sino de cómo tu marca respira en cada punto de contacto digital.',
      deliverables: ['Guías de Estilo (Brandbook)', 'Logotipos Responsivos', 'Dirección de Arte Digital', 'Assets para Redes'],
      stack: ['Adobe CC', 'Figma', 'Blender', 'Midjourney'],
      tools: ['Tipografía', 'Teoría del Color', 'Composición']
    },
    { 
      id: '02', 
      name: 'Desarrollo Web', 
      shortDesc: 'Código Creativo & Rendimiento',
      description: 'Ingeniería frontend de alto rendimiento. Fusiono diseño interactivo con una arquitectura robusta para crear webs que Google ama y los usuarios no olvidan.',
      deliverables: ['Web Corporativa / Portfolio', 'E-commerce Headless', 'WebGL Experiences', 'CMS Autogestionable'],
      stack: ['React / Next.js', 'Tailwind CSS', 'TypeScript', 'Three.js'],
      tools: ['VS Code', 'Github', 'Vercel']
    },
    { 
      id: '03', 
      name: 'Producción Audiovisual', 
      shortDesc: 'Dirección, Edición & Color',
      description: 'Narrativa audiovisual con acabado cinematográfico. Desde el guion hasta el etalonaje final, creo piezas que conectan emocionalmente.',
      deliverables: ['Spots Publicitarios', 'Reels para RRSS', 'Videos Corporativos', 'Fotografía de Producto'],
      stack: ['DaVinci Resolve', 'Premiere Pro', 'After Effects', 'Cinema 4D'],
      tools: ['Sony FX3', 'Iluminación', 'Diseño Sonoro']
    },
    { 
      id: '04', 
      name: 'Estrategia SEO', 
      shortDesc: 'Posicionamiento & Analítica',
      description: 'No sirve de nada tener la web más bonita si nadie la ve. Estrategias de posicionamiento orgánico basadas en datos, no en intuiciones.',
      deliverables: ['Auditoría Técnica', 'Keyword Research', 'Optimización On-Page', 'Estrategia de Contenidos'],
      stack: ['Google Search Console', 'Semrush', 'Ahrefs', 'Screaming Frog'],
      tools: ['Analytics', 'Data Studio', 'Indexación']
    },
  ];
};

// --- COMPONENTES DE ANIMACIÓN DE TEXTO ---

const ArtDirectionText = ({ text, isActive }: { text: string, isActive: boolean }) => {
  return (
    <span 
      className={`block transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isActive 
          ? 'font-serif italic font-light text-bronze-300 tracking-widest translate-x-4' 
          : 'font-serif text-stone-300'
      }`}
    >
      {text}
    </span>
  );
};

const WebDevText = ({ text, isActive }: { text: string, isActive: boolean }) => {
  if (!isActive) return <span className="font-serif text-stone-300">{text}</span>;
  
  // Dividimos el texto para animar las partes si es posible, o renderizamos genérico
  const parts = text.split(' ');
  const firstPart = parts[0] || 'Web';
  const secondPart = parts.slice(1).join(' ') || 'Dev';

  return (
    <span className="font-mono text-2xl md:text-5xl lg:text-6xl tracking-tight whitespace-nowrap">
      <span className="text-stone-600 opacity-50">&lt;</span>
      <span className="text-white font-bold">{firstPart} </span>
      <span className="text-blue-600 font-bold">{secondPart}</span>
      <span className="text-stone-600 opacity-50"> /&gt;</span>
    </span>
  );
};

const FilmmakingText = ({ text, isActive }: { text: string, isActive: boolean }) => {
  return (
    <span className={`flex items-center gap-4 transition-all duration-300 ${isActive ? 'font-mono text-red-600 font-bold tracking-widest' : 'font-serif text-stone-300'}`}>
      {isActive && (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
      )}
      {isActive ? text.toUpperCase() : text}
    </span>
  );
};

const SeoText = ({ text, isActive }: { text: string, isActive: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }
    
    // Typing effect logic
    if (displayText === text || displayText === "") {
        let i = 0;
        setDisplayText(""); 
        
        const interval = setInterval(() => {
        setDisplayText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval); 
        }, 50);

        return () => clearInterval(interval);
    }
  }, [isActive, text]);

  return (
    <span className={`flex items-center ${isActive ? "font-sans font-medium text-stone-200" : "font-serif text-stone-300"}`}>
      {isActive ? displayText : text}
      {isActive && (
        <span 
          className="ml-1 inline-block w-[3px] h-[0.9em] bg-stone-200"
          style={{ animation: 'blink 1s steps(2) infinite' }}
        ></span>
      )}
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </span>
  );
};

// --- COMPONENTE TACHADO REBELDE (SCRIBBLE IRREGULAR SUTIL) ---
const RebelliousHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="relative inline-block px-1">
      {/* Texto arriba con z-index superior */}
      <span className="relative z-10">{children}</span>
      
      {/* SVG Scribble detrás */}
      <svg
        className="absolute inset-0 w-[105%] h-[90%] top-[10%] -left-[2%] pointer-events-none z-0 overflow-visible"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path
          d="M-2 12 L2 7 L6 13 L9 6 L12 14 L16 8 L20 12 L23 7 L27 13 L30 8 L33 12 L36 6 L40 14 L43 8 L47 13 L51 7 L54 12 L57 8 L61 12 L64 7 L68 13 L71 8 L75 13 L78 7 L81 12 L85 6 L89 12 L92 8 L96 14 L102 7"
          fill="none"
          stroke="#CCFF00" 
          strokeWidth="3.5" 
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`opacity-25 mix-blend-screen transition-all duration-700 ease-in-out ${isVisible ? 'stroke-dashoffset-0' : 'stroke-dashoffset-full'}`}
          style={{
            strokeDasharray: 500,
            strokeDashoffset: isVisible ? 0 : 500
          }}
        />
      </svg>
    </span>
  );
};

// --- COMPONENTE PRINCIPAL DEL ÍTEM ---

interface ServiceItemProps {
  service: ServiceDetail;
  isOpen: boolean;
  onClick: () => void;
  lang: Language;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, isOpen, onClick, lang }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldAnimate = isHovered || isOpen;

  const labels = {
    es: { 
      deliverables: 'Entregables', 
      request: 'Solicitar este servicio',
      tech: 'Tecnologías'
    },
    en: { 
      deliverables: 'Deliverables', 
      request: 'Request this service',
      tech: 'Tech Stack'
    }
  };

  const renderAnimatedTitle = () => {
    switch (service.id) {
      case '01': return <ArtDirectionText text={service.name} isActive={shouldAnimate} />;
      case '02': return <WebDevText text={service.name} isActive={shouldAnimate} />;
      case '03': return <FilmmakingText text={service.name} isActive={shouldAnimate} />;
      case '04': return <SeoText text={service.name} isActive={shouldAnimate} />;
      default: return <span className="font-serif">{service.name}</span>;
    }
  };

  return (
    <div 
      className={`border-b border-stone-800 transition-colors duration-500 ${isOpen ? 'bg-stone-900/30' : 'hover:bg-stone-900/50'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        onClick={onClick}
        className="w-full py-12 flex items-baseline justify-between text-left group px-4 md:px-8 focus:outline-none"
      >
        <div className="flex items-baseline gap-6 md:gap-12">
          <span className={`font-mono text-xs transition-colors duration-300 ${shouldAnimate ? 'text-bronze-500' : 'text-stone-600'}`}>
            /{service.id}
          </span>
          <h3 className={`text-3xl md:text-5xl lg:text-6xl transition-all duration-300 ${isOpen ? 'text-white' : ''}`}>
            {renderAnimatedTitle()}
          </h3>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8 shrink-0">
           <span className={`hidden md:block text-xs font-mono uppercase tracking-widest transition-all duration-300 ${shouldAnimate ? 'opacity-0 -translate-x-4' : 'text-stone-500 opacity-100'}`}>
             {service.shortDesc}
           </span>
           <span className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen ? 'border-white text-white rotate-180 bg-stone-800' : 'border-stone-700 text-stone-500 group-hover:border-stone-500'}`}>
              {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
           </span>
        </div>
      </button>

      <div 
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 md:px-8 pb-8 md:pb-12 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              <div className="lg:col-span-5 lg:col-start-2">
                <p className="text-xl text-stone-300 font-light leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                   {service.tools.map((tool, i) => (
                     <span key={i} className="px-3 py-1 bg-stone-950 border border-stone-800 text-xs text-stone-500 font-mono uppercase tracking-wider">
                       {tool}
                     </span>
                   ))}
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-8 lg:border-l lg:border-stone-800 lg:pl-12">
                <div>
                   <h4 className="text-xs font-bold text-bronze-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                     {labels[lang].deliverables}
                   </h4>
                   <ul className="space-y-3">
                     {service.deliverables.map((item, i) => (
                       <li key={i} className="flex items-start gap-3 text-sm text-stone-400">
                         <CheckCircle2 className="h-4 w-4 text-stone-600 mt-0.5 shrink-0" />
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                </div>
                <div>
                   <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">
                     {labels[lang].tech}
                   </h4>
                   <ul className="space-y-3">
                     {service.stack.map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-sm text-stone-400 font-mono">
                         <span className="w-1.5 h-1.5 bg-stone-700 rounded-full"></span>
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              </div>

            </div>
            
            <div className="mt-12 flex justify-end">
               <a href="#contacto" className="inline-flex items-center gap-2 text-white hover:text-bronze-500 transition-colors group">
                 <span className="text-sm font-mono uppercase tracking-widest">{labels[lang].request}</span>
                 <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
               </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);
  const servicesData = getServicesData(lang);

  const toggleService = (id: string) => {
    setOpenServiceId(prev => prev === id ? null : id);
  };

  return (
    <section id="servicios" className="bg-stone-950 py-12 md:py-24 lg:py-32 border-t border-stone-900">
      <div className="max-w-[95%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 px-4">
          <div className="lg:col-span-4">
             <h2 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-4">
               ( {lang === 'es' ? 'Capacidades' : 'Capabilities'} )
             </h2>
             <p className="font-serif text-4xl text-white">
               {lang === 'es' ? 'Disciplina Híbrida.' : 'Hybrid Discipline.'}
             </p>
          </div>
          <div className="lg:col-span-6">
             <p className="text-stone-400 font-light text-lg max-w-xl leading-relaxed">
               {lang === 'es' ? (
                 <>
                   No creo en los <RebelliousHighlight>especialistas de una sola cosa</RebelliousHighlight>. 
                   En la era digital, el código necesita diseño, y el diseño necesita movimiento. 
                   Ofrezco un ecosistema completo.
                 </>
               ) : (
                 <>
                   I do not believe in <RebelliousHighlight>single-track specialists</RebelliousHighlight>. 
                   In the digital age, code needs design, and design needs motion. 
                   I offer a complete ecosystem.
                 </>
               )}
             </p>
          </div>
        </div>
        
        <div className="border-t border-stone-800">
          {servicesData.map((s) => (
            <ServiceItem 
              key={s.id} 
              service={s} 
              isOpen={openServiceId === s.id} 
              onClick={() => toggleService(s.id)} 
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
};