import React, { useEffect, useState } from 'react';
import { Mic, Play, Square } from 'lucide-react';
import { Modal, inputCls, btnCls, ghostBtnCls } from './Modal';
import { speak } from './VideoDubberModal';

export const DubbingPlatformModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [text, setText] = useState('مرحباً بك في متصفح والو الذكي!');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState('');
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const load = () => setVoices(speechSynthesis.getVoices());
    load();
    speechSynthesis.addEventListener('voiceschanged', load);
    return () => speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);
  useEffect(() => { if (!isOpen) speechSynthesis.cancel(); }, [isOpen]);

  const selected = voices.find((v) => v.voiceURI === voice);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="استوديو الصوت" icon={<Mic className="w-5 h-5 text-orange-400" />}>
      <div className="space-y-3">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className={inputCls} />
        <select value={voice} onChange={(e) => setVoice(e.target.value)} className={inputCls}>
          <option value="">الصوت التلقائي (العربية)</option>
          {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} — {v.lang}</option>)}
        </select>
        <label className="block">السرعة: {rate.toFixed(1)}×
          <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full accent-purple-500" />
        </label>
        <div className="flex gap-2">
          <button onClick={() => speak(text, selected?.lang || 'ar-SA', voice || undefined, rate)} disabled={!text.trim()} className={`${btnCls} flex-1`}><Play className="w-4 h-4" /> تشغيل</button>
          <button onClick={() => speechSynthesis.cancel()} className={ghostBtnCls}><Square className="w-4 h-4" /></button>
        </div>
        <p className="text-xs text-slate-500">الأصوات المتاحة تعتمد على جهازك ونظام التشغيل.</p>
      </div>
    </Modal>
  );
};
