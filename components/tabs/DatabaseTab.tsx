import React, { useState, useEffect } from 'react';
import { Database, Split, ArrowRight } from 'lucide-react';
import InfoCard from '../InfoCard';

const DatabaseTab: React.FC = () => {
  const [isSharded, setIsSharded] = useState(false);
  const [queryId, setQueryId] = useState<number | null>(null);

  // Simulate traffic loop
  useEffect(() => {
    const interval = setInterval(() => {
        setQueryId(Math.floor(Math.random() * 100) + 1);
        setTimeout(() => setQueryId(null), 800);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getTargetShard = (id: number) => {
    if (!isSharded) return 'main';
    return id <= 50 ? 'A' : 'B';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <InfoCard title="Database Sharding" icon={<Database />}>
            <p className="mb-4">
              Databases are stateful and harder to scale than app servers. <strong>Sharding</strong> splits a database into smaller pieces (shards) based on a key (like User ID).
            </p>
            <div className="bg-slate-900/50 p-4 rounded border border-slate-700 mb-4 text-sm">
                <p><strong>Concept:</strong> Instead of searching 1 billion rows in one place, you split it into 2 tables of 500 million rows. Queries are routed to the specific shard.</p>
            </div>
          </InfoCard>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Split className="text-neon-blue" /> Database Configuration
            </h4>
            <div className="flex gap-4 items-center justify-between">
                <span className="text-slate-300 text-sm">Current Topology:</span>
                <span className={`font-mono font-bold ${isSharded ? 'text-neon-green' : 'text-amber-500'}`}>
                    {isSharded ? 'DISTRIBUTED (SHARDED)' : 'MONOLITHIC'}
                </span>
            </div>
            <button
                onClick={() => setIsSharded(!isSharded)}
                className="w-full mt-4 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 text-white rounded transition-colors"
            >
                {isSharded ? 'Merge back to Single DB' : 'Shard Database (Partition)'}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 flex flex-col shadow-inner min-h-[400px]">
            <div className="flex items-center justify-center mb-8 relative">
                <div className="px-4 py-2 bg-slate-800 rounded-full border border-slate-600 text-xs font-mono text-slate-400">
                    APP SERVER ROUTER
                </div>
                {/* Incoming Query Animation */}
                {queryId && (
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20">
                        <div className="bg-white text-black text-xs font-bold px-2 py-1 rounded shadow-[0_0_10px_white] animate-bounce">
                            UID:{queryId}
                        </div>
                    </div>
                )}
            </div>

            {/* DB Visualization Container */}
            <div className="flex-1 relative flex items-center justify-center transition-all duration-700 ease-in-out">
                
                {/* Visual Lines based on query */}
                {queryId && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                        <path 
                            d={!isSharded 
                                ? "M 50% 0 L 50% 50%" 
                                : (queryId <= 50 ? "M 50% 0 Q 50% 20% 25% 60%" : "M 50% 0 Q 50% 20% 75% 60%")
                            }
                            fill="none" 
                            stroke={isSharded ? (queryId <= 50 ? '#0aff0a' : '#00f3ff') : '#fcee0a'} 
                            strokeWidth="3" 
                            strokeDasharray="5,5"
                            className="animate-[pulse_0.5s_infinite]"
                        />
                    </svg>
                )}

                {!isSharded ? (
                    /* Monolithic DB */
                    <div className="w-48 h-56 bg-slate-800 border-2 border-amber-500 rounded-xl flex flex-col items-center justify-center shadow-[0_0_20px_rgba(252,238,10,0.2)] transition-all duration-500">
                        <Database className="w-16 h-16 text-amber-500 mb-2" />
                        <div className="text-white font-bold">PRIMARY DB</div>
                        <div className="text-xs text-slate-400 mt-2 font-mono bg-slate-900 p-2 rounded">
                            IDs: 1 - 100
                        </div>
                        {queryId && <div className="mt-2 text-xs text-amber-400 animate-pulse">Writing Data...</div>}
                    </div>
                ) : (
                    /* Sharded DBs */
                    <div className="flex w-full justify-around gap-4">
                        {/* Shard A */}
                        <div className={`w-36 h-48 bg-slate-800 border-2 border-neon-green rounded-xl flex flex-col items-center justify-center shadow-[0_0_15px_rgba(10,255,10,0.2)] transition-all duration-500 ${queryId && queryId <= 50 ? 'scale-105 shadow-[0_0_25px_rgba(10,255,10,0.5)]' : 'scale-100'}`}>
                            <Database className="w-10 h-10 text-neon-green mb-2" />
                            <div className="text-white font-bold text-sm">SHARD A</div>
                            <div className="text-xs text-slate-400 mt-2 font-mono bg-slate-900 p-1 rounded">
                                IDs: 1 - 50
                            </div>
                        </div>

                        {/* Shard B */}
                        <div className={`w-36 h-48 bg-slate-800 border-2 border-neon-blue rounded-xl flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all duration-500 ${queryId && queryId > 50 ? 'scale-105 shadow-[0_0_25px_rgba(0,243,255,0.5)]' : 'scale-100'}`}>
                            <Database className="w-10 h-10 text-neon-blue mb-2" />
                            <div className="text-white font-bold text-sm">SHARD B</div>
                            <div className="text-xs text-slate-400 mt-2 font-mono bg-slate-900 p-1 rounded">
                                IDs: 51 - 100
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="mt-6 text-center text-sm text-slate-500">
                {isSharded ? "Query Router directs traffic to specific partition." : "All queries hit the same instance."}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTab;
