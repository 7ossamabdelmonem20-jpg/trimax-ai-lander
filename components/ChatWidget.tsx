"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, X, Loader2, Bot, Sparkles, ShieldCheck } from "lucide-react";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface ChatWidgetProps {
  lang: "AR" | "EN";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UI_TEXT = {
  AR: {
    title: "مساعد الشركة الذكي",
    status: "متصل الآن - استجابة فورية ",
    placeholder: "اكتب رسالتك هنا...",
    security: "محادثة مشفرة وآمنة بنسبة 100%",
    loading: "الذكاء الاصطناعي يحلل طلبك...",
    error: "عذراً، يبدو أن هناك ضغطاً على الشبكة. يرجى المحاولة مرة أخرى.",
    initMsg: "أهلاً بك في أفضل شركة نظافة بالمملكة ✨ كيف نخدمك اليوم؟ (نظافة شاملة، غسيل مكيفات، تنظيف خزانات، مكافحة حشرات...)"
  },
  EN: {
    title: "Smart AI Assistant",
    status: "Online - Instant Response ",
    placeholder: "Type your message here...",
    security: "100% Secure & Encrypted Chat",
    loading: "AI is analyzing your request...",
    error: "Sorry, network is busy. Please try again.",
    initMsg: "Welcome to the best cleaning company in KSA ✨ How can we serve you today? (General Cleaning, AC Cleaning, Tank Cleaning, Pest Control...)"
  }
};

export default function ChatWidget({ lang, isOpen, setIsOpen }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "init-1", role: "assistant", content: "INIT_MSG_PLACEHOLDER" }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let storedSession = localStorage.getItem("trimax_session_id");
    if (!storedSession) {
      storedSession = crypto.randomUUID();
      localStorage.setItem("trimax_session_id", storedSession);
    }
    setSessionId(storedSession);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [messages, isOpen]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !sessionId) return;

    const userMessage: Message = { 
      id: crypto.randomUUID(), 
      role: "user", 
      content: inputValue.trim() 
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          sessionId: sessionId,
          message: userMessage.content 
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          const data = await response.json();
          throw new Error(data.error || "Too many requests");
        }
        throw new Error("Network response error");
      }
      const data = await response.json();
      
      setMessages((prev) => [...prev, { 
        id: crypto.randomUUID(), 
        role: "assistant", 
        content: data.response 
      }]);
    } catch (error: any) {
      setMessages((prev) => [...prev, { 
        id: crypto.randomUUID(), 
        role: "assistant", 
        content: error.message || UI_TEXT[lang].error 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const displayMessages = messages.map(msg => 
    msg.id === "init-1" ? { ...msg, content: UI_TEXT[lang].initMsg } : msg
  );

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 left-6 rtl:right-6 rtl:left-auto z-40 flex flex-col items-end">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white p-4 rounded-full shadow-2xl shadow-cyan-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
          >
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-slate-900"></span>
            </span>
            <Bot size={28} className="animate-pulse" />
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-50 dark:bg-[#0f172a] w-full max-w-2xl h-[85vh] sm:h-[75vh] min-h-[500px] max-h-[800px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            
            <div className="relative bg-gradient-to-r from-blue-700 to-cyan-600 text-white p-5 flex justify-between items-center shadow-md shrink-0">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="relative">
                  <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
                    <Bot size={26} className="text-cyan-50" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 ltr:-bottom-1 ltr:-left-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-blue-700"></span>
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-lg md:text-xl flex items-center gap-2">
                    {UI_TEXT[lang].title}
                    <ShieldCheck size={16} className="text-cyan-300 hidden sm:block" />
                  </h3>
                  <p className="text-xs md:text-sm text-cyan-100 font-medium opacity-90">{UI_TEXT[lang].status}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="relative z-10 bg-black/10 hover:bg-black/20 text-white p-2 rounded-full transition-colors backdrop-blur-md">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-5 bg-slate-50/50 dark:bg-[#020617]/50 scroll-smooth">
              {displayMessages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[90%] sm:max-w-[80%] px-5 py-3.5 text-sm md:text-base leading-relaxed shadow-sm font-medium ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl rtl:rounded-bl-sm ltr:rounded-br-sm"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-2xl rtl:rounded-br-sm ltr:rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "assistant" && msg.id === "init-1" && <Sparkles size={16} className="inline-block rtl:ml-2 ltr:mr-2 text-amber-500 mb-1" />}
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
               <div className="flex w-full justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rtl:rounded-br-sm ltr:rounded-bl-sm px-5 py-4 shadow-sm flex items-center gap-3">
                    <Loader2 size={18} className="text-cyan-500 animate-spin" />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{UI_TEXT[lang].loading}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={UI_TEXT[lang].placeholder}
                  disabled={isLoading}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 text-sm md:text-base rounded-full px-5 py-3.5 md:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 disabled:opacity-60 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white p-3.5 md:p-4 rounded-full disabled:from-slate-300 disabled:to-slate-400 disabled:dark:from-slate-700 disabled:dark:to-slate-700 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <Send size={20} className={lang === "AR" ? "rtl:-scale-x-100" : ""} />
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="text-[10px] md:text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                  <ShieldCheck size={12} /> {UI_TEXT[lang].security}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}