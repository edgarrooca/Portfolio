import React, { useEffect, useState, useRef } from 'react';

export const Cursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const requestRef = useRef<number>(0);
  const mouseRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check for user agent OR touch capability via media query
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches;

    if (isMobileUserAgent || isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Immediate update for the dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onMouseDown = () => setHovered(true);
    const onMouseUp = () => setHovered(false);
    const handleLinkHover = () => setHovered(true);
    const handleLinkLeave = () => setHovered(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .cursor-hover');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    const animateRing = () => {
      const dx = mouseRef.current.x - posRef.current.x;
      const dy = mouseRef.current.y - posRef.current.y;
      
      posRef.current.x += dx * 0.1;
      posRef.current.y += dy * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      
      requestRef.current = requestAnimationFrame(animateRing);
    };
    
    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(requestRef.current);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  if (typeof window === 'undefined') return null;

  // Additional CSS-based safety check via render logic
  if (typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      {/* Small Dot (follows immediately) */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ marginLeft: '-1px', marginTop: '-1px' }}
      />
      {/* Lagging Ring */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference transition-all duration-300 ease-out ${hovered ? 'scale-150 bg-white' : 'scale-100'}`}
        style={{ marginLeft: '-24px', marginTop: '-24px' }}
      />
    </>
  );
};