
import React, { useState } from 'react';
import { Server } from '../types';

const INITIAL_SERVERS: Server[] = [
  { id: '1', name: 'Hypixel Network', ip: 'mc.hypixel.net' },
  { id: '2', name: 'Wynncraft', ip: 'play.wynncraft.com' },
];

const ServerManager: React.FC = () => {
  const [servers, setServers] = useState<Server[]>(INITIAL_SERVERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIp, setNewIp] = useState('');

  const addServer = () => {
    if (!newName || !newIp) return;
    const newServer: Server = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      ip: newIp
    };
    setServers([...servers, newServer]);
    setNewName('');
    setNewIp('');
    setShowAddModal(false);
  };

  const removeServer = (id: string) => {
    setServers(servers.filter(s => s.id !== id));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Server Management</h2>
          <p className="text-neutral-400">Manage your multiplayer servers and direct connections.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          ADD SERVER
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {servers.map(server => (
          <div key={server.id} className="glass p-5 rounded-2xl flex items-center justify-between border border-neutral-800 hover:border-violet-500/30 transition-all duration-300">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center font-bold text-neutral-400 overflow-hidden">
                <img 
                  src={`https://api.mcsrvstat.us/icon/${server.ip}`} 
                  alt="Icon" 
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <span className="absolute">MC</span>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">{server.name}</h4>
                <p className="text-neutral-500 text-xs font-mono">{server.ip}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                Join
              </button>
              <button 
                onClick={() => removeServer(server.id)}
                className="p-2 rounded-xl bg-neutral-800/50 text-neutral-500 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {servers.length === 0 && (
          <div className="py-20 text-center glass rounded-3xl border border-dashed border-neutral-800">
            <p className="text-neutral-500 italic">No servers added yet. Click 'Add Server' to get started.</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 glass backdrop-blur-xl">
          <div className="bg-[#111] border border-neutral-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Add New Server</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Server Name</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. My Survival World"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Server Address (IP)</label>
                <input 
                  type="text" 
                  value={newIp}
                  onChange={(e) => setNewIp(e.target.value)}
                  placeholder="e.g. play.server.com"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 text-neutral-400 font-bold hover:text-white transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={addServer}
                className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerManager;
