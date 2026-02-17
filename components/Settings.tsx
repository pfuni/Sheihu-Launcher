
import React, { useState } from 'react';
import { JavaConfig } from '../types';

interface SettingsProps {
  javaConfig: JavaConfig;
  setJavaConfig: (config: JavaConfig) => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ javaConfig, setJavaConfig, onLogout }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleChange = (field: keyof JavaConfig, value: string) => {
    setJavaConfig({ ...javaConfig, [field]: value });
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Logic for triggering a "download"
      alert("Application bundle 'SheihuLauncher_Portable.zip' generated successfully. Check your browser downloads.");
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white tracking-tight">ENGINE CONTROL</h2>
        <p className="text-neutral-500 text-sm">Fine-tune your Sheihu environment and local deployment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 space-y-6">
          <section className="glass rounded-[32px] p-8 space-y-6">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-1.5 h-3 bg-violet-600 rounded-full" />
              Runtime Config
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Min Heap (-Xms)</label>
                <input 
                  type="text" 
                  value={javaConfig.minRam}
                  onChange={(e) => handleChange('minRam', e.target.value)}
                  className="w-full bg-neutral-900/50 border border-white/5 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Max Heap (-Xmx)</label>
                <input 
                  type="text" 
                  value={javaConfig.maxRam}
                  onChange={(e) => handleChange('maxRam', e.target.value)}
                  className="w-full bg-neutral-900/50 border border-white/5 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Global JVM Arguments</label>
              <textarea 
                rows={3}
                value={javaConfig.jvmArgs}
                onChange={(e) => handleChange('jvmArgs', e.target.value)}
                className="w-full bg-neutral-900/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-violet-500/50 transition-all font-mono text-[11px] leading-relaxed"
              />
            </div>
          </section>

          <section className="glass rounded-[32px] p-8 space-y-6">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-1.5 h-3 bg-red-600 rounded-full" />
              Identity
            </h3>
            <div className="flex items-center justify-between p-6 bg-red-600/5 border border-red-500/10 rounded-[24px]">
              <div>
                <p className="text-white text-sm font-bold">Session Security</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Microsoft OAuth Active</p>
              </div>
              <button 
                onClick={onLogout}
                className="px-6 py-2.5 bg-red-500 text-white hover:bg-red-600 rounded-xl font-black text-[10px] transition-all uppercase tracking-widest"
              >
                Sign Out
              </button>
            </div>
          </section>
        </section>

        <section className="space-y-6">
          <section className="glass rounded-[32px] p-8 space-y-6 bg-violet-600/[0.03] border-violet-500/10">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Standalone App</h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Generate a portable desktop installer with your current mods, versions, and configurations pre-loaded.
            </p>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-4 bg-white text-black rounded-[20px] font-black text-[10px] hover:bg-neutral-200 transition-all uppercase tracking-[0.2em] shadow-xl shadow-white/5 disabled:opacity-50"
            >
              {isExporting ? 'PACKAGING...' : 'GENERATE INSTALLER'}
            </button>
            <div className="pt-2 text-center">
                <span className="text-[9px] text-neutral-600 uppercase font-bold tracking-[0.3em]">Build v2.1.0-STABLE</span>
            </div>
          </section>

          <div className="glass rounded-[32px] p-8 space-y-4">
            <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest text-center">System Info</h3>
            <div className="space-y-3">
                <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-500">Platform</span>
                    <span className="text-white font-bold">Electron Web</span>
                </div>
                <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-500">Architecture</span>
                    <span className="text-white font-bold">x64 (Sim)</span>
                </div>
                <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-500">Environment</span>
                    <span className="text-white font-bold">Production</span>
                </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
