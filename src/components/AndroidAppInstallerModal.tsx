import React from 'react';
import { Smartphone, ExternalLink } from 'lucide-react';
import { Modal, btnCls } from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onInstallCurrentSiteAsApp: () => void;
  currentSiteTitle: string;
  currentSiteUrl: string;
}

const WEB_APPS = [
  { name: 'WhatsApp Web', url: 'https://web.whatsapp.com' },
  { name: 'Telegram', url: 'https://web.telegram.org' },
  { name: 'YouTube', url: 'https://m.youtube.com' },
  { name: 'Google Maps', url: 'https://maps.google.com' },
  { name: 'Spotify', url: 'https://open.spotify.com' },
  { name: 'Twitter / X', url: 'https://x.com' },
];

export const AndroidAppInstallerModal: React.FC<Props> = ({ isOpen, onClose, onInstallCurrentSiteAsApp, currentSiteTitle, currentSiteUrl }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="تطبيقات الويب" icon={<Smartphone className="w-5 h-5 text-lime-400" />}>
    <div className="space-y-4">
      <div className="rounded-xl bg-slate-900 p-3">
        <p className="text-xs text-slate-400 mb-1">الصفحة الحالية</p>
        <p className="font-bold text-white truncate">{currentSiteTitle}</p>
        <p className="text-xs text-slate-500 truncate" dir="ltr">{currentSiteUrl}</p>
        <button onClick={() => { onClose(); onInstallCurrentSiteAsApp(); }} className={`${btnCls} w-full mt-3`}>أضف متصفح والو إلى الشاشة الرئيسية</button>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 mb-2">تطبيقات ويب شائعة (تفتح في نافذة جديدة ويمكن تثبيتها من هناك)</p>
        <div className="grid grid-cols-2 gap-2">
          {WEB_APPS.map((a) => (
            <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2.5 hover:bg-slate-800">
              <span className="text-slate-200">{a.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </Modal>
);
