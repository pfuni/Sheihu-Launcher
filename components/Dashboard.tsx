
import React from 'react';
import { McVersion } from '../types';

interface DashboardProps {
  onPlay: () => void;
  installedVersions: McVersion[];
}

const Dashboard: React.FC<DashboardProps> = ({ onPlay, installedVersions }) => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="relative h-[300px] rounded-3xl overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/minecraft-classic/1200/400" 
          alt="Banner" 
          className="w-full h-full object-cover grayscale opacity-50 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 w-full flex items-end justify-between">
          <div>
            <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight">Ready for adventure?</h1>
            <p className="text-neutral-300 text-lg max-w-lg">Experience Minecraft like never before with high-performance optimization and custom modpacks.</p>
          </div>
          <button 
            onClick={onPlay}
            className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-neutral-200 transition-all transform active:scale-95 shadow-xl shadow-white/10"
          >
            PLAY NOW
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <div className="glass p-6 rounded-3xl space-y-4">
          <h3 className="text-neutral-400 font-bold uppercase text-xs tracking-widest">Last Version</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center text-violet-400">
              <span className="font-bold">1.20</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Release 1.20.1</p>
              <p className="text-neutral-500 text-sm">Last played: 2 hours ago</p>
            </div>
          </div>
        </div>

        {/* System Performance Card */}
        <div className="glass p-6 rounded-3xl space-y-4">
          <h3 className="text-neutral-400 font-bold uppercase text-xs tracking-widest">System Health</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-neutral-500 text-xs">Allocated Memory</span>
              <span className="text-white font-bold text-sm">4.0 / 8.0 GB</span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-violet-500 h-full w-1/2 rounded-full" />
            </div>
          </div>
        </div>

        {/* News Feed Card */}
        <div className="glass p-6 rounded-3xl space-y-4">
          <h3 className="text-neutral-400 font-bold uppercase text-xs tracking-widest">Global News</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex-shrink-0" />
              <div>
                <p className="text-xs text-white font-medium line-clamp-1">Minecraft 1.21: The Trial Chambers</p>
                <p className="text-[10px] text-neutral-500">Official Mojang Update</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
