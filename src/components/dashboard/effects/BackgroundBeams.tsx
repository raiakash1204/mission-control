import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const BackgroundBeams: React.FC = () => {
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createBeam = () => {
      if (!beamsRef.current) return;

      const beam = document.createElement('div');
      beam.className = 'beam-line';
      beam.style.top = `${Math.random() * 100}vh`;
      beam.style.width = '200px';
      
      beamsRef.current.appendChild(beam);

      setTimeout(() => {
        if (beamsRef.current && beam.parentNode) {
          beamsRef.current.removeChild(beam);
        }
      }, 4000);
    };

    const interval = setInterval(createBeam, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" ref={beamsRef}>
      {/* Static background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Grid lines overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent" 
             style={{ 
               backgroundImage: `repeating-linear-gradient(
                 90deg,
                 transparent,
                 transparent 98px,
                 hsl(var(--primary) / 0.1) 100px
               )` 
             }} 
        />
        <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" 
             style={{ 
               backgroundImage: `repeating-linear-gradient(
                 0deg,
                 transparent,
                 transparent 98px,
                 hsl(var(--primary) / 0.1) 100px
               )` 
             }} 
        />
      </div>
    </div>
  );
};