import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { MdLanguage } from "react-icons/md";

interface HeaderProps {
  language: "vi" | "en";
  audioEnabled: boolean;
  onToggleLanguage: () => void;
  onToggleAudio: () => void;
}

const Header = ({
  language,
  audioEnabled,
  onToggleLanguage,
  onToggleAudio,
}: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Liquid glass effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newIsScrolled = scrollTop > 50;

      if (newIsScrolled !== isScrolled) {
        setIsScrolled(newIsScrolled);

        if (headerRef.current) {
          gsap.to(headerRef.current, {
            backdropFilter: newIsScrolled ? "blur(20px)" : "blur(0px)",
            background: newIsScrolled
              ? "linear-gradient(135deg, rgba(234,228,204,0.15) 0%, rgba(212,175,55,0.1) 50%, rgba(139,115,85,0.15) 100%)"
              : "transparent",
            borderColor: newIsScrolled ? "rgba(212,175,55,0.3)" : "transparent",
            duration: 0.6,
            ease: "power2.out",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${
        isScrolled
          ? "liquid-glass liquid-animated border-[#D4AF37]/30 shadow-xl lg:rounded-b-full"
          : "backdrop-blur-none border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section with Chinese Accent - Clickable */}
          <div
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer header-logo"
            onClick={scrollToTop}
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-lg border-2 border-[#D4AF37]/50 logo-border transition-all duration-300">
                <img
                  src="/icons/logo.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if logo.png fails to load
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = "flex";
                    }
                  }}
                />
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full hidden items-center justify-center shadow-lg border-2 border-[#8B7355]">
                  <span className="text-[#8B7355] text-lg sm:text-xl font-['Playfair_Display',serif]">
                    ♥
                  </span>
                </div>
              </div>
              {/* Small Chinese character accent */}
              <div className="absolute -top-1 -right-1 text-xs font-chinese-decorative text-[#8B7355] opacity-70">
                囍
              </div>
            </div>
            <div className="text-[#8B7355] header-text-responsive">
              <h1 className="text-sm sm:text-lg md:text-xl font-['Noto_Serif_SC',serif] font-semibold tracking-wide sm:tracking-wider header-text-nowrap">
                <span className="text-[#D4AF37]">Minh Hương</span>
                <span className="mx-1 sm:mx-2 text-[#8B7355] font-chinese-decorative">
                  ♥
                </span>
                <span className="text-[#D4AF37]">Kim Thuận</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#8B7355] opacity-70 font-['Noto_Serif_SC',serif] font-light header-text-nowrap header-subtext-mobile">
                <span className="text-[#D4AF37]">范明香</span>
                <span className="mx-0.5 sm:mx-1 text-[#8B7355]">♥</span>
                <span className="text-[#D4AF37]">汪金順</span>
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center space-x-1 sm:space-x-2 bg-[#8B7355]/30 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105"
            >
              <MdLanguage className="text-[#D4AF37]" size={18} />
              <span className="text-[#EAE4CC] font-['Cormorant_Garamond',serif] text-xs sm:text-sm font-medium">
                {language === "vi" ? "EN" : "VI"}
              </span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={onToggleAudio}
              className="flex items-center space-x-1 sm:space-x-2 bg-[#8B7355]/30 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105"
            >
              {audioEnabled ? (
                <HiSpeakerWave className="text-[#D4AF37]" size={18} />
              ) : (
                <HiSpeakerXMark className="text-red-400" size={18} />
              )}
              <span className="text-[#EAE4CC] font-['Cormorant_Garamond',serif] text-xs sm:text-sm font-medium">
                {audioEnabled ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
