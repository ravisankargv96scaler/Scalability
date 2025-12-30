import React from 'react';
import { Tab } from '../types';
import { BookOpen, ArrowUp, Copy, Database, GitCompare, GraduationCap } from 'lucide-react';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: Tab.CONCEPT, label: 'Concept', icon: <BookOpen size={18} /> },
    { id: Tab.VERTICAL, label: 'Vertical', icon: <ArrowUp size={18} /> },
    { id: Tab.HORIZONTAL, label: 'Horizontal', icon: <Copy size={18} /> },
    { id: Tab.DATABASE, label: 'Database', icon: <Database size={18} /> },
    { id: Tab.COMPARISON, label: 'Comparison', icon: <GitCompare size={18} /> },
    { id: Tab.QUIZ, label: 'Quiz', icon: <GraduationCap size={18} /> },
  ];

  return (
    <div className="w-full border-b border-slate-700 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                  ${isActive 
                    ? 'bg-slate-800 text-neon-blue shadow-[0_0_10px_rgba(6,182,212,0.15)] border border-slate-600' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
