import React from 'react';
import { Download, Languages, Camera, Smartphone, Image, Mic, Monitor, ShieldCheck, Bookmark, History, Share2, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isDesktopMode: boolean;
  adBlockEnabled: boolean;
  onInstallPWA: () => void;
  onOpenVideoDubber: () => void;
  onOpenVisualSearch: () => void;
  onOpenAppInstaller: () => void;
  onOpenWallpapers: () => void;
  onOpenDubbingPlatform: () => void;
  onToggleDesktopMode: () => void;
  onToggleAdBlock: () => void;
  onOpenBookmarks: () => void;
  onOpenHistory: () => void;
  onShare: () => void;
}

export const BrowserDrawer: React.FC<Props> = (p) => {
  if (!p.isOpen) return null;
  const act = (fn: () => void) => () => { p.onClose(); fn(); };
  const items = [
    { icon: Download, label: p.isInstalled ? 'المتصفح مثبت' : 'تثبيت المتصفح', onClick: act(p.onInstallPWA) },
    { icon: Languages, label: 'ترجمة ودبلجة', onClick: act(p.onOpenVideoDubber) },
    { icon: Camera, label: 'البحث بالصور', onClick: act(p.onOpenVisualSearch) },
    { icon: Mic, label: 'استوديو الصوت', onClick: act(p.onOpenDubbingPlatform) },
    { icon: Smartphone, label: 'تطبيقات الويب', onClick: act(p.onOpenAppInstaller) },
    { icon: Image, label: 'الخلفيات', onClick: act(p.onOpenWallpapers) },
    { icon: Bookmark, label: 'الإشارات المرجعية', onClick: act(p.onOpenBookmarks) },
    { icon: History, label: 'السجل', onClick: act(p.onOpenHistory) },
    { icon: Share2, label: 'مشاركة', onClick: act(p.onShare) },
  ];
  const Toggle = ({ on, onClick, icon: Icon, label }: { on: boolean; onClick: () => void; icon: typeof Monitor; label: string }) => (
    <button onClick={onClick} className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-white/5">
      <span className="flex items-center gap-3"><Icon className="w-5 h-5 text-slate-400" />{label}</span>
      <span className={`w-10 h-6 rounded-full p-0.5 transition ${on ? 'bg-purple-600' : 'bg-slate-700'}`}>
        <span className={`block w-5 h-5 rounded-full bg-white transition ${on ? '-translate-x-4' : ''}`} />
      </span>
    </button>
  );
  return (
    <div className="absolute inset-0 z-50 bg-black/60 flex items-end" onClick={p.onClose}>
      <div className="w-full bg-[#11162a] rounded-t-3xl border-t border-indigo-900 p-4 text-sm text-slate-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold">القائمة</span>
          <button onClick={p.onClose} className="p-1 text-slate-400" aria-label="إغلاق"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {items.map((it) => (
            <button key={it.label} onClick={it.onClick} className="flex flex-col items-center gap-1.5 rounded-xl py-3 hover:bg-white/5">
              <it.icon className="w-5 h-5 text-purple-300" />
              <span className="text-[11px]">{it.label}</span>
            </button>
          ))}
        </div>
        <div className="border-t border-indigo-950 pt-2">
          <Toggle on={p.isDesktopMode} onClick={p.onToggleDesktopMode} icon={Monitor} label="وضع سطح المكتب" />
          <Toggle on={p.adBlockEnabled} onClick={p.onToggleAdBlock} icon={ShieldCheck} label="مانع الإعلانات" />
        </div>
      </div>
    </div>
  );
};
