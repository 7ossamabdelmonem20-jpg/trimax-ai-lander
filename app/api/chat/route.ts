import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Lead from "@/models/Lead";
import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  N8N_WEBHOOK_URL: z.string().url("N8N_WEBHOOK_URL must be a valid URL"),
});

const ChatRequestSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID format"),
  message: z.string().min(1, "Message cannot be empty").max(1000, "Message is too long"),
});

export async function POST(req: Request) {
  try {
    // 1. نقلنا فحص متغيرات البيئة هنا لضمان قراءتها وقت التشغيل على سيرفر Vercel
    const envParsed = envSchema.safeParse(process.env);
    
    if (!envParsed.success) {
      console.error("❌ Invalid environment variables:", envParsed.error.format());
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const body = await req.json();
    const validation = ChatRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid payload format", details: validation.error.format() }, { status: 400 });
    }

    const { sessionId, message } = validation.data;

    await dbConnect();

    let lead = await Lead.findOne({ sessionId });
    
    if (lead) {
      const now = new Date();
      const lastInteraction = lead.metadata?.lastInteraction || new Date(0);
      if (now.getTime() - lastInteraction.getTime() < 2000) {
        return NextResponse.json({ error: "الرجاء الانتظار قليلاً قبل إرسال رسالة أخرى." }, { status: 429 });
      }
      lead.metadata.lastInteraction = new Date();
    } else {
      lead = await Lead.create({ 
        sessionId,
        status: 'PENDING_AI',
        chatHistory: [],
        metadata: { lastInteraction: new Date() }
      });
    }

    lead.chatHistory.push({ role: 'user', content: message, timestamp: new Date() });
    await lead.save();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let n8nResponse;
    try {
      n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL as string, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ 
          sessionId: lead.sessionId, 
          message: message,
          status: lead.status 
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error("n8n Fetch Error:", fetchError);
      return NextResponse.json({ response: "عذراً، النظام يقوم بتحديث بياناته الآن. يرجى المحاولة بعد لحظات." }, { status: 503 });
    }

    if (!n8nResponse.ok) {
      throw new Error(`n8n responded with status: ${n8nResponse.status}`);
    }

    const aiResult = await n8nResponse.json();
    const aiMessage = aiResult.response || "تم استلام طلبك بنجاح.";

    // Update Lead if n8n provides extractedData
    if (aiResult.extractedData) {
      const { phone, name, service } = aiResult.extractedData;
      const isValid = (val: any) => val && typeof val === "string" && val.trim() !== "" && val !== "null" && val !== "{{ $json.state.phone }}" && val !== "{{ $json.state.name }}" && val !== "{{ $json.state.service }}";
      
      if (isValid(phone)) lead.phone = phone;
      if (isValid(name)) lead.name = name;
      if (isValid(service)) {
        lead.metadata = lead.metadata || {};
        lead.metadata.service = service;
      }
    }

    lead.chatHistory.push({ role: 'assistant', content: aiMessage, timestamp: new Date() });
    
    await lead.save();

    return NextResponse.json({ response: aiMessage });

  } catch (error: any) {
    // 2. تحسين التقاط الأخطاء لمعرفة السبب الدقيق في Vercel Logs
    console.error("API Chat Error:", error.message || error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}