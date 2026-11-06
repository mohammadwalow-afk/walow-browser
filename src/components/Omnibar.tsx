import React, { useEffect, useState } from 'react';
import { Search, RotateCw, Lock, ShieldCheck, ShieldOff, Camera, Languages, Download, Smartphone, EyeOff } from 'lucide-react';
import { SearchEngine, SEARCH_ENGINES } from '../types/browser';

interface Props {
  currentUrl: string;
  isLoading: boolean;
  isIncognito: boolean;
  adBlockCount: number;
  adBlockEnabled: boolean;
  selectedEngine: SearchEngine;
  onNavigate: (input: string) => void;
  onReload: () => void;
  onSelectEngine: (e: SearchEngine) => void;
  onOpenVisualSearch: () => void;
  onOpenVideoDubber: () => void;
  onOpenAppInstaller: () => void;
  onOpenVideoDownloader: (url?: string, title?: string) => void;
  onToggleAdBlock: () => void;
}

const displayUrl = (url: string) =>
  url === 'walow://home' ? '' : url.startsWith('search://') ? decodeURIComponent(url.replace('search://', '')) : url;

export const Omnibar: React.FC<Props> = (p) => {
  const [value, setValue] = useState(displayUrl(p.currentUrl));
  useEffect(() => setValue(displayUrl(p.currentUrl)), [p.currentUrl]);
  const isWeb = p.currentUrl.startsWith('http');

  const tool = 'p-2 rounded-full text-slate-300 hover:bg-white/10 shrink-0';
  return (
    <div className={`w-full shrink-0 px-3 pt-2 pb-2 border-b border-indigo-950 ${p.isIncognito ? 'bg-slate-800' : 'bg-[#0f1426]'}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          p.onNavigate(value);
          (document.activeElement as HTMLElement | null)?.blur();
        }}
        className="flex items-center gap-2 rounded-full bg-slate-900/90 border border-indigo-900/60 px-3 py-1.5 focus-within:border-purple-500"
      >
        {p.isIncognito ? <EyeOff className="w-4 h-4 text-purple-300 shrink-0" /> : isWeb ? <Lock className="w-4 h-4 text-emerald-400 shrink-0" /> : <Search className="w-4 h-4 text-slate-400 shrink-0" />}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={(e) => e.target.select()}
          placeholder="ابحث أو اكتب عنوان موقع"
          className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          inputMode="search"
          enterKeyHint="go"
        />
        <button type="button" onClick={p.onReload} className="text-slate-400 hover:text-white shrink-0" aria-label="تحديث">
          <RotateCw className={`w-4 h-4 ${p.isLoading ? 'animate-spin' : ''}`} />
        </button>
      </form>

      <div className="flex items-center gap-1 mt-1.5 overflow-x-auto no-scrollbar text-xs">
        <select
          value={p.selectedEngine}
          onChange={(e) => p.onSelectEngine(e.target.value as SearchEngine)}
          className="bg-slate-900 border border-indigo-900/60 rounded-full px-2 py-1 text-slate-300 outline-none shrink-0"
          aria-label="محرك البحث"
        >
          {Object.entries(SEARCH_ENGINES).map(([k, v]) => (
            <option key={k} value={k}>{v.name}</option>
          ))}
        </select>
        <button onClick={p.onToggleAdBlock} className={`flex items-center gap-1 px-2 py-1 rounded-full shrink-0 ${p.adBlockEnabled ? 'text-emerald-300 bg-emerald-500/10' : 'text-slate-400 bg-slate-800'}`}>
          {p.adBlockEnabled ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldOff className="w-3.5 h-3.5" />}
          <span>{p.adBlockEnabled ? p.adBlockCount : 'معطل'}</span>
        </button>
        <div className="flex-1" />
        <button className={tool} onClick={p.onOpenVisualSearch} aria-label="بحث بالصور"><Camera className="w-4 h-4" /></button>
        <button className={tool} onClick={p.onOpenVideoDubber} aria-label="دبلجة"><Languages className="w-4 h-4" /></button>
        <button className={tool} onClick={() => p.onOpenVideoDownloader(isWeb ? p.currentUrl : undefined)} aria-label="تنزيل فيديو"><Download className="w-4 h-4" /></button>
        <button className={tool} onClick={p.onOpenAppInstaller} aria-label="تطبيقات"><Smartphone className="w-4 h-4" /></button>
      </div>
    </div>
  );
};
