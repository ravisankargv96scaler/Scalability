import React, { useState } from 'react';
import { Scale, TrendingUp, DollarSign } from 'lucide-react';
import InfoCard from '../InfoCard';

const ComparisonTab: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'vertical' | 'horizontal'>('intro');

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Table Comparison */}
        <div className="col-span-2 md:col-span-1">
            <InfoCard title="The Showdown" icon={<Scale />}>
                <div className="overflow-hidden rounded-lg border border-slate-700 mt-4">
                    <table className="w-full text-sm text-left text-slate-300">
                        <thead className="text-xs text-slate-100 uppercase bg-slate-700">
                            <tr>
                                <th className="px-4 py-3">Feature</th>
                                <th className="px-4 py-3 text-neon-yellow">Vertical (Up)</th>
                                <th className="px-4 py-3 text-neon-blue">Horizontal (Out)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 bg-slate-800">
                            <tr>
                                <td className="px-4 py-3 font-medium">Cost</td>
                                <td className="px-4 py-3 text-red-400">Expensive (Exponential)</td>
                                <td className="px-4 py-3 text-green-400">Linear (Cheap hardware)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium">Limit</td>
                                <td className="px-4 py-3 text-red-400">Finite (Hardware cap)</td>
                                <td className="px-4 py-3 text-green-400">Infinite</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium">Complexity</td>
                                <td className="px-4 py-3 text-green-400">Low (No code change)</td>
                                <td className="px-4 py-3 text-red-400">High (Distributed sys)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-medium">Downtime</td>
                                <td className="px-4 py-3 text-red-400">Required for upgrade</td>
                                <td className="px-4 py-3 text-green-400">None (Hot swap)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </InfoCard>
        </div>

        {/* CTO Game */}
        <div className="col-span-2 md:col-span-1 bg-slate-900 border border-slate-700 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-700 rounded-md text-neon-green"><DollarSign /></div>
                <h3 className="text-xl font-semibold text-white">The CTO Decision</h3>
            </div>

            {gameState === 'intro' && (
                <div className="space-y-4">
                    <p className="text-slate-300">
                        <strong>Scenario:</strong> You are a startup. You have very little cash, but your user base is exploding.
                        Investors want to see you handle 10x traffic next month.
                    </p>
                    <p className="text-slate-400 text-sm italic">"Choose wisely, or go bankrupt."</p>
                    
                    <div className="grid grid-cols-1 gap-4 mt-6">
                        <button 
                            onClick={() => setGameState('vertical')}
                            className="p-4 border border-slate-600 rounded bg-slate-800 hover:bg-slate-700 hover:border-neon-yellow transition-all text-left group"
                        >
                            <div className="font-bold text-white group-hover:text-neon-yellow mb-1">Option A: Buy a Supercomputer</div>
                            <div className="text-xs text-slate-400">Vertical Scaling. Maximize specs immediately.</div>
                        </button>
                        <button 
                            onClick={() => setGameState('horizontal')}
                            className="p-4 border border-slate-600 rounded bg-slate-800 hover:bg-slate-700 hover:border-neon-blue transition-all text-left group"
                        >
                            <div className="font-bold text-white group-hover:text-neon-blue mb-1">Option B: Rent Small Instances</div>
                            <div className="text-xs text-slate-400">Horizontal Scaling. Cloud auto-scaling group.</div>
                        </button>
                    </div>
                </div>
            )}

            {gameState === 'vertical' && (
                <div className="text-center animate-fadeIn">
                    <div className="text-6xl mb-4">💸</div>
                    <h4 className="text-2xl font-bold text-red-500 mb-2">BANKRUPT!</h4>
                    <p className="text-slate-300 mb-6">
                        You spent your entire seed round on a massive mainframe. It took 3 weeks to ship.
                        By the time it arrived, you had no money left for marketing.
                    </p>
                    <button onClick={() => setGameState('intro')} className="text-sm underline text-slate-500 hover:text-white">Try Again</button>
                </div>
            )}

            {gameState === 'horizontal' && (
                <div className="text-center animate-fadeIn">
                    <div className="text-6xl mb-4">🚀</div>
                    <h4 className="text-2xl font-bold text-green-500 mb-2">SUCCESS!</h4>
                    <p className="text-slate-300 mb-6">
                        You rented cheap servers on AWS. As traffic grew, you added more. 
                        You only paid for what you used. The investors are thrilled!
                    </p>
                    <button onClick={() => setGameState('intro')} className="text-sm underline text-slate-500 hover:text-white">Replay</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTab;