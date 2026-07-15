import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

// هندسة تحميل الخطوط: تعريف المتغير وتحديد الأوزان المستخدمة فقط لتقليل الحجم
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-cairo", 
});

export const metadata: Metadata = {
  title: "Trimax | خدمات النظافة الذكية",
  description: "احجز خدمة غسيل المكيفات والنظافة العامة في السعودية في ثوانٍ عبر مساعد Trimax الذكي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning ضروري لعمل الـ Dark Mode دون أخطاء
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans bg-slate-50 dark:bg-[#020617] antialiased`}>
        {children}
      </body>
    </html>
  );
}