import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="p-2 bg-slate-700 rounded-md text-neon-blue">{icon}</div>}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
