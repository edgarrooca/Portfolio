import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Check, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const content = {
    es: {
      contact: "Contacto",
      title: "Vamos a crear",
      titleItalic: "juntos.",
      availability: "Disponibilidad actual:",
      status: "Aceptando nuevos proyectos",
      mind: "¿Qué tienes en mente?",
      options: {
        essence: "Plan Essence (Landing Page) - Desde 600€",
        identity: "Plan Identity (Web Corporativa) - Desde 1.400€",
        ecosystem: "Plan Ecosystem (E-commerce / App) - Desde 2.500€",
        other: "Consultoría / Otro"
      },
      send: "Enviar Mensaje",
      sending: "Enviando...",
      success: "Mensaje enviado correctamente. Te responderé pronto.",
      error: "Hubo un error. Por favor envíame un email directo.",
      name: "Nombre",
      email: "Correo",
      message: "Cuéntame sobre tu proyecto"
    },
    en: {
      contact: "Contact",
      title: "Let's create",
      titleItalic: "together.",
      availability: "Current Availability:",
      status: "Accepting new projects",
      mind: "What do you have in mind?",
      options: {
        essence: "Essence Plan (Landing Page) - From 600€",
        identity: "Identity Plan (Corporate Web) - From 1.400€",
        ecosystem: "Ecosystem Plan (E-commerce / App) - From 2.500€",
        other: "Consulting / Other"
      },
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully. I'll get back to you soon.",
      error: "There was an error. Please email me directly.",
      name: "Name",
      email: "Email",
      message: "Tell me about your project"
    }
  };

  const t = content[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    try {
      await emailjs.sendForm(
        'service_rvb23lj',    // SERVICE ID
        'template_agvleg4',   // TEMPLATE ID (Actualizado)
        formRef.current,
        'wRSpXR8xDoX7F5GOH'   // PUBLIC KEY
      );
      
      setStatus('success');
      formRef.current.reset();
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contacto" className="py-12 md:py-24 lg:py-32 bg-stone-950 text-white border-t border-stone-900">
      <div className="max-w-[95%] mx-auto px-4 flex flex-col items-center">
        
        {/* Centered Content Container */}
        <div className="w-full max-w-2xl">
          
          <div className="text-center mb-16">
            <h2 className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-6">( {t.contact} )</h2>
            <h3 className="font-serif text-4xl md:text-7xl mb-8 leading-[0.9]">
              {t.title} <br />
              <span className="italic text-stone-600">{t.titleItalic}</span>
            </h3>
          </div>

          <div className="bg-stone-900/20 p-8 md:p-12 border border-stone-900 rounded-sm">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
              <div className="group relative">
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full bg-transparent border-b border-stone-800 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-transparent peer text-center"
                  placeholder={t.name}
                />
                <label className="absolute left-1/2 -translate-x-1/2 top-4 text-stone-500 text-xl transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-stone-400 cursor-text pointer-events-none">{t.name}</label>
              </div>
              
              <div className="group relative">
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full bg-transparent border-b border-stone-800 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-transparent peer text-center"
                  placeholder={t.email}
                />
                <label className="absolute left-1/2 -translate-x-1/2 top-4 text-stone-500 text-xl transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-stone-400 cursor-text pointer-events-none">{t.email}</label>
              </div>

              {/* Plan Selector */}
              <div className="group relative text-center">
                 <label className="block text-stone-500 text-xs uppercase tracking-widest mb-4">{t.mind}</label>
                 <select 
                   name="plan"
                   className="w-full bg-stone-900 border border-stone-800 text-white py-4 px-4 focus:outline-none focus:border-bronze-500 transition-colors appearance-none rounded-none text-center"
                 >
                   <option value="Essence">{t.options.essence}</option>
                   <option value="Identity">{t.options.identity}</option>
                   <option value="Ecosystem">{t.options.ecosystem}</option>
                   <option value="Other">{t.options.other}</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-stone-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                 </div>
              </div>

              {/* Message Textarea */}
              <div className="group relative">
                <textarea
                  name="message"
                  required
                  rows={3}
                  className="w-full bg-transparent border-b border-stone-800 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-transparent peer resize-none text-center"
                  placeholder={t.message}
                ></textarea>
                <label className="absolute left-1/2 -translate-x-1/2 top-4 text-stone-500 text-xl transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-stone-400 cursor-text pointer-events-none">{t.message}</label>
              </div>
              
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`group w-full max-w-xs py-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                    status === 'sending' || status === 'success' ? 'bg-emerald-500 text-white' :
                    status === 'error' ? 'bg-red-500 text-white' :
                    'border border-stone-700 text-white hover:bg-white hover:text-stone-950'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      {t.sending}
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : status === 'success' ? (
                    <>
                      {t.success}
                      <Check className="h-4 w-4" />
                    </>
                  ) : status === 'error' ? (
                    <>
                      {t.error}
                      <AlertCircle className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {t.send}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center border-t border-stone-900 pt-8 w-full">
               <p className="text-sm text-stone-500 mb-4">{t.availability}</p>
               <div className="flex items-center justify-center gap-3">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                 </span>
                 <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest">{t.status}</span>
               </div>
            </div>

        </div>
      </div>
    </section>
  );
};
