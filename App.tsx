import React, { useState } from 'react';
import { Tab } from './types';
import TabNavigation from './components/TabNavigation';
import ConceptTab from './components/tabs/ConceptTab';
import VerticalTab from './components/tabs/VerticalTab';
import HorizontalTab from './components/tabs/HorizontalTab';
import DatabaseTab from './components/tabs/DatabaseTab';
import ComparisonTab from './components/tabs/ComparisonTab';
import QuizTab from './components/tabs/QuizTab';
import { ServerCrash } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CONCEPT);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-neon-blue selection:text-black">
      {/* Header */}
      <header className="py-6 border-b border-slate-800 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <ServerCrash size={120} className="text-neon-blue" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500">ScaleMaster</span>
            <span className="text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-400 font-mono">v1.0</span>
          </h1>
          <p className="mt-2 text-slate-400 max-w-lg">
            Interactive guide to System Scalability. Learn how to prevent your app from crashing under heavy load.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 pb-20">
        <div className="min-h-[60vh]">
          {activeTab === Tab.CONCEPT && <ConceptTab />}
          {activeTab === Tab.VERTICAL && <VerticalTab />}
          {activeTab === Tab.HORIZONTAL && <HorizontalTab />}
          {activeTab === Tab.DATABASE && <DatabaseTab />}
          {activeTab === Tab.COMPARISON && <ComparisonTab />}
          {activeTab === Tab.QUIZ && <QuizTab />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 mt-8 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Designed for Educational Purposes. Built with React & Tailwind.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
