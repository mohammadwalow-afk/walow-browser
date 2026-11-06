import React, { useState } from 'react';
import { Search, Sparkles, Languages, Camera, Smartphone, Image, Mic, Download, CheckCircle2 } from 'lucide-react';
import { SearchEngine, SEARCH_ENGINES } from '../types/browser';

interface Props {
  onNavigate: (input: string) => void;
  onOpenVideoDubber: (url?: string, title?: string) => void;
  onOpenVisualSearch: (img?: string) => void;
  onOpenAppInstaller: () => void;
  onOpenWallpaperSelector: () => void;
  onOpenDubbingPlatform: () => void;
  onOpenAIChat: () => void;
  onOpenVideoDownloader: (url?: string, title?: string) => void;
  onInstallPWA: () => void;
  isInstalled: boolean;
  selectedEngine: SearchEngine;
  currentWallpaperName: string;
}

const SITES = [
  { name: 'Google', url: 'https://www.google.com/webhp?igu=1', color: '#4285f4', letter: 'G' },
  { name: 'Wikipedia', url: 'https://ar.wikipedia.org', color: '#64748b', letter: 'W' },
  { name: 'YouTube', url: 'https://www.youtube.com', color: '#ef4444', letter: '▶' },
  { name: 'GitHub', url: 'https://github.com', color: '#334155', letter: 'GH' },
  { name: 'X', url: 'https://x.com', color: '#0f172a', letter: 'X' },
  { name: 'Facebook', url: 'https://facebook.com', color: '#1877f2', letter: 'f' },
  { name: 'Al Jazeera', url: 'https://www.aljazeera.net', color: '#d97706', letter: 'ج' },
  { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', color: '#16a34a', letter: 'M' },
];

export const SpeedDialHome: React.FC<Props> = (p) => {
  const [q, setQ] = useState('');
  const tools = [
    { label: 'مساعد AI', icon: Sparkles, onClick: p.onOpenAIChat, color: 'from-fuchsia-500 to-purple-600' },
    { label: 'ترجمة ودبلجة', icon: Languages, onClick: () => p.onOpenVideoDubber(), color: 'from-blue-500 to-cyan-500' },
    { label: 'بحث بالصور', icon: Camera, onClick: () => p.onOpenVisualSearch(), color: 'from-emerald-500 to-teal-500' },
    { label: 'استوديو الصوت', icon: Mic, onClick: p.onOpenDubbingPlatform, color: 'from-orange-500 to-rose-500' },
    { label: 'تنزيل فيديو', icon: Download, onClick: () => p.onOpenVideoDownloader(), color: 'from-sky-500 to-indigo-500' },
    { label: 'تطبيقات الويب', icon: Smartphone, onClick: p.onOpenAppInstaller, color: 'from-lime-500 to-green-600' },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-l from-blue-400 to-purple-400 bg-clip-text text-transparent">Walow</h1>
        <p className="text-xs text-slate-400 mt-1">متصفحك الذكي · البحث عبر {SEARCH_ENGINES[p.selectedEngine].name}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          p.onNavigate(q);
        }}
        className="flex items-center gap-2 rounded-2xl bg-slate-950/70 border border-indigo-900/60 px-4 py-3 mb-8 backdrop-blur"
      >
        <Search className="w-5 h-5 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="عن ماذا تبحث اليوم؟" className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500" />
      </form>

      <div className="grid grid-cols-4 gap-y-5 gap-x-3 mb-8">
        {SITES.map((s) => (
          <button key={s.name} onClick={() => p.onNavigate(s.url)} className="flex flex-col items-center gap-1.5 group">
            <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-active:scale-95 transition" style={{ background: s.color }}>{s.letter}</span>
            <span className="text-[11px] text-slate-300 truncate max-w-full">{s.name}</span>
          </button>
        ))}
      </div>

      <h2 className="text-xs font-bold text-slate-400 mb-3">أدوات والو</h2>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {tools.map((t) => (
          <button key={t.label} onClick={t.onClick} className="flex flex-col items-center gap-2 rounded-2xl bg-slate-950/60 border border-indigo-950 py-4 backdrop-blur hover:border-purple-700 transition">
            <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center`}><t.icon className="w-5 h-5 text-white" /></span>
            <span className="text-[11px] text-slate-200">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={p.onOpenWallpaperSelector} className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-slate-950/60 border border-indigo-950 py-3 text-xs text-slate-300">
          <Image className="w-4 h-4" /> الخلفية: {p.currentWallpaperName}
        </button>
        {p.isInstalled ? (
          <span className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/10 text-emerald-300 py-3 text-xs"><CheckCircle2 className="w-4 h-4" /> مثبت</span>
        ) : (
          <button onClick={p.onInstallPWA} className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-blue-600 to-purple-600 py-3 text-xs font-bold text-white">
            <Download className="w-4 h-4" /> ثبّت المتصفح
          </button>
        )}
      </div>
      <p className="text-center text-[10px] text-slate-500 mt-8">mohammad walow © 2026</p>
    </div>
  );
};
