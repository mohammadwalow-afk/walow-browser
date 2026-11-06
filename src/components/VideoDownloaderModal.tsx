import React, { useEffect, useState } from 'react';
import { Download, Info } from 'lucide-react';
import { Modal, inputCls, btnCls } from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialVideoUrl?: string;
  initialTitle?: string;
}

const isDirect = (u: string) => /^https?:\/\/.+\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(u);

export const VideoDownloaderModal: React.FC<Props> = ({ isOpen, onClose, initialVideoUrl, initialTitle }) => {
  const [url, setUrl] = useState('');
  useEffect(() => { if (isOpen) setUrl(initialVideoUrl || ''); }, [isOpen, initialVideoUrl]);
  const direct = isDirect(url);
  const name = (initialTitle || url.split('/').pop()?.split('?')[0] || 'video').slice(0, 80);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تنزيل الفيديو" icon={<Download className="w-5 h-5 text-sky-400" />}>
      <div className="space-y-3">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="رابط ملف الفيديو المباشر (.mp4)" className={inputCls} dir="ltr" />
        {direct && <video src={url} controls className="w-full rounded-xl" />}
        <a href={direct ? url : undefined} download={name} target="_blank" rel="noopener noreferrer" aria-disabled={!direct} className={`${btnCls} w-full ${direct ? '' : 'pointer-events-none opacity-50'}`}>
          <Download className="w-4 h-4" /> تنزيل
        </a>
        <p className="flex gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 shrink-0" />
          يدعم التنزيل الروابط المباشرة لملفات الفيديو فقط. منصات مثل يوتيوب لا تسمح بالتنزيل المباشر — احترم حقوق النشر وشروط المنصات.
        </p>
      </div>
    </Modal>
  );
};
