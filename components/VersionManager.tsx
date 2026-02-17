
import React, { useState } from 'react';
import { McVersion } from '../types';

const INITIAL_VERSIONS: McVersion[] = [
  { id: '1.20.4', type: 'release', url: '', time: '', releaseTime: '2023-12-07', status: 'available' },
  { id: '1.20.1', type: 'release', url: '', time: '', releaseTime: '2023-06-12', status: 'installed' },
  { id: '1.19.4', type: 'release', url: '', time: '', releaseTime: '2023-03-14', status: 'available' },
  { id: '1.8.9', type: 'release', url: '', time: '', releaseTime: '2015-12-09', status: 'installed' },
];

const VersionManager: React.FC = () => {
  const [versions, setVersions] = useState<McVersion[]>(INITIAL_VERSIONS);
  const [filter, setFilter] = useState<'all' | 'release' | 'snapshot'>('all');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVersionId, setNewVersionId] = useState('');

  const startDownload = (id: string) => {
    setDownloading(id);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(null);
          setVersions(prevVersions => 
            prevVersions.map(v => v.id === id ? { ...v, status: 'installed' } : v)
          );
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const handleAddVersion = () => {
    if (!newVersionId) return;
    const isSnapshot = /[a-z]/.test(newVersionId);
    const newVer: McVersion = {
      id: newVersionId,
      type: isSnapshot ? 'snapshot' : 'release',
      url: '',
      time: new Date().toISOString(),
      releaseTime: 'Recent',
      status: 'available'
    };
    setVersions([newVer, ...versions]);
    setNewVersionId('');
    setShowAddModal(false);
  };

  const filtered = versions.filter(v => filter === 'all' || v.type === filter);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Version Manager</h2>
          <p className="text-neutral-400">Download and manage any version of Minecraft.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            ADD VERSION
          </button>
          <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            {(['all', 'release', 'snapshot'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === f ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(v => (
          <div key={v.id} className="glass p-5 rounded-2xl flex items-center justify-between group hover:border-violet-500/30 transition-all duration-300 border border-neutral-800">
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                v.type === 'release' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
              }`}>
                {v.id.split('.')[0]}.{v.id.split('.')[1] || '0'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-bold text-lg">{v.id}</h4>
                  <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded border ${
                    v.type === 'release' ? 'border-green-500/30 text-green-500' : 'border-yellow-500/30 text-yellow-500'
                  }`}>
                    {v.type}
                  </span>
                </div>
                <p className="text-neutral-500 text-xs">Released on {v.releaseTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {downloading === v.id ? (
                <div className="w-48 text-right">
                  <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
                    <span>Downloading Assets...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              ) : v.status === 'installed' ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 font-medium italic">Verified Installation</span>
                  <button className="p-2.5 rounded-xl bg-neutral-800 text-neutral-400 hover:text-red-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => startDownload(v.id)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-neutral-800 text-white rounded-xl font-bold text-sm hover:bg-neutral-700 transition-all active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  DOWNLOAD
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 glass backdrop-blur-xl">
          <div className="bg-[#111] border border-neutral-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Download Specific Version</h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Version String</label>
              <input 
                type="text" 
                value={newVersionId}
                onChange={(e) => setNewVersionId(e.target.value)}
                placeholder="e.g. 1.16.5, 1.12.2, 23w45a"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-all"
                autoFocus
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 text-neutral-400 font-bold hover:text-white transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={handleAddVersion}
                className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-500/20"
              >
                FETCH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionManager;
