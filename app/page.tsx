"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, Globe, Moon, Sun, Bot, ShieldCheck, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";

const T = {
  AR: {
    badge: "أفضل شركة نظافة عامة في المملكة العربية السعودية",
    title1: "نظافة بيتك الشاملة",
    title2: "بكل احترافية وشغل يبيض الوجه.",
    desc: "نقدم لك خدمات النظافة العامة المتكاملة بأعلى معايير الجودة. سواء كنت تدور على غسيل مكيفات، تنظيف خزانات، غسيل سجاد وموكيت، تنظيف مجالس، أو مكافحة حشرات، عندنا فريق محترف جاهز يخدمك وين ما كنت بالمملكة. احجز موعدك الحين بثواني عبر المساعد الذكي.",
    btn: "تحدث مع المساعد الذكي للحجز",
    trust: "حجز آلي وفوري على مدار 24 ساعة"
  },
  EN: {
    badge: "The Best General Cleaning Company in KSA",
    title1: "Comprehensive Home Cleaning",
    title2: "With Professionalism & Perfection.",
    desc: "We offer integrated general cleaning services with the highest quality standards. Whether you need AC cleaning, tank cleaning, carpet washing, or pest control, our professional team serves you all over the Kingdom. Book your service in seconds via our Smart Assistant.",
    btn: "Chat with AI Assistant to Book",
    trust: "Automated & Instant Booking 24/7"
  }
};

export default function Home() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [lang, setLang] = useState<"AR" | "EN">("AR");
  
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
  }, [lang]);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(".reveal-elem", 
      { y: 30, opacity: 0, filter: "blur(8px)" }, 
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.12, ease: "power3.out" }
    );

    tl.fromTo(".smart-badge",
      { scale: 0.8, opacity: 0, y: -20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.8" 
    );

    gsap.to(".smart-badge", {
      boxShadow: "0px 0px 20px rgba(6, 182, 212, 0.4)",
      borderColor: "rgba(6, 182, 212, 0.6)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".badge-icon", {
      rotateY: 360,
      duration: 3,
      repeat: -1,
      ease: "linear",
      delay: 1
    });

    gsap.to(".cta-glow", {
      scale: 1.15, opacity: 0.7, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-[100svh] w-full flex flex-col relative overflow-hidden bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 transition-colors duration-500 selection:bg-cyan-500/30">
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[70vw] md:h-[70vw] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-transparent blur-[80px] dark:blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <nav className="reveal-elem relative z-10 w-full p-4 md:p-6 lg:p-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 md:p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
            <Sparkles className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight">
            CleanHouse<span className="text-cyan-500">.</span>
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => setLang(lang === "AR" ? "EN" : "AR")}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:bg-slate-300 dark:hover:bg-white/10 transition-all text-xs md:text-sm font-bold backdrop-blur-md"
          >
            <Globe className="w-4 h-4" />
            {lang === "AR" ? "English" : "العربية"}
          </button>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 md:p-2.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:bg-slate-300 dark:hover:bg-white/10 transition-all backdrop-blur-md"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" /> : <Moon className="w-4 h-4 md:w-5 md:h-5 text-blue-700" />}
          </button>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 w-full max-w-5xl mx-auto text-center mt-[-5vh]">
        
        <div className="smart-badge inline-flex items-center justify-center gap-2 py-1.5 px-3 md:py-2 md:px-5 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-cyan-500/30 text-[10px] sm:text-xs md:text-sm font-bold mb-6 md:mb-8 text-blue-800 dark:text-cyan-300 shadow-sm backdrop-blur-md transform-gpu">
          <div className="badge-icon perspective-1000">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-cyan-400" />
          </div>
          <span className="relative z-10 drop-shadow-sm">{T[lang].badge}</span>
        </div>

        <h1 className="reveal-elem text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] mb-6 tracking-tight">
          {T[lang].title1} <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 dark:from-cyan-300 dark:via-blue-400 dark:to-blue-600">
            {T[lang].title2}
          </span>
        </h1>

        <p className="reveal-elem text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 dark:text-slate-300/90 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          {T[lang].desc}
        </p>

        <div className="reveal-elem relative w-full sm:w-auto flex flex-col items-center group">
          <div className="absolute inset-0 bg-blue-500 dark:bg-cyan-500 rounded-full blur-xl opacity-30 dark:opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
          
          <button 
            className="relative w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-4 md:px-12 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-bold shadow-2xl shadow-blue-500/30 dark:shadow-cyan-500/20 transition-all transform hover:scale-105 active:scale-95"
            onClick={() => setIsChatOpen(true)}
          >
            <Bot className="w-6 h-6 md:w-8 md:h-8" />
            {T[lang].btn}
            {lang === "AR" ? <ChevronLeft className="w-5 h-5 opacity-70" /> : <ChevronRight className="w-5 h-5 opacity-70" />}
          </button>
          
          <p className="mt-5 text-xs md:text-sm text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-800/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <Zap className="w-4 h-4 text-amber-600 dark:text-amber-500" />
            {T[lang].trust}
          </p>
        </div>
      </div>

      <ChatWidget lang={lang} isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      {/* Trimax Footer Badge */}
      <div className="relative z-10 w-full flex justify-center pb-6 mt-auto">
        <Link 
          href="/trimax" 
          rel="noopener noreferrer" 
          target="_blank"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-[#0f172a]/80 border border-slate-200 dark:border-slate-800/50 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-md"
        >
          <img src="/trimax-logo.jpeg" alt="Trimax Logo" className="w-5 h-5 object-contain" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            Powered by Trimax Software Intelligence
          </span>
        </Link>
      </div>
    </main>
  );
}