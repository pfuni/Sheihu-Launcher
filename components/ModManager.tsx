
import React, { useState } from 'react';
import { getModSuggestions } from '../services/geminiService';

const ModManager: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsSearching(true);
    const results = await getModSuggestions(prompt);
    setSuggestions(results);
    setIsSearching(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-white tracking-tighter">MOD LIBRARY</h2>
        <p className="text-neutral-500 max-w-xl mx-auto">Discover the perfect components for your Minecraft instance.</p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. 'Performance mods for 1.20.1' or 'Technical engineering mods'"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-5 px-14 text-white focus:outline-none focus:border-violet-500/50 transition-all shadow-2xl focus:ring-4 focus:ring-violet-500/10"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-violet-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-violet-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-violet-700 disabled:opacity-50 transition-all"
          >
            {isSearching ? 'SEARCHING...' : 'DISCOVER'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isSearching ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass rounded-3xl p-6 space-y-4 animate-pulse">
              <div className="w-12 h-12 bg-neutral-800 rounded-xl" />
              <div className="h-4 bg-neutral-800 rounded w-1/2" />
              <div className="h-20 bg-neutral-800 rounded" />
            </div>
          ))
        ) : suggestions.length > 0 ? (
          suggestions.map((mod, i) => (
            <div key={i} className="glass p-6 rounded-3xl border border-neutral-800 hover:border-violet-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-bold uppercase text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full">
                  {mod.category}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">{mod.name}</h4>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">{mod.description}</p>
              <div className="p-3 bg-neutral-900/50 rounded-xl mb-4 border border-neutral-800">
                 <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest mb-1">Reasoning</p>
                 <p className="text-xs text-neutral-300 italic">"{mod.reason}"</p>
              </div>
              <button className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold text-xs transition-colors uppercase tracking-widest">
                Add to Instance
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="mb-4 inline-block p-4 bg-neutral-900 rounded-full border border-neutral-800 text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <p className="text-neutral-500">Search for specific mods or themes to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModManager;
