
export enum AppView {
  DASHBOARD = 'dashboard',
  INSTALLATIONS = 'installations',
  MODS = 'mods',
  SERVERS = 'servers',
  SETTINGS = 'settings'
}

export interface McVersion {
  id: string;
  type: 'release' | 'snapshot' | 'beta';
  url: string;
  time: string;
  releaseTime: string;
  status: 'available' | 'downloading' | 'installed';
}

export interface Mod {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  icon?: string;
}

export interface JavaConfig {
  minRam: string;
  maxRam: string;
  jvmArgs: string;
  javaPath: string;
}

export interface User {
  username: string;
  uuid: string;
  isLoggedIn: boolean;
  skinUrl: string;
}

export interface Server {
  id: string;
  name: string;
  ip: string;
  icon?: string;
}

export interface Installation {
  name: string;
  versionId: string;
  lastPlayed?: string;
  type: 'vanilla' | 'forge' | 'fabric';
}
