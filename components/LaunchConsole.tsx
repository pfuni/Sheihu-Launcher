
import React, { useState, useEffect, useRef } from 'react';

interface LaunchConsoleProps {
  version: string;
  maxRam: string;
  onClose: () => void;
}

const LaunchConsole: React.FC<LaunchConsoleProps> = ({ version, maxRam, onClose }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'working' | 'ready'>('working');
  const scrollRef = useRef<HTMLDivElement>(null);

  const logLines = [
    `[SHEIHU] Initializing launch environment for Minecraft ${version}`,
    `[SHEIHU] Checking Mojang Authentication status...`,
    `[AUTH] Access Token verified. User: Steve_Sheihu`,
    `[SHEIHU] Fetching version manifest from Mojang servers...`,
    `[FILES] Comparing local assets with remote hash indices...`,
    `[FILES] 1,429 assets verified. All files intact.`,
    `[SHEIHU] Constructing classpath...`,
    `[SHEIHU] Allocating JVM memory: -Xmx${maxRam}`,
    `[JVM] Starting subprocess: java -jar minecraft.jar --version ${version}`,
    `[GAME] Setting up LWJGL window...`,
    `[GAME] Initializing SoundSystem...`,
    `[GAME] Reloading Resource Packs: [Vanilla]`,
    `[GAME] Minecraft initialized successfully.`,
    `[SHEIHU] Engine standby. Handover to game process complete.`
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < logLines.length) {
        setLogs(prev => [...prev, logLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setStatus('ready');
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-12 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-4xl h-[600px] glass rounded-[32px] flex flex-col overflow-hidden border border-white/5 shadow-2xl scanline relative">
        <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
            </div>
            <span className="ml-4 text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Sheihu Terminal v1.0.4</span>
          </div>
          {status === 'ready' && (
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-white text-black text-[10px] font-black rounded-full hover:bg-neutral-200 transition-all uppercase tracking-widest"
            >
              Close Console
            </button>
          )}
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 p-8 overflow-y-auto mono text-xs leading-relaxed space-y-1 bg-black/20"
        >
          {logs.map((log, i) => {
            const isError = log.includes('[ERROR]');
            const isWarning = log.includes('[WARN]');
            const isInfo = log.includes('[SHEIHU]');
            
            let color = 'text-neutral-400';
            if (isError) color = 'text-red-400';
            else if (isWarning) color = 'text-yellow-400';
            else if (isInfo) color = 'text-violet-400 font-bold';

            return (
              <div key={i} className={`${color} animate-in slide-in-from-left-2 duration-300`}>
                <span className="opacity-30 mr-3">[{new Date().toLocaleTimeString()}]</span>
                {log}
              </div>
            );
          })}
          {status === 'working' && (
            <div className="flex items-center gap-2 text-white animate-pulse mt-4">
              <span className="w-2 h-2 bg-white rounded-full" />
              <span className="font-bold tracking-widest uppercase text-[10px]">Processing...</span>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/5 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <div className="space-y-1">
                    <p className="text-[9px] text-neutral-500 uppercase font-black tracking-widest">Engine Status</p>
                    <p className="text-xs text-white font-bold">{status === 'working' ? 'BOOTING...' : 'IDLE / RUNNING'}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] text-neutral-500 uppercase font-black tracking-widest">JVM Memory</p>
                    <p className="text-xs text-violet-400 font-bold">{maxRam}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${status === 'working' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-[9px] text-neutral-400 uppercase font-bold tracking-widest">Process 069420</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchConsole;
