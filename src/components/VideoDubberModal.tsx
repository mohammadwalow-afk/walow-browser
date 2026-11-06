import React, { useEffect, useState } from 'react';
import { Languages, Play, Square } from 'lucide-react';
import { Modal, askAI, inputCls, btnCls, ghostBtnCls } from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialVideoUrl?: string;
  initialVideoTitle?: string;
}

export const LANGS = [
  { code: 'ar-SA', name: 'العربية' },
  { code: 'en-US', name: 'English' },
  { code: 'fr-FR', name: 'Français' },
  { code: 'es-ES', name: 'Español' },
  { code: 'tr-TR', name: 'Türkçe' },
  { code: 'de-DE', name: 'Deutsch' },
];

export const speak = (text: string, lang: string, voiceURI?: string, rate = 1) => {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  const v = speechSynthesis.getVoices().find((x) => (voiceURI ? x.voiceURI === voiceURI : x.lang.startsWith(lang.slice(0, 2))));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
};

export const VideoDubberModal: React.FC<Props> = ({ isOpen, onClose, initialVideoUrl, initialVideoTitle }) => {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [lang, setLang] = useState('ar-SA');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUrl(initialVideoUrl || '');
      setSource(initialVideoTitle || '');
    } else speechSynthesis.cancel();
  }, [isOpen, initialVideoUrl, initialVideoTitle]);

  const translate = async () => {
    setLoading(true);
    setError('');
    try {
      const target = LANGS.find((l) => l.code === lang)!.name;
      const t = await askAI([{ role: 'user', text: source }], `ترجم نص الفيديو/الترجمة التالي إلى ${target} بأسلوب طبيعي مناسب للدبلجة الصوتية. أعد النص المترجم فقط.`);
      setResult(t);
      speak(t, lang);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ترجمة ودبلجة الفيديو" icon={<Languages className="w-5 h-5 text-cyan-400" />}>
      <div className="space-y-3">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="رابط الفيديو (اختياري)" className={inputCls} dir="ltr" />
        {url && /\.(mp4|webm|ogg)(\?|$)/i.test(url) && <video src={url} controls className="w-full rounded-xl" />}
        <textarea value={source} onChange={(e) => setSource(e.target.value)} rows={4} placeholder="الصق نص الفيديو أو ملف الترجمة هنا…" className={inputCls} />
        <select value={lang} onChange={(e) => setLang(e.target.value)} className={inputCls}>
          {LANGS.map((l) => <option key={l.code} value={l.code}>الدبلجة إلى: {l.name}</option>)}
        </select>
        <button onClick={translate} disabled={loading || !source.trim()} className={`${btnCls} w-full`}>{loading ? 'جارٍ الترجمة…' : 'ترجم واستمع للدبلجة'}</button>
        {error && <p className="text-rose-400">{error}</p>}
        {result && (
          <div className="rounded-xl bg-slate-900 p-3 space-y-2">
            <p className="whitespace-pre-wrap leading-relaxed text-slate-100">{result}</p>
            <div className="flex gap-2">
              <button onClick={() => speak(result, lang)} className={ghostBtnCls}><Play className="w-4 h-4" /> تشغيل</button>
              <button onClick={() => speechSynthesis.cancel()} className={ghostBtnCls}><Square className="w-4 h-4" /> إيقاف</button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
