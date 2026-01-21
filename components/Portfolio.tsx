import React, { useState, useMemo, useEffect } from 'react';
import { Modal } from './Modal';
import { PortfolioItem, Language } from '../types';
import { ArrowUpRight, Play, Layers, Code2, Zap, Check, Eye, ShieldCheck, ArrowRight } from 'lucide-react';

interface PortfolioProps {
  lang: Language;
}

type FilterType = 'all' | 'web' | 'video';

// Componente para el círculo de Lighthouse mejorado
const LighthouseCircle = ({ score, label, icon: Icon }: { score: number, label: string, icon: any }) => {
  const radius = 32; // Radio ajustado para viewBox 80x80
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* SVG con viewBox para evitar cortes */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
          {/* Círculo de fondo */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-stone-800"
          />
          {/* Círculo de progreso */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round" 
            className="text-emerald-500 transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-emerald-500 font-mono text-lg font-bold">{score}</span>
      </div>
      <div className="flex items-center gap-2 text-stone-500">
        <Icon className="h-3 w-3" />
        <span className="text-[10px] uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
};

// Helper function to extract embed URL robustly
const getEmbedUrl = (url: string | undefined) => {
  if (!url) return null;
  
  // YouTube Regex: Handles youtu.be, youtube.com/watch, /embed, /v, etc.
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&"'>]+)/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=0&rel=0&playsinline=1&modestbranding=1`;
  }
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=0`;
  }

  // Streamable
  const streamableMatch = url.match(/streamable\.com\/([a-z0-9]+)/);
  if (streamableMatch && streamableMatch[1]) {
    return `https://streamable.com/e/${streamableMatch[1]}`;
  }

  return null;
};

export const Portfolio: React.FC<PortfolioProps> = ({ lang }) => {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  
  const content = {
    es: {
      sectionTitle: "( Proyectos Seleccionados )",
      recentProjects: "Proyectos Recientes",
      viewProject: "Ver Proyecto",
      backIndex: "Volver al índice",
      challenge: "El Reto / Sinopsis",
      solution: "La Solución / Rol",
      impact: "Impacto Medible",
      services: "Servicios",
      gallery: "Galería del Proyecto",
      visit: "Visitar Web",
      web: "Web Dev",
      video: "Cine & Vídeo",
      all: "Todos",
      metrics: "Métricas de Rendimiento (Lighthouse)",
      stack: "Tecnologías",
      confidential: "Confidencial",
      defaultSolution: "Una solución digital hecha a medida.",
      perf: "Rendimiento",
      access: "Accesibilidad",
      best: "Prácticas",
      seo: "SEO",
      backToDesc: "Volver a la descripción",
      exitWeb: "Salir de la web"
    },
    en: {
      sectionTitle: "( Selected Works )",
      recentProjects: "Selected Works",
      viewProject: "View Project",
      backIndex: "Back to index",
      challenge: "The Challenge / Synopsis",
      solution: "The Solution / Role",
      impact: "Measurable Impact",
      services: "Services",
      gallery: "Project Gallery",
      visit: "Visit Website",
      web: "Web Dev",
      video: "Film & Motion",
      all: "All",
      metrics: "Performance Metrics (Lighthouse)",
      stack: "Tech Stack",
      confidential: "Confidential",
      defaultSolution: "A custom tailored digital solution.",
      perf: "Performance",
      access: "Accessibility",
      best: "Best Practices",
      seo: "SEO",
      backToDesc: "Back to description",
      exitWeb: "Exit Website"
    }
  };

  const t = content[lang];

  const getProjects = (l: Language): PortfolioItem[] => {
    // --- VIDEO PROJECTS DATA ---
    const videoProjects: PortfolioItem[] = [
      {
        id: 'vid-lucio',
        type: 'video',
        title: 'Lucio',
        category: l === 'es' ? 'Cortometraje' : 'Short Film',
        client: 'Indie Production',
        year: '2023',
        imageUrl: 'https://i.postimg.cc/jjnqVKB2/IMG-0481.png',
        videoUrl: 'https://streamable.com/oriwzy',
        description: l === 'es' 
          ? 'La historia no contada de Lucifer. Un cortometraje que explora un giro narrativo sobre el abuso infantil oculto tras el mito del ángel caído.' 
          : 'The untold story of Lucifer. A short film exploring a narrative twist on child abuse hidden behind the fallen angel myth.',
        challenge: l === 'es' 
          ? 'Crear una atmósfera opresiva pero estéticamente bella que acompañara el giro final.' 
          : 'Creating an oppressive yet aesthetically beautiful atmosphere to accompany the final plot twist.',
        solution: l === 'es' 
          ? 'Editor y Etalonador Principal. Trabajé el color para reflejar la dualidad inocencia-oscuridad.' 
          : 'Lead Editor & Colorist. I crafted the color grading to reflect the duality between innocence and darkness.',
        stack: ['DaVinci Resolve', 'Premiere Pro', 'Color Grading']
      },
      {
        id: 'vid-boxeo',
        type: 'video',
        title: 'Boxeo por la esperanza',
        category: l === 'es' ? 'Documental / Entrevista' : 'Documentary / Interview',
        year: '2023',
        imageUrl: 'https://i.postimg.cc/7Lkt4nWP/IMG-0483.png',
        videoUrl: 'https://streamable.com/kr83aw',
        description: l === 'es' 
          ? 'Eunice, conocida boxeadora mexicana, nos habla sobre sus sueños, retos y expectativas en su nueva etapa como entrenadora infantil.' 
          : 'Eunice, a renowned Mexican boxer, talks about her dreams, challenges, and expectations in her new chapter as a children\'s coach.',
        solution: l === 'es' ? 'Editor y Etalonador Principal.' : 'Lead Editor & Colorist.',
        stack: ['Premiere Pro', 'Sound Design']
      },
      {
        id: 'vid-dime',
        type: 'video',
        title: 'Di(me) que (yo)',
        category: l === 'es' ? 'Micrometraje' : 'Micro-short',
        year: '2023',
        imageUrl: 'https://i.postimg.cc/QN2ySDJy/IMG-0482.png',
        videoUrl: 'https://vimeo.com/811200915',
        description: l === 'es' 
          ? 'Dos mujeres se conocen justo en el momento en el que rompen con sus respectivas parejas. Una historia sobre encuentros fortuitos y vulnerabilidad.' 
          : 'Two women meet right at the moment they break up with their respective partners. A story about chance encounters and vulnerability.',
        stack: ['Vimeo', 'Short Film', 'Drama']
      },
      {
        id: 'vid-gloria',
        type: 'video',
        title: 'La desaparición de G. Martínez',
        category: 'Book Trailer',
        client: 'Mariola Reque',
        year: '2023',
        imageUrl: 'https://i.postimg.cc/KjPrJ6mW/IMG-0484.png',
        videoUrl: 'https://streamable.com/8xm4wr',
        description: l === 'es' 
          ? 'Tráiler para el libro de Mariola Reque. Cuando Gloria tenía 17 años ingresó en una clínica psiquiátrica; horas más tarde desapareció sin dejar rastro.' 
          : 'Trailer for Mariola Reque\'s book. When Gloria was 17, she entered a psychiatric clinic; hours later, she vanished without a trace.',
        stack: ['After Effects', 'Sound Design', 'Trailer']
      },
      {
        id: 'vid-toulouse',
        type: 'video',
        title: 'Ne me quitte pas',
        category: l === 'es' ? 'Cortometraje' : 'Short Film',
        year: '2023',
        imageUrl: 'https://i.postimg.cc/J0ptrxx7/IMG-0485.png',
        videoUrl: 'https://vimeo.com/811202818',
        description: l === 'es' 
          ? 'Carla acaba de huir con Jerome a Toulouse, Francia, pero poco después comprende que aquel no es su lugar.' 
          : 'Carla has just fled to Toulouse, France with Jerome, but soon realizes that this is not where she belongs.',
        solution: l === 'es' ? 'Editor y Etalonador Principal.' : 'Lead Editor & Colorist.',
        stack: ['Vimeo', 'Color Grading', 'Narrative']
      },
      {
        id: 'vid-parlem',
        type: 'video',
        title: 'Parlem',
        category: l === 'es' ? 'Spot Publicitario' : 'Commercial Spot',
        client: l === 'es' ? 'Fed. Salud Mental CV' : 'Mental Health Fed. CV',
        year: '2023',
        imageUrl: 'https://i.postimg.cc/WzyjYHSb/IMG-0486.png',
        videoUrl: 'https://streamable.com/jpacuq',
        description: l === 'es' 
          ? 'Spot para la Federación de Salud Mental de la Comunidad Valenciana. Una pieza para concienciar sobre la importancia de hablar con gente cuando no te encuentras bien.' 
          : 'Spot for the Mental Health Federation of the Valencian Community. A piece raising awareness about the importance of talking to others when you\'re not feeling well.',
        stack: ['Commercial', 'Social Awareness']
      }
    ];

    // --- WEB PROJECTS DATA ---
    const webProjects: PortfolioItem[] = [
      {
        id: 'web-1',
        type: 'web',
        title: 'Librería García Lorca',
        category: l === 'en' ? 'Non-Profit / Landing Page' : 'ONG / Landing Page',
        client: l === 'en' ? 'Solidarity Bookstore' : 'Librería Solidaria',
        year: '2024',
        url: 'https://edgarrooca.github.io/Libreria-Garcia-Lorca/',
        imageUrl: 'https://i.postimg.cc/Jn64W5b6/Captura-de-pantalla-2026-01-21-120648.png',
        mobileImageUrl: 'https://i.postimg.cc/BvGfRsg0/IMG-5050.jpg',
        gallery: [
          'https://i.postimg.cc/Jn64W5b6/Captura-de-pantalla-2026-01-21-120648.png'
        ],
        description: l === 'en' 
          ? 'A simple Single Page website for a solidarity bookstore in Madrid. The goal was to encourage people to donate books they no longer use.'
          : 'Una web Single Page para una librería solidaria en Madrid. El objetivo era crear una plataforma sencilla para animar a los vecinos a donar los libros que ya no utilizaban.',
        challenge: l === 'en'
          ? 'The main challenge was to communicate a social mission clearly and attractively, removing barriers to book donation.'
          : 'El reto principal era comunicar una misión social de forma clara y atractiva, eliminando barreras para la donación de libros.',
        solution: l === 'en'
          ? 'I developed a minimalist and direct Landing Page. Priority was given to message clarity and ease of contact, with an aesthetic evoking culture and solidarity.'
          : 'Desarrollé una Landing Page minimalista y directa. Se priorizó la claridad en el mensaje y la facilidad de contacto, con una estética que evoca cultura y solidaridad.',
        impact: l === 'en'
          ? 'Significant increase in book donations and greater local visibility.'
          : 'Aumento significativo en la recepción de donaciones de libros y mayor visibilidad local.',
        stack: ['React', 'Tailwind', 'Framer Motion']
      },
      {
        id: 'web-3',
        type: 'web',
        title: l === 'en' ? 'H. Cuautitlán Palliative Care' : 'Cuidados Paliativos H. Cuautitlán',
        category: l === 'en' ? 'Health / Landing Page' : 'Salud / Landing Page',
        client: 'Hospital Cuautitlán',
        year: '2024',
        url: 'https://hcuautitlancuidadospaliativos.com/',
        imageUrl: 'https://i.postimg.cc/t4kzGNdF/IMG-0476.jpg',
        mobileImageUrl: 'https://i.postimg.cc/9QbBHYPT/IMG-5049.jpg',
        description: l === 'en'
          ? 'A digital platform dedicated to humanizing palliative care info, providing a serene and accessible environment for patients and their families.'
          : 'Una plataforma dedicada a humanizar la información sobre cuidados paliativos, proporcionando un entorno digital sereno y accesible para pacientes y familias.',
        challenge: l === 'en'
          ? 'The challenge was to approach a sensitive and emotionally charged medical topic with an aesthetic that conveys peace, clarity, and human warmth.'
          : 'El reto consistía en abordar un tema tabú y emocionalmente cargado con una estética que transmitiera paz, profesionalidad y calidez humana.',
        solution: l === 'en'
          ? 'Minimalist interface with soft colors and clear typography. Information architecture was simplified to minimize cognitive load during stressful times.'
          : 'Diseñé una interfaz minimalista con tipografías legibles y una paleta de colores suaves. La arquitectura de información se simplificó para reducir la carga cognitiva.',
        impact: l === 'en' 
          ? 'Seamless access to critical resources and emotional support guides.'
          : 'Acceso directo a guías de apoyo y recursos médicos críticos.',
        stack: ['React', 'Tailwind CSS', 'SEO Strategy']
      },
      {
        id: 'web-5',
        type: 'web',
        title: 'Gameshelf',
        category: 'Web App / Gaming',
        client: 'Gameshelf Hub',
        year: '2024',
        url: 'https://gameshelf-dusky.vercel.app/login',
        imageUrl: 'https://i.postimg.cc/fbLW8MTc/IMG-0479.jpg',
        mobileImageUrl: 'https://i.postimg.cc/N03hRtyB/IMG-5051.jpg',
        description: l === 'en'
          ? 'Next-generation video game library management platform. Designed for collectors who demand absolute control over their backlog.'
          : 'Ecosistema digital avanzado para el rastreo y catalogación de colecciones de videojuegos. Desarrollado con una arquitectura de micro-interacciones.',
        challenge: l === 'en'
          ? 'Architecting a system capable of handling thousands of concurrent metadata requests while maintaining a sub-100ms UI response time.'
          : 'Gestionar una base de datos dinámica con una interfaz rápida y visualmente atractiva que no abrume al usuario.',
        solution: l === 'en'
          ? 'Implementation of a modern React architecture with persistent client-side caching and a custom-built search engine.'
          : 'Uso de APIs externas para la obtención de metadatos masivos y un sistema de filtrado avanzado.',
        impact: l === 'en'
          ? 'Drastic reduction in organization time for professional gamers and collectors worldwide.'
          : 'Mejora radical en la organización personal de colecciones de juegos.',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL']
      }
    ];

    return [...webProjects, ...videoProjects];
  };

  const projects = getProjects(lang);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') {
      const web = projects.filter(p => p.type === 'web');
      const video = projects.filter(p => p.type === 'video');
      const interleaved = [];
      const maxLen = Math.max(web.length, video.length);
      
      for (let i = 0; i < maxLen; i++) {
        if (i < web.length) interleaved.push(web[i]);
        if (i < video.length) interleaved.push(video[i]);
      }
      return interleaved;
    }
    return projects.filter(p => p.type === filter);
  }, [filter, projects]);

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const embedUrl = selectedProject?.type === 'video' ? getEmbedUrl(selectedProject.videoUrl) : null;

  return (
    <section id="portafolio" className="bg-stone-950 py-12 md:py-24 lg:py-32">
      <div className="max-w-[95%] mx-auto px-4">
        
        {/* Header, Filter & View Toggle */}
        <div className="flex flex-col xl:flex-row justify-between items-end mb-24 border-b border-stone-800 pb-8 gap-8">
           <div className="w-full xl:w-auto">
             <h2 className="text-stone-500 font-mono text-xs uppercase tracking-widest mb-4">{t.sectionTitle}</h2>
             <h3 className="text-white font-serif text-4xl">{t.recentProjects}</h3>
           </div>

           <div className="flex flex-col md:flex-row w-full xl:w-auto gap-8 md:gap-16 items-start md:items-center">
               {/* Filter Tabs */}
               <div className="flex gap-8 text-sm font-mono uppercase tracking-widest">
                  <button 
                    onClick={() => setFilter('all')}
                    className={`transition-colors ${filter === 'all' ? 'text-white underline underline-offset-8 decoration-bronze-500' : 'text-stone-600 hover:text-stone-400'}`}
                  >
                    {t.all}
                  </button>
                  <button 
                    onClick={() => setFilter('web')}
                    className={`transition-colors ${filter === 'web' ? 'text-white underline underline-offset-8 decoration-bronze-500' : 'text-stone-600 hover:text-stone-400'}`}
                  >
                    {t.web}
                  </button>
                  <button 
                    onClick={() => setFilter('video')}
                    className={`transition-colors ${filter === 'video' ? 'text-white underline underline-offset-8 decoration-bronze-500' : 'text-stone-600 hover:text-stone-400'}`}
                  >
                    {t.video}
                  </button>
               </div>
           </div>
        </div>

        {/* Projects Container (List Mode Only) */}
        <div className="space-y-32">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
                {/* Web Layout List */}
                {project.type === 'web' ? (
                  <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                      {/* Visual Composition */}
                      <div className="w-full lg:w-7/12 relative perspective-1000">
                        <div className="relative z-10 overflow-hidden rounded-sm shadow-2xl bg-stone-900 aspect-[16/10] border border-stone-800 group-hover:border-stone-600 transition-colors duration-500">
                          <img 
                            src={project.imageUrl} 
                            alt={`${project.title} Desktop`} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>

                        {/* Hidden on mobile, visible on desktop (md+) */}
                        {project.mobileImageUrl && (
                          <div className="hidden md:block absolute -bottom-10 -right-4 w-[25%] aspect-[9/19] z-20 bg-stone-900 rounded-2xl border-[4px] border-stone-800 shadow-2xl transform translate-y-4 lg:translate-y-8 lg:translate-x-8 group-hover:translate-y-0 group-hover:translate-x-4 transition-transform duration-700 ease-out">
                            <img 
                              src={project.mobileImageUrl} 
                              alt={`${project.title} Mobile`} 
                              className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100"
                            />
                          </div>
                        )}
                      </div>

                      {/* Info Web */}
                      <div className="w-full lg:w-4/12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                          <Layers className="h-4 w-4 text-stone-500" />
                          <span className="text-stone-400 font-mono text-xs uppercase tracking-widest">{project.category}</span>
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-6 group-hover:text-stone-200 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-stone-400 text-base md:text-lg font-light leading-relaxed mb-8 border-l border-stone-800 pl-6">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-2 text-white border-b border-white pb-1 w-fit opacity-50 group-hover:opacity-100 transition-all duration-300">
                          <span className="text-xs uppercase tracking-widest font-bold">{t.viewProject}</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                  </div>
                ) : (
                  /* Video Layout List */
                  <div className="relative w-full">
                      <div className="relative w-full aspect-[21/9] lg:aspect-[2.35/1] overflow-hidden bg-stone-900 border border-stone-800 group-hover:border-stone-600 transition-colors duration-500">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                              <Play className="h-8 w-8 text-white ml-1 group-hover:text-stone-950 transition-colors" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-8 lg:p-12 w-full bg-gradient-to-t from-stone-950 to-transparent">
                            <div className="flex justify-between items-end">
                              <div>
                                <span className="text-xs font-mono text-stone-300 uppercase tracking-widest mb-2 block">{project.category}</span>
                                <h3 className="text-3xl lg:text-5xl font-serif text-white">{project.title}</h3>
                              </div>
                              <span className="hidden md:block text-stone-400 text-sm font-light max-w-xs text-right">
                                {project.description}
                              </span>
                            </div>
                        </div>
                      </div>
                  </div>
                )}
            </div>
          ))}
        </div>

      </div>

      {/* --- IMMERSIVE CASE STUDY MODAL --- */}
      <Modal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        title={selectedProject?.title || ''}
        lang={lang}
      >
        {selectedProject && (
          <div className="animate-fade-in h-full">
            
            {/* 1. Hero Title Section */}
            <div className="mb-16 border-b border-stone-900 pb-16">
              <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8 mb-12">
                  <h2 className="text-5xl md:text-8xl font-serif text-white leading-[0.9]">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-col items-start lg:items-end gap-2 text-stone-500 font-mono text-sm uppercase tracking-widest">
                    <span>{selectedProject.year || '2023'}</span>
                    <span>{selectedProject.client || t.confidential}</span>
                  </div>
              </div>
              
              <div className="w-full aspect-video bg-stone-900 overflow-hidden relative border border-stone-800 group">
                  {selectedProject.type === 'video' && embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={selectedProject.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <>
                      <img 
                        src={selectedProject.imageUrl} 
                        alt="Main view" 
                        className="w-full h-full object-cover opacity-90"
                      />
                      {selectedProject.type === 'web' && (
                        <div className="absolute bottom-8 right-8 bg-stone-950/80 backdrop-blur p-4 border border-stone-800">
                          <Layers className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </>
                  )}
              </div>
            </div>

            {/* 2. Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                {/* Left: Narrative (8 cols) */}
                <div className="lg:col-span-8 space-y-12">
                  <div>
                    <h4 className="text-xs font-bold text-bronze-500 uppercase tracking-[0.2em] mb-6">{t.challenge}</h4>
                    <p className="text-lg md:text-2xl text-stone-300 font-serif leading-relaxed">
                      {selectedProject.challenge || selectedProject.description}
                    </p>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-stone-600 uppercase tracking-[0.2em] mb-6">{t.solution}</h4>
                      <p className="text-base md:text-lg text-stone-400 font-light leading-relaxed">
                        {selectedProject.solution || t.defaultSolution}
                      </p>
                  </div>

                  {/* LIGHTHOUSE METRICS */}
                  {selectedProject.type === 'web' && (
                    <div className="pt-8 border-t border-stone-900">
                      <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-[0.2em] mb-8">{t.metrics}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <LighthouseCircle score={100} label={t.perf} icon={Zap} />
                        <LighthouseCircle score={100} label={t.access} icon={Eye} />
                        <LighthouseCircle score={100} label={t.best} icon={Check} />
                        <LighthouseCircle score={100} label={t.seo} icon={ShieldCheck} />
                      </div>
                    </div>
                  )}

                  {selectedProject.impact && (
                      <div className="p-8 border border-stone-800 bg-stone-900/50 mt-8">
                        <span className="block text-4xl md:text-5xl font-serif text-white mb-2">{selectedProject.impact}</span>
                        <span className="text-stone-500 text-xs uppercase tracking-widest">{t.impact}</span>
                      </div>
                  )}
                </div>

                {/* Right: Meta & Stack (4 cols) */}
                <div className="lg:col-span-4 space-y-12 lg:border-l lg:border-stone-900 lg:pl-12">
                  <div>
                    <h5 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">{t.services}</h5>
                    <p className="text-white text-lg">{selectedProject.category}</p>
                  </div>
                  
                  {selectedProject.stack && (
                    <div>
                      <h5 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Code2 className="h-3 w-3" /> {t.stack}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map(tech => (
                          <span key={tech} className="px-3 py-1 border border-stone-800 text-stone-400 text-xs font-mono bg-stone-900/50 hover:bg-stone-800 transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.url && (
                      <a 
                        href={selectedProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between w-full p-6 bg-white hover:bg-bronze-500 transition-colors duration-300 text-stone-950 hover:text-white mt-8 cursor-pointer"
                      >
                        <span className="font-bold uppercase tracking-widest text-xs">{t.visit}</span>
                        <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                  )}
                </div>
            </div>

            <div className="flex justify-end border-t border-stone-900 pt-12">
                <button onClick={handleCloseModal} className="text-stone-500 hover:text-white transition-colors flex items-center gap-4 group">
                  <span className="font-serif text-2xl md:text-4xl text-stone-700 group-hover:text-white transition-colors">{t.backIndex}</span>
                  <ArrowRight className="h-6 w-6" />
                </button>
            </div>

          </div>
        )}
      </Modal>
    </section>
  );
};