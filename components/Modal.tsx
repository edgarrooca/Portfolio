import React, { useEffect, useRef, useState } from 'react';
import { X, CornerUpLeft } from 'lucide-react';
import { Language } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  lang: Language;
  noPadding?: boolean;
  customCloseAction?: () => void;
  customCloseText?: string;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  lang, 
  noPadding = false,
  customCloseAction,
  customCloseText
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Sync shouldRender with isOpen to handle mounting
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (customCloseAction) {
          customCloseAction();
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, customCloseAction]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
      document.body.style.overflow = 'unset';
    }
  };

  const handleCloseButton = () => {
    if (customCloseAction) {
      customCloseAction();
    } else {
      onClose();
    }
  };

  if (!shouldRender) return null;

  const defaultCloseText = lang === 'es' ? 'Cerrar' : 'Close';
  const buttonText = customCloseText || defaultCloseText;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col bg-stone-950 overflow-hidden ${isOpen ? 'animate-slide-up' : 'animate-slide-down'}`}
      onAnimationEnd={handleAnimationEnd}
    >
      
      {/* Top Bar (Sticky) - Height reduced */}
      <div className="flex justify-between items-center px-4 md:px-8 border-b border-stone-900 bg-stone-950/80 backdrop-blur-md z-50 absolute top-0 left-0 w-full h-[64px] md:h-[80px]">
        <div className="flex flex-col justify-center">
             <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest leading-none mb-1.5">
               {lang === 'es' ? 'Caso de Estudio' : 'Case Study'}
             </span>
             <h3 className="text-lg md:text-xl font-serif text-white leading-none truncate max-w-[200px] md:max-w-md">{title}</h3>
        </div>
        
        <button
          onClick={handleCloseButton}
          className="group flex items-center gap-3 text-stone-400 hover:text-white transition-colors cursor-pointer shrink-0 p-2 md:p-4"
          aria-label={buttonText}
        >
          <span className="hidden md:block text-xs font-mono uppercase tracking-widest group-hover:underline decoration-bronze-500 underline-offset-4">
            {buttonText}
          </span>
          <div className={`p-2 border border-stone-800 rounded-full group-hover:border-white transition-colors ${customCloseAction ? 'bg-stone-900' : ''}`}>
             {customCloseAction ? <CornerUpLeft className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </div>
        </button>
      </div>

      {/* Content Scrollable Area - Padding Top adjusted to new header height, Bottom increased for Mobile Browser UI */}
      <div 
        ref={modalRef}
        className={`flex-1 overflow-y-auto custom-scrollbar ${
          noPadding 
            ? 'pt-[64px] md:pt-[80px] pb-0 h-full overflow-hidden' 
            : 'pt-24 md:pt-32 pb-32 md:pb-20'
        }`}
      >
        <div className={noPadding ? 'w-full h-full' : 'max-w-7xl mx-auto px-4 md:px-8'}>
           {children}
        </div>
      </div>
    </div>
  );
};