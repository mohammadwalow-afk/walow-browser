import React from 'react';
import { ArrowRight, ArrowLeft, Home, Menu, Download } from 'lucide-react';

interface Props {
  canGoBack: boolean;
  canGoForward: boolean;
  tabsCount: number;
  isIncognito: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onGoHome: () => void;
  onOpenTabs: () => void;
  onOpenMenu: () => void;
  onOpenInstall: () => void;
}

export const AndroidNavBar: React.FC<Props> = (p) => {
  const cls = 'p-2.5 rounded-full text-slate-200 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent';
  return (
    <nav className={`w-full h-14 shrink-0 flex items-center justify-around border-t border-indigo-950 ${p.isIncognito ? 'bg-slate-800' : 'bg-[#0b0f1d]'}`}>
      {/* RTL: "back" points right */}
      <button className={cls} onClick={p.onGoBack} disabled={!p.canGoBack} aria-label="رجوع"><ArrowRight className="w-5 h-5" /></button>
      <button className={cls} onClick={p.onGoForward} disabled={!p.canGoForward} aria-label="تقدم"><ArrowLeft className="w-5 h-5" /></button>
      <button className={cls} onClick={p.onGoHome} aria-label="الرئيسية"><Home className="w-5 h-5" /></button>
      <button className={cls} onClick={p.onOpenTabs} aria-label="علامات التبويب">
        <span className="inline-flex w-5 h-5 items-center justify-center rounded-md border-2 border-current text-[10px] font-bold">{p.tabsCount}</span>
      </button>
      <button className={cls} onClick={p.onOpenInstall} aria-label="تثبيت"><Download className="w-5 h-5" /></button>
      <button className={cls} onClick={p.onOpenMenu} aria-label="القائمة"><Menu className="w-5 h-5" /></button>
    </nav>
  );
};
