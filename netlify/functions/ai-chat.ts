import type { Config } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

const SYSTEM = 'أنت "مساعد والو" داخل متصفح Walow Browser. أجب بالعربية بشكل واضح ومختصر ما لم يطلب المستخدم لغة أخرى.';

export default async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let body: { messages?: { role: 'user' | 'model'; text: string }[]; task?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'طلب غير صالح' }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter((m) => m && typeof m.text === 'string' && m.text.trim()).slice(-20);
  if (messages.length === 0) return Response.json({ error: 'الرسالة فارغة' }, { status: 400 });

  try {
    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: messages.map((m) => ({ role: m.role === 'model' ? 'model' : 'user', parts: [{ text: m.text.slice(0, 8000) }] })),
      config: { systemInstruction: body.task ? `${SYSTEM}\n${String(body.task).slice(0, 1000)}` : SYSTEM },
    });
    return Response.json({ text: response.text ?? '' });
  } catch (err) {
    console.error('ai-chat error', err);
    return Response.json({ error: 'تعذر الاتصال بالذكاء الاصطناعي، حاول مرة أخرى.' }, { status: 502 });
  }
};

export const config: Config = { path: '/api/ai-chat' };
