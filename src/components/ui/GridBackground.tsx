import { motion } from 'framer-motion';

export const GridBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none perspective-1000">
      <motion.div
        animate={{ backgroundPosition: ['0px 0px', '0px 40px'] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          transform: 'rotateX(60deg) scale(2)',
          transformOrigin: 'top center'
        }}
      />
    </div>
  );
};
