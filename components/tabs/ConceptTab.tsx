import React, { useState } from 'react';
import { Coffee, TrendingUp } from 'lucide-react';
import ServerIcon from '../ServerIcon';
import LoadSimulator from '../LoadSimulator';
import InfoCard from '../InfoCard';

const ConceptTab: React.FC = () => {
  const [load, setLoad] = useState(10);
  const isCrashed = load > 90;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="The Concept: Growth Pains" icon={<TrendingUp />}>
          <p className="mb-4">
            <strong className="text-neon-blue">Scalability</strong> is a system's ability to handle increased load without performance loss.
          </p>
          <div className="bg-slate-900/50 p-4 rounded border border-slate-700 mb-4">
            <h4 className="font-bold text-slate-200 flex items-center gap-2 mb-2">
              <Coffee className="w-4 h-4 text-amber-500" /> The Coffee Shop Analogy
            </h4>
            <p className="text-sm">
              Imagine a coffee shop with one barista. They can make 10 coffees an hour. 
              If 100 customers arrive at once, the line gets huge, people get angry, and the barista might quit (System Crash).
            </p>
          </div>
        </InfoCard>

        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 flex flex-col items-center shadow-inner">
          <h3 className="text-lg font-bold text-white mb-6">Interactive Stress Test</h3>
          
          <div className="w-full mb-8 relative">
             <LoadSimulator intensity={load} isCrashed={isCrashed} />
          </div>

          <div className="relative mb-8">
            <ServerIcon load={load} isCrashed={isCrashed} label="Primary Server" />
            {isCrashed && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-ping opacity-75 select-none">
                💥
              </div>
            )}
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm font-mono text-slate-400">
              <span>USER LOAD</span>
              <span className={isCrashed ? 'text-red-500 font-bold' : 'text-neon-blue'}>
                {isCrashed ? 'SYSTEM FAILURE' : `${load} REQ/SEC`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={load}
              onChange={(e) => setLoad(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-neon-blue"
            />
            <div className="flex justify-between text-xs text-slate-600 font-mono">
              <span>Idle</span>
              <span>Healthy</span>
              <span>Critical</span>
            </div>
          </div>
          
          {isCrashed && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/50 rounded text-red-200 text-sm text-center animate-bounce">
              ⚠️ Server Overload! The system has crashed. It needs to scale.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptTab;
