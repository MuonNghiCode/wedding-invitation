import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import IntroduceSection from "../components/IntroduceSection";
import LoveStorySection from "../components/LoveStorySection";
import WeddingDetailsSection from "../components/WeddingDetailsSection";
import GallerySection from "../components/GallerySection";
import TimelineSection from "../components/TimelineSection";
import Footer from "../components/Footer";
// import { FaHeart, FaRing, FaCalendarAlt, FaLeaf } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const MainLandingPage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Wedding date - Phạm Minh Hương & Uông Kim Thuận
  const weddingDate = new Date("2025-08-09T18:00:00");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page animations
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );

      // Bamboo parallax effect
      gsap.to(".bamboo-layer", {
        y: -100,
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Lantern floating animations
      gsap.to(".floating-lantern", {
        y: -30,
        rotation: 5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []); // Empty dependency - chỉ chạy một lần

  // Audio control effect
  useEffect(() => {
    if (audioRef.current) {
      if (audioEnabled) {
        audioRef.current.play().catch((e) => {
          console.log("Auto-play was prevented:", e);
          // Auto-play was prevented, user will need to interact first
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioEnabled]);

  // Start music when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current && audioEnabled) {
        audioRef.current.play().catch((e) => {
          console.log("Auto-play was prevented:", e);
        });
      }
    }, 1000); // Wait 1 second after page load

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "vi" ? "en" : "vi"));
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  const content = {
    vi: {
      brideName: "Phạm Minh Hương",
      groomName: "Uông Kim Thuận",
      heroTitle: "Minh Hương & Kim Thuận",
      heroSubtitle: "Chúng Em Kết Hôn",
      heroDate: "18:00 | Thứ Bảy | 09.08.2025",
      heroDescription: "Với niềm hạnh phúc vô bờ, chúng em trân trọng kính mời",
      heroLocation: "White Palace Võ Văn Kiệt",
      countdownTitle: "Thời Gian Còn Lại",
      days: "Ngày",
      hours: "Giờ",
      minutes: "Phút",
      seconds: "Giây",
    },
    en: {
      brideName: "Pham Minh Huong",
      groomName: "Uong Kim Thuan",
      heroTitle: "Minh Huong & Kim Thuan",
      heroSubtitle: "We Are Getting Married",
      heroDate: "18:00 | Saturday | 09.08.2025",
      heroDescription: "With boundless happiness, we cordially invite you",
      heroLocation: "White Palace Vo Van Kiet",
      countdownTitle: "Time Remaining",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
  };

  return (
    <div
      ref={mainRef}
      className={`min-h-screen relative overflow-hidden ${
        language === "vi" ? "bg-[#6B5B47]" : "bg-[#EAE4CC]"
      }`}
      style={{
        fontFamily:
          language === "vi"
            ? "Noto Serif SC, Noto Sans SC, serif"
            : "Stay Glory Serif, serif",
      }}
    >
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0">
        {/* Luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8] via-[#EAE4CC] to-[#DDD5B8] opacity-95"></div>

        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-20 left-20 w-40 h-40 border border-[#8B7355] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 border border-[#8B7355] rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 border border-[#8B7355] rounded-full"></div>
          <div className="absolute top-1/3 right-10 w-28 h-28 border border-[#8B7355] rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-[#8B7355] rounded-full"></div>
          <div className="absolute top-2/3 right-1/4 w-36 h-36 border border-[#8B7355] rounded-full"></div>
        </div>

        {/* Elegant corner flourishes */}
        <div className="absolute top-8 left-8 w-16 h-16 opacity-15">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
        <div className="absolute top-8 right-8 w-16 h-16 opacity-15 rotate-90">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
        <div className="absolute bottom-8 left-8 w-16 h-16 opacity-15 -rotate-90">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
        <div className="absolute bottom-8 right-8 w-16 h-16 opacity-15 rotate-180">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
      </div>
      {/* Background Music */}
      <audio ref={audioRef} loop preload="auto" className="hidden">
        <source src="/music/wedding-music.mp3" type="audio/mpeg" />
        <source src="/music/wedding-music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      {/* Elegant Bamboo Background with sepia tone */}
      <div className="absolute inset-0 pointer-events-none opacity-12">
        <div className="bamboo-layer absolute inset-0">
          <img
            src="/decorations/bamboo-parttern-removebg-preview.png"
            alt=""
            className="w-full h-full object-cover scale-110 filter sepia-[0.3] hue-rotate-[30deg] brightness-[1.2] contrast-[0.8]"
          />
        </div>
        <div
          className="bamboo-layer absolute inset-0 opacity-60"
          style={{ transform: "translateY(50px)" }}
        >
          <img
            src="/decorations/bamboo-parttern2-removebg-preview.png"
            alt=""
            className="w-full h-full object-cover scale-105 filter sepia-[0.4] hue-rotate-[45deg] brightness-[1.1] contrast-[0.7]"
          />
        </div>
      </div>
      {/* Luxury Floating Ornaments with Chinese Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={`floating-ornament-${i}`}
            className="floating-lantern absolute"
            style={{
              top: `${15 + i * 12}%`,
              left: i % 2 === 0 ? `${8 + i * 3}%` : `${82 + i * 2}%`,
              zIndex: 1,
            }}
          >
            <div className="relative opacity-25">
              {/* Elegant ornamental design with Chinese accents */}
              <div className="w-12 h-12 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#DAA520] to-[#B8860B] rounded-full shadow-md border border-[#8B7355] opacity-70">
                  <div className="absolute inset-2 bg-gradient-to-br from-[#F5DEB3] to-[#DDD5B8] rounded-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[#8B7355] text-sm font-serif">
                        {i % 3 === 0 ? "❁" : i % 3 === 1 ? "✿" : "❀"}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Small Chinese characters as accents */}
                <div className="absolute -top-1 -right-1 text-xs font-chinese-decorative text-[#8B7355] opacity-40">
                  {i % 4 === 0
                    ? "福"
                    : i % 4 === 1
                    ? "寿"
                    : i % 4 === 2
                    ? "喜"
                    : "康"}
                </div>
                <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-sm"></div>
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-sm"></div>
                <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-sm"></div>
                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Header Component */}
      <Header
        language={language}
        audioEnabled={audioEnabled}
        onToggleLanguage={toggleLanguage}
        onToggleAudio={toggleAudio}
      />
      {/* Hero Section */}
      <HeroSection
        ref={heroRef}
        language={language}
        content={content[language]}
        weddingDate={weddingDate}
      />
      {/* Introduce Section */}
      <IntroduceSection
        language={language}
        weddingDate={weddingDate}
        content={{
          days: content[language].days,
          hours: content[language].hours,
          minutes: content[language].minutes,
          seconds: content[language].seconds,
        }}
      />
      {/* Timeline Section */}
      <LoveStorySection language={language} />
      <WeddingDetailsSection language={language} />
      <GallerySection lang={language} />
      <TimelineSection lang={language} />
      {/* Elegant Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float ${
                3 + Math.random() * 4
              }s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default MainLandingPage;
