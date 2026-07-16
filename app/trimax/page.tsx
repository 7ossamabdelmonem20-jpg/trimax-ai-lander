"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, BrainCircuit, Rocket, ArrowRight, Activity, Terminal, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function TrimaxLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Cinematic Entrance
    tl.fromTo(".trimax-reveal", 
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.15, ease: "power4.out" }
    );

    // Glowing orb animation
    gsap.to(".glow-orb", {
      scale: 1.2,
      opacity: 0.8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Grid scroll effect
    gsap.to(".grid-bg", {
      backgroundPosition: "0px 50px",
      duration: 2,
      repeat: -1,
      ease: "linear"
    });

    // Magnetic Button Hover Effect
    if (magneticBtnRef.current) {
      const btn = magneticBtnRef.current;
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)"
        });
      });
    }
  }, { scope: containerRef });

  const whatsappMessage = "أهلاً Trimax، لدي فكرة مشروع تقني وأريد مناقشة تنفيذه.";
  const whatsappUrl = `https://wa.me/201063505368?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main ref={containerRef} className="min-h-[100svh] w-full flex flex-col relative overflow-hidden bg-slate-950 text-white font-sans selection:bg-cyan-500/30" dir="rtl">
      
      {/* Animated Grid & Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="glow-orb absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-cyan-600/10 blur-[100px] rounded-full" />
        <div className="glow-orb absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-blue-600/10 blur-[100px] rounded-full" />
        <div className="grid-bg absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      </div>

      {/* Header */}
      <header className="trimax-reveal relative z-10 w-full p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/trimax-logo.jpeg" alt="Trimax Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400">
          <Activity className="w-3.5 h-3.5" />
          SYSTEMS ONLINE
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 w-full max-w-5xl mx-auto text-center py-20">
        
        <div className="trimax-reveal inline-flex items-center justify-center gap-2 py-2 px-5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs md:text-sm font-bold mb-8 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Trimax Software Intelligence | Inevitable Growth
        </div>

        <h1 className="trimax-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] mb-8 tracking-tight">
          نحن لا نكتب أكواداً.. <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            نحن نبني إمبراطوريات رقمية.
          </span>
        </h1>

        <p className="trimax-reveal text-lg sm:text-xl text-slate-300/90 mb-6 max-w-3xl mx-auto leading-relaxed font-semibold">
          وكالة برمجيات هجينة متخصصة في بناء أنظمة الذكاء الاصطناعي (AI Agents)، أتمتة العمليات المعقدة، وحلول الـ Custom SaaS التي تبتلع منافسيك.
        </p>

        <p className="trimax-reveal text-sm sm:text-base text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed border-l-2 border-cyan-500/50 pl-0 pr-4 rtl:border-l-0 rtl:border-r-2 rtl:pr-4">
          سواء كنت تبحث عن "مغلق مبيعات آلي" يعمل 24/7، أو بنية تحتية تقنية (Enterprise-Grade) تخفض تكاليفك التشغيلية بنسبة 80%، نحن هنا لنحول فكرتك إلى واقع برمجي يدر عوائد مستمرة (ROI).
        </p>

        <div className="trimax-reveal relative flex flex-col items-center">
          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse" />
          
          <Link 
            ref={magneticBtnRef}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 bg-white text-slate-950 hover:bg-cyan-50 px-8 py-5 rounded-full text-lg md:text-xl font-bold shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-colors"
          >
            <BrainCircuit className="w-6 h-6 text-cyan-600" />
            لديك فكرة مشروع خارقة؟ لنتحدث فوراً
            <ArrowRight className="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
          </Link>
          
          <div className="mt-6 flex items-center gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5"><Rocket className="w-3.5 h-3.5" /> High Performance</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Secure Infrastructure</span>
          </div>
        </div>

      </div>
    </main>
  );
}
