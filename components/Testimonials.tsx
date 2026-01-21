
import React, { useState, useEffect } from 'react';
import { TestimonialItem, Language } from '../types';

interface TestimonialsProps {
  lang: Language;
}

const getTestimonials = (lang: Language): TestimonialItem[] => {
  if (lang === 'en') {
    return [
      {
        id: '1',
        name: 'Carlos Martínez',
        role: 'Owner',
        company: 'Grupo El Carmen',
        content: 'The elegance of the design has elevated our brand perception. Reservations have increased by 40% thanks to the user experience.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
      },
      {
        id: '2',
        name: 'Elena Sanchis',
        role: 'Creative Director',
        company: 'Moda VLC',
        content: 'They perfectly understood the concept of quiet luxury. Impeccable work in both aesthetics and technical performance.',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
      },
      {
        id: '3',
        name: 'José Luis Ibáñez',
        role: 'CEO',
        company: 'Logística Levante',
        content: 'Absolute professionalism. They didn\'t just deliver a website, but a robust business tool that sets us apart from the competition.',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
      }
    ];
  }
  return [
    {
      id: '1',
      name: 'Carlos Martínez',
      role: 'Owner',
      company: 'Grupo El Carmen',
      content: 'La elegancia del diseño ha elevado la percepción de nuestra marca. Las reservas han aumentado un 40% gracias a la experiencia de usuario.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      id: '2',
      name: 'Elena Sanchis',
      role: 'Creative Director',
      company: 'Moda VLC',
      content: 'Entendieron perfectamente el concepto de lujo silencioso. Un trabajo impecable tanto en estética como en rendimiento técnico.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      id: '3',
      name: 'José Luis Ibáñez',
      role: 'CEO',
      company: 'Logística Levante',
      content: 'Profesionalidad absoluta. No solo entregaron una web, sino una herramienta de negocio robusta que nos diferencia de la competencia.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
    }
  ];
};

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const testimonials = getTestimonials(lang);

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true); // Fade in new content
      }, 500); // Wait for fade out to finish
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section className="py-32 bg-stone-950 border-t border-stone-900 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900/40 via-stone-950 to-stone-950 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        
        <div className="mb-16">
           <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
             ( {lang === 'es' ? 'Testimonios' : 'Testimonials'} )
           </span>
        </div>

        <div className={`transition-opacity duration-700 ease-in-out min-h-[350px] flex flex-col justify-center items-center ${fade ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="mb-8">
            <span className="font-serif text-8xl text-stone-800 leading-none select-none">“</span>
          </div>
          
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-stone-200 leading-relaxed italic mb-12">
            {current.content}
          </h2>

          <div className="flex flex-col items-center gap-4">
            {/* Avatar Photo */}
            <div className="w-16 h-16 rounded-full overflow-hidden border border-stone-800 shadow-lg relative bg-stone-900">
                <img 
                  src={current.avatarUrl} 
                  alt={current.name} 
                  className="w-full h-full object-cover grayscale opacity-90 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    // Fallback si falla la imagen
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150/292524/FFFFFF?text=' + current.name.charAt(0);
                  }} 
                />
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-sans font-medium tracking-wide uppercase text-sm">
                {current.name}
              </span>
              <span className="text-stone-500 text-xs font-mono uppercase tracking-widest">
                {current.role}, {current.company}
              </span>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setFade(true);
                }, 300);
              }}
              className={`h-1 transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-12 bg-bronze-500' : 'w-2 bg-stone-800 hover:bg-stone-700'}`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
