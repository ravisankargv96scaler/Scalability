import React, { useState } from 'react';
import { ArrowUpCircle, HardDrive, Cpu } from 'lucide-react';
import ServerIcon from '../ServerIcon';
import LoadSimulator from '../LoadSimulator';
import InfoCard from '../InfoCard';

const VerticalTab: React.FC = () => {
  const [load, setLoad] = useState(20);
  const [serverLevel, setServerLevel] = useState(1);
  
  // Capacity calculations
  const capacity = serverLevel * 30;
  const loadPercentage = Math.min((load / capacity) * 100, 110); // allow to go over 100 slightly for crash effect
  const isCrashed = load > capacity;

  const serverSize = serverLevel === 1 ? 'sm' : serverLevel === 2 ? 'md' : 'xl';

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
            <InfoCard title="Vertical Scaling (Scale Up)" icon={<ArrowUpCircle />}>
            <p className="mb-4">
                Also known as "Scaling Up". This involves adding more power (CPU, RAM) to an existing machine.
            </p>
            <div className="bg-slate-900/50 p-4 rounded border border-slate-700 mb-4 text-sm">
                <p><strong>Analogy:</strong> Hiring a stronger, faster barista (or a robot) instead of a normal human.</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Simple to implement (no code changes).</li>
                <li className="flex items-center gap-2"><span className="text-red-500">✘</span> Hardware has a hard limit.</li>
                <li className="flex items-center gap-2"><span className="text-red-500">✘</span> Single point of failure.</li>
            </ul>
            </InfoCard>
            
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <HardDrive className="text-neon-blue" /> Hardware Shop
                </h4>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setServerLevel(2)} 
                        disabled={serverLevel >= 2}
                        className={`flex-1 py-3 px-4 rounded border transition-all ${serverLevel >= 2 ? 'bg-slate-900 border-slate-700 text-slate-600' : 'bg-slate-700 border-neon-blue text-white hover:bg-slate-600'}`}
                    >
                        <div className="text-xs font-mono mb-1">LEVEL 2</div>
                        <div className="font-bold flex items-center justify-center gap-2"><Cpu size={16}/> +RAM</div>
                    </button>
                    <button 
                        onClick={() => setServerLevel(3)} 
                        disabled={serverLevel !== 2}
                        className={`flex-1 py-3 px-4 rounded border transition-all ${serverLevel === 3 ? 'bg-slate-900 border-slate-700 text-slate-600' : serverLevel < 2 ? 'opacity-50 cursor-not-allowed bg-slate-800 border-slate-700' : 'bg-slate-700 border-neon-blue text-white hover:bg-slate-600'}`}
                    >
                        <div className="text-xs font-mono mb-1">LEVEL 3</div>
                        <div className="font-bold flex items-center justify-center gap-2"><Cpu size={16}/> +CPU</div>
                    </button>
                </div>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 flex flex-col items-center shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 text-xs font-mono text-slate-500">
            CAPACITY: {capacity} RPS
          </div>

          <h3 className="text-lg font-bold text-white mb-6">Simulation</h3>
          
          <LoadSimulator intensity={load} isCrashed={isCrashed} />

          <div className="h-48 flex items-center justify-center relative w-full">
            <ServerIcon 
                size={serverSize} 
                load={loadPercentage} 
                isCrashed={isCrashed} 
                label={`Server Lvl ${serverLevel}`} 
            />
            {isCrashed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 backdrop-blur-sm rounded">
                <div className="text-center">
                    <div className="text-4xl mb-2">🔥</div>
                    <div className="text-red-500 font-bold">HARDWARE LIMIT REACHED</div>
                    <div className="text-xs text-slate-300">Cannot scale up further</div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full space-y-2 mt-auto">
            <div className="flex justify-between text-sm font-mono text-slate-400">
              <span>TRAFFIC</span>
              <span>{load} REQ/SEC</span>
            </div>
            <input
              type="range"
              min="0"
              max="120"
              value={load}
              onChange={(e) => setLoad(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-neon-blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTab;
