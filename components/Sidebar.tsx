
import React from 'react';
import { AppView } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: Icons.Dashboard },
    { id: AppView.INSTALLATIONS, label: 'Installations', icon: Icons.Installations },
    { id: AppView.MODS, label: 'Mod Library', icon: Icons.Mods },
    { id: AppView.SERVERS, label: 'Server List', icon: Icons.Servers },
  ];

  return (
    <div className="w-64 h-full border-r border-neutral-800 flex flex-col bg-[#080808] z-20">
      <div className="flex flex-col items-center">
        {/* Dominant logo: Zero vertical padding/margins for maximum slickness */}
        <div className="w-56 h-48 flex items-center justify-center flex-shrink-0">
           <img 
             src="https://github.com/pfuni/main/raw/refs/heads/main/LOGO_WHITE.svg" 
             alt="Sheihu Logo" 
             className="w-full h-full object-contain"
           />
        </div>
      </div>

      <nav className="flex-1 p-4 pt-0 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <item.icon />
            <span className="font-medium text-sm">{item.label}</span>
            {currentView === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button
          onClick={() => setView(AppView.SETTINGS)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-neutral-400 hover:text-white hover:bg-neutral-800/50 ${
            currentView === AppView.SETTINGS ? 'text-white bg-neutral-800' : ''
          }`}
        >
          <Icons.Settings />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
