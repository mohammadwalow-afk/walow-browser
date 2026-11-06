import React, { useEffect, useState } from 'react';
import { Camera, Upload, ExternalLink } from 'lucide-react';
import { Modal, inputCls, btnCls, ghostBtnCls } from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSearchInBrowser: (q: string) => void;
  initialImageUrl?: string;
}

export const VisualSearchModal: React.FC<Props> = ({ isOpen, onClose, onSearchInBrowser, initialImageUrl }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (isOpen) { setImgUrl(initialImageUrl || ''); setPreview(initialImageUrl || null); }
  }, [isOpen, initialImageUrl]);

  const isRemote = /^https?:\/\//.test(imgUrl);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="البحث بالصور" icon={<Camera className="w-5 h-5 text-emerald-400" />}>
      <div className="space-y-3">
        <input value={imgUrl} onChange={(e) => { setImgUrl(e.target.value); setPreview(e.target.value || null); }} placeholder="رابط الصورة https://…" className={inputCls} dir="ltr" />
        <label className={`${ghostBtnCls} w-full cursor-pointer`}>
          <Upload className="w-4 h-4" /> التقط أو اختر صورة
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) { setPreview(URL.createObjectURL(f)); setImgUrl(''); }
          }} />
        </label>
        {preview && <img src={preview} alt="" className="w-full max-h-56 object-contain rounded-xl bg-slate-900" />}
        {isRemote ? (
          <a href={`https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imgUrl)}`} target="_blank" rel="noopener noreferrer" className={`${btnCls} w-full`}>
            <ExternalLink className="w-4 h-4" /> ابحث بالصورة عبر Google Lens
          </a>
        ) : preview ? (
          <a href="https://lens.google.com/" target="_blank" rel="noopener noreferrer" className={`${btnCls} w-full`}>
            <ExternalLink className="w-4 h-4" /> افتح Google Lens وارفع الصورة
          </a>
        ) : null}
        <form onSubmit={(e) => { e.preventDefault(); const q = new FormData(e.currentTarget).get('q') as string; if (q?.trim()) { onSearchInBrowser(q); onClose(); } }} className="flex gap-2 pt-2 border-t border-indigo-950">
          <input name="q" placeholder="أو صف ما تبحث عنه بالكلمات" className={inputCls} />
          <button className={ghostBtnCls}>بحث</button>
        </form>
      </div>
    </Modal>
  );
};
