
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VersionManager from './components/VersionManager';
import ModManager from './components/ModManager';
import ServerManager from './components/ServerManager';
import Settings from './components/Settings';
import LaunchConsole from './components/LaunchConsole';
import { AppView, McVersion, User, JavaConfig } from './types';
import { loginWithMicrosoft } from './services/authService';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.DASHBOARD);
  const [installedVersions, setInstalledVersions] = useState<McVersion[]>([]);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [user, setUser] = useState<User>({
    username: 'Guest',
    uuid: '',
    isLoggedIn: false,
    skinUrl: 'https://mc-heads.net/avatar/steve/64'
  });

  const [javaConfig, setJavaConfig] = useState<JavaConfig>({
    minRam: '2G',
    maxRam: '4G',
    jvmArgs: '-XX:+UseG1GC -XX:+UnlockExperimentalVMOptions -XX:MaxGCPauseMillis=100',
    javaPath: 'Default / Internal'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    const loggedUser = await loginWithMicrosoft();
    setUser(loggedUser);
  };

  const handleLogout = () => {
    setUser({
      username: 'Guest',
      uuid: '',
      isLoggedIn: false,
      skinUrl: 'https://mc-heads.net/avatar/steve/64'
    });
    setView(AppView.DASHBOARD);
  };

  const handlePlay = () => {
    if (!user.isLoggedIn) {
      handleLogin();
      return;
    }
    setIsLaunching(true);
  };

  const closeLaunchConsole = () => {
    setIsLaunching(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onPlay={handlePlay} installedVersions={installedVersions} />;
      case AppView.INSTALLATIONS:
        return <VersionManager />;
      case AppView.MODS:
        return <ModManager />;
      case AppView.SERVERS:
        return <ServerManager />;
      case AppView.SETTINGS:
        return (
          <Settings 
            javaConfig={javaConfig} 
            setJavaConfig={setJavaConfig} 
            onLogout={handleLogout} 
          />
        );
      default:
        return <Dashboard onPlay={handlePlay} installedVersions={installedVersions} />;
    }
  };

  if (isInitialLoading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="z-10 flex flex-col items-center gap-6">
          <div className="w-56 h-56">
            <img 
              src="https://github.com/pfuni/main/raw/refs/heads/main/LOGO_WHITE.svg" 
              alt="Sheihu Logo" 
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 bg-neutral-900 h-[2px] rounded-full overflow-hidden">
              <div className="h-full bg-white w-full origin-left animate-[loading_2.5s_ease-in-out_infinite]" />
            </div>
            <p className="text-[8px] text-neutral-500 uppercase font-black tracking-[0.8em] animate-pulse">Initializing Sheihu Engine</p>
          </div>
        </div>
        <style>{`
          @keyframes loading {
            0% { transform: scaleX(0); opacity: 0; }
            50% { transform: scaleX(0.7); opacity: 1; }
            100% { transform: scaleX(1); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden select-none bg-[#050505] text-neutral-200">
      <Sidebar currentView={currentView} setView={setView} />

      <main className="flex-1 relative flex flex-col min-w-0">
        <header className="h-20 border-b border-neutral-800 flex items-center justify-between px-10 bg-[#050505]/60 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-black tracking-[0.2em] text-white">SHEIHU</h1>
            <div className="h-6 w-[1px] bg-neutral-800" />
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.4em]">Engine /</span>
              <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">{currentView.replace('_', ' ')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {!user.isLoggedIn ? (
              <button 
                onClick={handleLogin}
                className="bg-white text-black text-[10px] font-black py-2.5 px-6 rounded-full hover:bg-neutral-200 transition-all uppercase tracking-[0.2em] border border-transparent"
              >
                Link Microsoft
              </button>
            ) : (
              <div className="flex items-center gap-4 bg-neutral-900/40 p-1.5 pr-4 rounded-2xl border border-neutral-800/50">
                <div className="w-9 h-9 rounded-xl overflow-hidden shadow-xl ring-1 ring-white/5" onClick={() => setView(AppView.SETTINGS)}>
                  <img src={user.skinUrl} className="w-full h-full object-cover" alt="Profile" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-white leading-none mb-1">{user.username}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[8px] text-neutral-500 font-black uppercase tracking-widest">Authenticated</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,#0a0a0a_0%,#050505_100%)]">
          {renderContent()}
        </div>

        {isLaunching && (
          <LaunchConsole 
            version="1.20.1" 
            onClose={closeLaunchConsole} 
            maxRam={javaConfig.maxRam}
          />
        )}
      </main>
    </div>
  );
};

export default App;
