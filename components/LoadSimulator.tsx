import React, { useMemo } from 'react';

interface LoadSimulatorProps {
  intensity: number; // 0-100+
  isCrashed: boolean;
  targetCount?: number; // For splitting traffic
}

const LoadSimulator: React.FC<LoadSimulatorProps> = ({ intensity, isCrashed, targetCount = 1 }) => {
  // Use useMemo to generate dots deterministically based on intensity.
  // This ensures that existing dots (0..N) preserve their properties when new dots are added,
  // preventing animation resets or jitter.
  const dots = useMemo(() => {
    // Increased density: 1 dot per 1 intensity unit (previously intensity / 5)
    // Capped at 300 for performance
    const count = Math.min(Math.floor(intensity), 300); 
    
    return Array.from({ length: count }).map((_, i) => {
      // Deterministic pseudo-random generation based on index 'i'
      // This ensures stability of properties for a given dot index across renders
      const seed = i * 123.45; 
      const duration = 1 + ((seed % 100) / 100); // 1.0s to 2.0s
      const delay = ((seed * 13) % 200) / 100; // 0.0s to 2.0s
      const marginTop = ((seed * 7) % 28) - 14; // -14px to +14px spread
      
      return {
        id: i,
        duration,
        delay,
        marginTop,
      };
    });
  }, [intensity]);

  if (isCrashed) return null;

  return (
    <div className="w-full h-16 relative overflow-hidden my-4 bg-slate-900/50 rounded border border-slate-800">
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-r border-cyan-500"></div>
        ))}
      </div>

      {intensity > 0 && (
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent to-slate-900/0 z-10 flex items-center">
            <span className="text-xs text-slate-500 ml-2 font-mono leading-none">USER<br/>REQ</span>
        </div>
      )}

      {/* Traffic Particles */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute top-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_cyan]"
          style={{
            animation: `flow ${dot.duration}s linear infinite`,
            animationDelay: `-${dot.delay}s`,
            left: '0',
            marginTop: `${dot.marginTop}px`,
            opacity: 0.8
          }}
        />
      ))}
    </div>
  );
};

export default LoadSimulator;