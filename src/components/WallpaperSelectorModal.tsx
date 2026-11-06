import React from 'react';
import { Image, Check } from 'lucide-react';
import { Modal } from './Modal';
import { WALOW_WALLPAPERS, Wallpaper } from '../data/wallpapers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedWallpaperId: string;
  onSelectWallpaper: (wp: Wallpaper) => void;
}

export const WallpaperSelectorModal: React.FC<Props> = ({ isOpen, onClose, selectedWallpaperId, onSelectWallpaper }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="خلفيات والو" icon={<Image className="w-5 h-5 text-pink-400" />}>
    <div className="grid grid-cols-3 gap-3">
      {WALOW_WALLPAPERS.map((wp) => (
        <button key={wp.id} onClick={() => onSelectWallpaper(wp)} className="flex flex-col items-center gap-1.5">
          <span className={`relative w-full aspect-[9/16] rounded-xl border-2 ${wp.id === selectedWallpaperId ? 'border-purple-500' : 'border-transparent'}`} style={{ background: wp.cssBackground }}>
            {wp.id === selectedWallpaperId && <Check className="absolute top-1.5 left-1.5 w-4 h-4 text-white bg-purple-600 rounded-full p-0.5" />}
          </span>
          <span className="text-[11px] text-slate-300">{wp.name}</span>
        </button>
      ))}
    </div>
    <p className="text-xs text-slate-500 mt-4">نصيحة: اطلب من «مساعد AI» تصميم خلفية خاصة بك.</p>
  </Modal>
);
