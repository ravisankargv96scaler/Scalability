import React from 'react';
import { Server, Activity, AlertTriangle, ZapOff } from 'lucide-react';

interface ServerIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  load: number; // 0 to 100
  isCrashed?: boolean;
  label?: string;
}

const ServerIcon: React.FC<ServerIconProps> = ({ size = 'md', load, isCrashed = false, label }) => {
  let sizeClasses = "w-16 h-16";
  let containerSize = "w-24";
  
  if (size === 'sm') { sizeClasses = "w-12 h-12"; containerSize = "w-16"; }
  if (size === 'lg') { sizeClasses = "w-24 h-24"; containerSize = "w-32"; }
  if (size === 'xl') { sizeClasses = "w-32 h-32"; containerSize = "w-40"; }

  // Determine color based on load
  let statusColor = "text-neon-blue shadow-neon-blue";
  let glowColor = "shadow-[0_0_10px_rgba(0,243,255,0.5)]";
  let statusIcon = <Activity className="w-4 h-4 text-neon-blue" />;

  if (load > 50) {
    statusColor = "text-neon-yellow shadow-neon-yellow";
    glowColor = "shadow-[0_0_15px_rgba(252,238,10,0.5)]";
    statusIcon = <Activity className="w-4 h-4 text-neon-yellow animate-pulse" />;
  }
  if (load > 85) {
    statusColor = "text-neon-red shadow-neon-red";
    glowColor = "shadow-[0_0_20px_rgba(255,0,60,0.6)]";
    statusIcon = <AlertTriangle className="w-4 h-4 text-neon-red animate-bounce" />;
  }
  if (isCrashed) {
    statusColor = "text-gray-600";
    glowColor = "";
    statusIcon = <ZapOff className="w-6 h-6 text-gray-500" />;
  }

  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-500 ${containerSize}`}>
      <div className={`relative bg-slate-800 border-2 ${isCrashed ? 'border-gray-700' : 'border-slate-600'} rounded-lg p-2 flex items-center justify-center ${glowColor} transition-all duration-500 ${isCrashed ? 'opacity-50 grayscale' : ''}`}>
        <Server className={`${sizeClasses} ${isCrashed ? 'text-gray-500' : 'text-slate-300'}`} />
        
        {/* LED Lights */}
        {!isCrashed && (
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${load < 90 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[pulse_1.5s_infinite]"></div>
            {size !== 'sm' && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-[pulse_2s_infinite]"></div>}
          </div>
        )}

        {/* Status Overlay */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
           {statusIcon}
        </div>
      </div>
      
      {/* Load Bar */}
      {!isCrashed && (
        <div className="w-full mt-2 bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${load > 85 ? 'bg-neon-red' : load > 50 ? 'bg-neon-yellow' : 'bg-neon-blue'}`} 
            style={{ width: `${Math.min(load, 100)}%` }}
          />
        </div>
      )}
      
      {label && <span className="mt-1 text-xs font-mono text-slate-400">{label}</span>}
      {isCrashed && <span className="mt-1 text-xs font-bold text-red-500 animate-pulse">CRASHED</span>}
    </div>
  );
};

export default ServerIcon;
