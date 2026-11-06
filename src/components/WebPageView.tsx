import React, { useEffect, useState } from 'react';
import { ExternalLink, Sparkles, Languages, Download, Camera } from 'lucide-react';
import { SearchEngine, SEARCH_ENGINES } from '../types/browser';
import { askAI } from './Modal';

interface Props {
  url: string;
  isDesktopMode: boolean;
  selectedEngine: SearchEngine;
  onNavigate: (input: string) => void;
  onOpenVideoDubberWithUrl: (url?: string, title?: string) => void;
  onOpenVisualSearchWithUrl: (img?: string) => void;
  onOpenVideoDownloader: (url?: string, title?: string) => void;
}

export const WebPageView: React.FC<Props> = (p) => {
  const isSearch = p.url.startsWith('search://');
  const query = isSearch ? decodeURIComponent(p.url.replace('search://', '')) : '';
  const frameUrl = isSearch ? SEARCH_ENGINES[p.selectedEngine].buildUrl(query) : p.url;
  const externalUrl = isSearch ? frameUrl.replace('igu=1&', '') : p.url;

  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    setAiAnswer(null);
    if (!isSearch || p.selectedEngine !== 'walow-ai' || !query) return;
    let cancelled = false;
    setAiLoading(true);
    askAI([{ role: 'user', text: query }], 'قدّم إجابة مختصرة جداً (3-5 أسطر) على استعلام البحث التالي.')
      .then((t) => !cancelled && setAiAnswer(t))
      .catch(() => !cancelled && setAiAnswer(null))
      .finally(() => !cancelled && setAiLoading(false));
    return () => {
      cancelled = true;
    };
  }, [p.url, p.selectedEngine]);

  const chip = 'flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 shrink-0';
  return (
    <div className="h-full w-full flex flex-col bg-white">
      {(aiLoading || aiAnswer) && (
        <div className="shrink-0 max-h-[35%] overflow-y-auto bg-[#11162a] text-slate-200 text-sm px-4 py-3 border-b border-indigo-900">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-1"><Sparkles className="w-3.5 h-3.5" /> إجابة Walow AI</div>
          {aiLoading ? <div className="animate-pulse text-slate-400">جارٍ التفكير…</div> : <p className="whitespace-pre-wrap leading-relaxed">{aiAnswer}</p>}
        </div>
      )}
      <div className="shrink-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar px-2 py-1.5 bg-[#0b0f1d] text-[11px]">
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className={chip}><ExternalLink className="w-3.5 h-3.5" /> فتح خارجي</a>
        {!isSearch && (
          <>
            <button className={chip} onClick={() => p.onOpenVideoDubberWithUrl(p.url)}><Languages className="w-3.5 h-3.5" /> دبلجة</button>
            <button className={chip} onClick={() => p.onOpenVideoDownloader(p.url)}><Download className="w-3.5 h-3.5" /> تنزيل</button>
          </>
        )}
        <button className={chip} onClick={() => p.onOpenVisualSearchWithUrl()}><Camera className="w-3.5 h-3.5" /> عدسة</button>
      </div>
      <div className="flex-1 relative overflow-auto">
        <iframe
          key={frameUrl}
          src={frameUrl}
          title="page"
          className="border-0 h-full"
          style={{ width: p.isDesktopMode ? 1280 : '100%' }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
        />
        <p className="absolute bottom-2 inset-x-2 text-center text-[10px] text-slate-500 bg-white/80 rounded pointer-events-none">
          بعض المواقع تمنع العرض داخل المتصفح — استخدم «فتح خارجي» إن ظهرت الصفحة فارغة.
        </p>
      </div>
    </div>
  );
};
