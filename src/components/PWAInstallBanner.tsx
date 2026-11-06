import React from 'react';
import { Download } from 'lucide-react';
import { Modal, btnCls } from './Modal';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  showManualModal: boolean;
  onCloseManualModal: () => void;
}

export const PWAInstallBanner: React.FC<Props> = ({ showManualModal, onCloseManualModal }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);

  return (
    <Modal isOpen={showManualModal} onClose={onCloseManualModal} title="تثبيت متصفح والو" icon={<Download className="w-5 h-5 text-blue-400" />}>
      {isInstalled ? (
        <p className="text-emerald-300">المتصفح مثبت بالفعل على جهازك ✅</p>
      ) : (
        <div className="space-y-4">
          {isInstallable && (
            <button onClick={async () => { if (await install()) onCloseManualModal(); }} className={`${btnCls} w-full`}>
              <Download className="w-4 h-4" /> تثبيت الآن
            </button>
          )}
          <div className="rounded-xl bg-slate-900 p-3 space-y-2 leading-relaxed">
            <p className="font-bold text-white">{isIOS ? 'على آيفون (Safari):' : 'على أندرويد (Chrome):'}</p>
            {isIOS ? (
              <ol className="list-decimal pr-5 space-y-1">
                <li>اضغط زر المشاركة أسفل الشاشة.</li>
                <li>اختر «إضافة إلى الشاشة الرئيسية».</li>
              </ol>
            ) : (
              <ol className="list-decimal pr-5 space-y-1">
                <li>افتح قائمة المتصفح ⋮ أعلى الشاشة.</li>
                <li>اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</li>
                <li>اضغط «تثبيت».</li>
              </ol>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
