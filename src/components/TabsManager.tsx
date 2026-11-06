import React from 'react';
import { X, Plus, EyeOff, Globe } from 'lucide-react';
import { Tab } from '../types/browser';

interface Props {
  isOpen: boolean;
  tabs: Tab[];
  activeTabId: string;
  isIncognitoMode: boolean;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: (incognito?: boolean) => void;
  onToggleIncognitoMode: () => void;
  onCloseManager: () => void;
}

export const TabsManager: React.FC<Props> = (p) => {
  if (!p.isOpen) return null;
  const visible = p.tabs.filter((t) => t.isIncognito === p.isIncognitoMode);
  return (
    <div className={`absolute inset-0 z-50 flex flex-col ${p.isIncognitoMode ? 'bg-slate-900' : 'bg-[#0b0f1d]'}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-950">
        <div className="flex rounded-full bg-slate-800 p-1 text-xs">
          <button onClick={() => p.isIncognitoMode && p.onToggleIncognitoMode()} className={`px-3 py-1.5 rounded-full flex items-center gap-1 ${!p.isIncognitoMode ? 'bg-purple-600 text-white' : 'text-slate-400'}`}><Globe className="w-3.5 h-3.5" /> عادي</button>
          <button onClick={() => !p.isIncognitoMode && p.onToggleIncognitoMode()} className={`px-3 py-1.5 rounded-full flex items-center gap-1 ${p.isIncognitoMode ? 'bg-purple-600 text-white' : 'text-slate-400'}`}><EyeOff className="w-3.5 h-3.5" /> خاص</button>
        </div>
        <button onClick={p.onCloseManager} className="text-sm font-bold text-purple-300 px-2">تم</button>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 grid grid-cols-2 gap-3 content-start">
        {visible.length === 0 && <p className="col-span-2 text-center text-slate-500 py-10">لا توجد علامات تبويب {p.isIncognitoMode ? 'خاصة' : ''}</p>}
        {visible.map((t) => (
          <div
            key={t.id}
            onClick={() => { p.onSelectTab(t.id); p.onCloseManager(); }}
            className={`relative h-36 rounded-2xl p-3 cursor-pointer bg-slate-800/80 border-2 ${t.id === p.activeTabId ? 'border-purple-500' : 'border-transparent'}`}
          >
            <button onClick={(e) => { e.stopPropagation(); p.onCloseTab(t.id); }} className="absolute top-2 left-2 p-1 rounded-full bg-black/40 text-slate-300" aria-label="إغلاق"><X className="w-3.5 h-3.5" /></button>
            <p className="text-xs font-bold text-white line-clamp-2 ml-6">{t.title}</p>
            <p className="text-[10px] text-slate-400 mt-1 truncate" dir="ltr">{t.url}</p>
          </div>
        ))}
      </div>
      <button onClick={() => p.onNewTab(p.isIncognitoMode)} className="m-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-blue-600 to-purple-600 py-3 font-bold text-white">
        <Plus className="w-5 h-5" /> {p.isIncognitoMode ? 'تبويب خاص جديد' : 'تبويب جديد'}
      </button>
    </div>
  );
};
