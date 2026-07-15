// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

interface ChatRequest {
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "الرسالة لا يمكن أن تكون فارغة" },
        { status: 400 }
      );
    }

    // ==========================================
    // MOCK RESPONSE (Phase 1)
    // ==========================================
    // محاكاة تأخير الشبكة لتبدو كاستجابة حقيقية
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const mockResponse = `لقد استلمنا رسالتك: "${message}". فريق Trimax سيقوم بمعالجتها فوراً. هل هناك تفاصيل أخرى تود إضافتها؟`;

    return NextResponse.json({ response: mockResponse });

    // ==========================================
    // PRODUCTION LOGIC (n8n Webhook - Phase 2)
    // ==========================================
    /*
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL as string;
    
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // أضف أي Authentication Headers إذا كانت مطلوبة في n8n
        // "Authorization": `Bearer ${process.env.N8N_SECRET}`
      },
      body: JSON.stringify({
        sessionId: request.headers.get('x-session-id') || "anonymous",
        message: message,
        timestamp: new Date().toISOString()
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n API responded with status ${n8nResponse.status}`);
    }

    const data = await n8nResponse.json();
    return NextResponse.json({ response: data.output || "عذراً، لم نتمكن من معالجة طلبك." });
    */

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي في الخادم أثناء معالجة الرسالة." },
      { status: 500 }
    );
  }
}