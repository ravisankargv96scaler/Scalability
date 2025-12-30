import React, { useState } from 'react';
import { Copy, Network, PlusCircle } from 'lucide-react';
import ServerIcon from '../ServerIcon';
import LoadSimulator from '../LoadSimulator';
import InfoCard from '../InfoCard';

const HorizontalTab: React.FC = () => {
  const [load, setLoad] = useState(30);
  const [serverCount, setServerCount] = useState(1);
  
  const serverCapacity = 30; // each server handles 30
  const loadPerServer = load / serverCount;
  const loadPercentage = Math.min((loadPerServer / serverCapacity) * 100, 110);
  const isCrashed = loadPerServer > serverCapacity;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
            <InfoCard title="Horizontal Scaling (Scale Out)" icon={<Copy />}>
            <p className="mb-4">
                Scaling out involves adding more machines to your pool of resources. 
            </p>
            <div className="bg-slate-900/50 p-4 rounded border border-slate-700 mb-4 text-sm">
                <p><strong>Analogy:</strong> Hiring 5 more baristas. If one gets sick, the others keep working.</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Theoretically infinite scale.</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> High redundancy (no single point of failure).</li>
                <li className="flex items-center gap-2"><span className="text-amber-500">!</span> Needs a <strong>Load Balancer</strong>.</li>
            </ul>
            </InfoCard>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex flex-col items-center">
                <div className="text-slate-400 mb-2 font-mono text-sm">FLEET MANAGEMENT</div>
                <button 
                    onClick={() => setServerCount(prev => Math.min(prev + 1, 6))}
                    className="w-full py-4 bg-neon-blue/10 border border-neon-blue text-neon-blue rounded hover:bg-neon-blue/20 transition-all flex items-center justify-center gap-3 font-bold"
                >
                    <PlusCircle /> ADD SERVER NODE
                </button>
                <div className="mt-4 flex gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={`h-2 flex-1 rounded ${i < serverCount ? 'bg-neon-blue' : 'bg-slate-700'}`}></div>
                    ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">Current Fleet: {serverCount} Nodes</p>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 flex flex-col items-center shadow-inner relative overflow-hidden min-h-[400px]">
          
          {/* Visualization of Load Balancer */}
          <div className="w-full flex items-center justify-center mb-4">
             <div className="px-4 py-2 bg-slate-700 rounded border border-slate-600 flex items-center gap-2 shadow-lg z-10">
                <Network className="text-neon-green w-5 h-5" />
                <span className="text-xs font-mono font-bold text-white">LOAD BALANCER</span>
             </div>
          </div>

          <div className="w-full relative h-16 mb-2">
            {/* Visual lines connecting LB to servers would go here, simplified for React */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-slate-700 -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-slate-700"></div>
          </div>
          
          {/* Traffic Simulator */}
          <div className="absolute top-16 w-full opacity-50">
             <LoadSimulator intensity={load} isCrashed={isCrashed} targetCount={serverCount} />
          </div>

          {/* Server Grid */}
          <div className="grid grid-cols-3 gap-4 w-full place-items-center mt-4">
             {Array.from({ length: serverCount }).map((_, idx) => (
                 <ServerIcon 
                    key={idx}
                    size="sm"
                    load={loadPercentage}
                    isCrashed={isCrashed}
                    label={`S-${idx + 1}`}
                 />
             ))}
          </div>
          
          {isCrashed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 backdrop-blur-sm">
                <div className="text-center p-6 bg-slate-800 rounded border border-red-500">
                    <div className="text-2xl mb-1">🔥 ALL NODES CRITICAL</div>
                    <div className="text-red-400 font-bold mb-2">Traffic exceeds total cluster capacity</div>
                    <button 
                        onClick={() => setServerCount(prev => Math.min(prev + 1, 6))}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-sm"
                    >
                        ADD NODE TO FIX
                    </button>
                </div>
            </div>
           )}

          <div className="w-full space-y-2 mt-auto pt-8">
            <div className="flex justify-between text-sm font-mono text-slate-400">
              <span>GLOBAL TRAFFIC</span>
              <span>{load} REQ/SEC</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={load}
              onChange={(e) => setLoad(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-neon-blue"
            />
            <div className="text-center text-xs text-slate-500 font-mono">
                Load per server: {Math.round(loadPerServer)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalTab;
