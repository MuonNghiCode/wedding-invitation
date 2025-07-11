import {
  FaHeart,
  FaGithub,
  FaCode,
  FaCopyright,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  language: "vi" | "en";
}

const Footer = ({ language }: FooterProps) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const developerCardRef = useRef<HTMLDivElement>(null);
  const [logoError, setLogoError] = useState(false);

  // Giảm số lượng particle và shape trên mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const particleCount = isMobile ? 3 : 8;
  const shapeCount = isMobile ? 2 : 6;
  // Sử dụng useMemo để random vị trí particle 1 lần duy nhất khi mount
  const particlePositions = useMemo(
    () =>
      Array.from({ length: particleCount }, () => ({
        top: 10 + Math.random() * 70,
        left: 5 + Math.random() * 90,
      })),
    [particleCount]
  );
  const shapePositions = useMemo(
    () =>
      Array.from({ length: shapeCount }, () => ({
        top: 10 + Math.random() * 70,
        left: 5 + Math.random() * 90,
      })),
    [shapeCount]
  );

  useEffect(() => {
    // Advanced heart animation with breathing effect
    gsap.to(heartRef.current, {
      scale: 1.3,
      opacity: 0.8,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Waves animation
    gsap.to(wavesRef.current, {
      x: -200,
      duration: 8,
      ease: "none",
      repeat: -1,
    });

    // Staggered particle animations
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -30 + Math.random() * 60,
          x: -20 + Math.random() * 40,
          rotation: 360,
          duration: 3 + Math.random() * 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3,
        });
      }
    });

    // Footer entrance animation
    gsap.fromTo(
      footerRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Developer card hover animation setup
    const handleMouseEnter = () => {
      gsap.to(developerCardRef.current, {
        y: -10,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(developerCardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: "0 10px 20px rgba(139, 115, 85, 0.2)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const cardElement = developerCardRef.current;
    if (cardElement) {
      cardElement.addEventListener("mouseenter", handleMouseEnter);
      cardElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        cardElement.removeEventListener("mouseenter", handleMouseEnter);
        cardElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // Tắt animation nếu prefers-reduced-motion
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
  }, []);

  const content = {
    vi: {
      madeWith: "Được thiết kế với",
      by: "bởi",
      developer: "Phạm Minh Quân",
      role: "Full-Stack Developer",
      wedding: "Trang Cưới Trực Tuyến",
      couple: "Minh Hương & Kim Thuận",
      year: "2025",
      rights: "Tất cả quyền được bảo lưu",
      github: "Xem mã nguồn",
      contact: "Liên hệ",
      location: "Việt Nam",
      celebrate: "Hãy cùng chúng em chia sẻ niềm hạnh phúc này!",
    },
    en: {
      madeWith: "Crafted with",
      by: "by",
      developer: "Pham Minh Quan",
      role: "Full-Stack Developer",
      wedding: "Online Wedding Invitation",
      couple: "Minh Huong & Kim Thuan",
      year: "2025",
      rights: "All rights reserved",
      github: "View Source Code",
      contact: "Contact",
      location: "Vietnam",
      celebrate: "Join us in celebrating our special day!",
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-[#8B7355] via-[#A0845C] to-[#6B5B47] overflow-hidden"
    >
      {/* Animated waves background */}
      <div className="absolute inset-0 opacity-20">
        <div
          ref={wavesRef}
          className="absolute bottom-0 left-0 w-[200%] h-32"
          style={{
            background: `url("data:image/svg+xml,%3csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m0 20c20-10 40 0 60-10s40 0 60-10v20z' fill='%23D4AF37' fill-opacity='0.3'/%3e%3c/svg%3e")`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "200px 40px",
          }}
        />
      </div>

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#6B5B47]/30 via-transparent to-transparent"></div>

      {/* Chinese Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='%23D4AF37' fill-opacity='0.4'%3e%3cpath d='M30 0c16.569 0 30 13.431 30 30S46.569 60 30 60 0 46.569 0 30 13.431 0 30 0zM15 30c0 8.284 6.716 15 15 15s15-6.716 15-15-6.716-15-15-15-15 6.716-15 15z'/%3e%3c/g%3e%3c/svg%3e")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles with Chinese characters */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particlePositions.map((pos, i) => (
          <div
            key={`particle-${i}`}
            ref={(el) => {
              if (el) particlesRef.current[i] = el;
            }}
            className="absolute text-[#D4AF37] opacity-20 font-chinese-decorative text-sm pointer-events-none"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
          >
            {["福", "寿", "囍", "龍", "鳳", "喜", "爱", "缘"][i]}
          </div>
        ))}
        {shapePositions.map((pos, i) => (
          <div
            key={`shape-${i}`}
            ref={(el) => {
              if (el) particlesRef.current[i + 8] = el;
            }}
            className={`absolute ${
              i % 3 === 0
                ? "w-4 h-4 bg-[#D4AF37]/20 rounded-full"
                : i % 3 === 1
                ? "w-3 h-3 bg-[#B8860B]/30 rotate-45"
                : "w-2 h-6 bg-[#EAE4CC]/25 rounded-full"
            }`}
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Wedding Info Section */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  {!logoError ? (
                    <img
                      src="/icons/logo.png"
                      alt="Wedding Logo"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/60 shadow-md bg-white"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center shadow-lg border-2 border-[#EAE4CC]/30">
                      <FaHeart className="text-[#8B7355] text-lg" />
                    </div>
                  )}
                  {/* Chinese character accent */}
                  <div className="absolute -top-1 -right-1 text-xs font-chinese-decorative text-[#D4AF37] opacity-80">
                    囍
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-['Playfair_Display',serif] text-[#EAE4CC] tracking-wider font-semibold">
                    {content[language].couple}
                  </h3>
                  <p className="text-[#EAE4CC]/70 text-sm font-['Montserrat',sans-serif]">
                    {content[language].wedding} • 婚礼
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-[#EAE4CC]/60">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <FaCalendarAlt size={14} className="text-[#D4AF37]" />
                  <span className="text-sm font-['Montserrat',sans-serif]">
                    09.08.2025
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <FaMapMarkerAlt size={14} className="text-[#D4AF37]" />
                  <span className="text-sm font-['Montserrat',sans-serif]">
                    White Palace Võ Văn Kiệt
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <p className="text-[#EAE4CC]/80 italic font-['Montserrat',sans-serif] text-sm leading-relaxed">
                "{content[language].celebrate}"
              </p>
              {/* Chinese blessing */}
              <div className="mt-3 text-center lg:text-left">
                <span className="text-[#D4AF37] font-chinese-decorative text-lg opacity-70">
                  百年好合 • 永结同心
                </span>
              </div>
            </div>
          </div>

          {/* Developer Card - Center */}
          <div className="flex justify-center">
            <div
              ref={developerCardRef}
              className="bg-gradient-to-br from-[#EAE4CC]/20 via-[#D4AF37]/10 to-[#8B7355]/20 backdrop-blur-lg rounded-2xl p-8 border border-[#D4AF37]/30 max-w-sm w-full shadow-2xl transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(234, 228, 204, 0.15) 0%, 
                  rgba(212, 175, 55, 0.1) 50%, 
                  rgba(139, 115, 85, 0.2) 100%)`,
              }}
            >
              <div className="text-center space-y-4">
                {/* Code icon with pulse effect */}
                <div className="relative mx-auto w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-2xl flex items-center justify-center shadow-lg border border-[#EAE4CC]/30">
                  <FaCode className="text-[#8B7355] text-xl" />
                  <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl animate-ping opacity-25"></div>
                  {/* Chinese character accent */}
                  <div className="absolute -top-2 -right-2 text-xs font-chinese-decorative text-[#D4AF37] opacity-70">
                    创
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-[#EAE4CC]/90">
                    <span className="font-['Montserrat',sans-serif] text-sm">
                      {content[language].madeWith}
                    </span>
                    <div ref={heartRef}>
                      <FaHeart className="text-[#D4AF37] text-sm" />
                    </div>
                    <span className="font-['Montserrat',sans-serif] text-sm">
                      {content[language].by}
                    </span>
                  </div>

                  <h4 className="text-xl font-['Montserrat',sans-serif] text-[#D4AF37] tracking-wider font-semibold">
                    {content[language].developer}
                  </h4>

                  <p className="text-[#EAE4CC]/70 text-sm font-['Montserrat',sans-serif]">
                    {content[language].role}
                  </p>

                  {/* Chinese subtitle */}
                  <p className="text-[#D4AF37] text-xs font-chinese-decorative opacity-70">
                    设计师 • 开发者
                  </p>
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                  <a
                    href="https://github.com/MuonNghiCode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link group flex items-center justify-center space-x-3 bg-[#EAE4CC]/10 hover:bg-[#D4AF37]/20 rounded-lg py-3 px-4 transition-all duration-300 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                  >
                    <FaGithub
                      className="text-[#EAE4CC] group-hover:text-[#D4AF37] transition-colors"
                      size={18}
                    />
                    <span className="font-['Montserrat',sans-serif] text-sm text-[#EAE4CC] group-hover:text-[#D4AF37] transition-colors">
                      github.com/MuonNghiCode
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack & Info */}
          <div className="text-center lg:text-right space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-end space-x-2">
                <h4 className="text-lg font-['Montserrat',sans-serif] text-[#D4AF37] tracking-wider font-semibold">
                  Tech Stack
                </h4>
                <span className="text-[#D4AF37] font-chinese-decorative text-sm opacity-70">
                  技术
                </span>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-end gap-2">
                {["React", "TypeScript", "GSAP", "Tailwind CSS", "Vite"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#EAE4CC]/10 backdrop-blur-sm rounded-full text-xs text-[#EAE4CC]/80 border border-[#D4AF37]/30 font-['Montserrat',sans-serif] hover:bg-[#D4AF37]/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-end space-x-2">
                <h4 className="text-lg font-['Montserrat',sans-serif] text-[#D4AF37] tracking-wider font-semibold">
                  Features
                </h4>
                <span className="text-[#D4AF37] font-chinese-decorative text-sm opacity-70">
                  特色
                </span>
              </div>
              <div className="space-y-2 text-[#EAE4CC]/70 text-sm font-['Montserrat',sans-serif]">
                <p className="flex items-center justify-center lg:justify-end space-x-2">
                  <span>✨ GSAP Animations</span>
                  <span className="text-[#D4AF37] font-chinese-decorative text-xs opacity-60">
                    动画
                  </span>
                </p>
                <p className="flex items-center justify-center lg:justify-end space-x-2">
                  <span>🎵 Background Music</span>
                  <span className="text-[#D4AF37] font-chinese-decorative text-xs opacity-60">
                    音乐
                  </span>
                </p>
                <p className="flex items-center justify-center lg:justify-end space-x-2">
                  <span>🌐 Multi-language</span>
                  <span className="text-[#D4AF37] font-chinese-decorative text-xs opacity-60">
                    双语
                  </span>
                </p>
                <p className="flex items-center justify-center lg:justify-end space-x-2">
                  <span>📱 Responsive Design</span>
                  <span className="text-[#D4AF37] font-chinese-decorative text-xs opacity-60">
                    响应
                  </span>
                </p>
              </div>
            </div>

            {/* Chinese Blessing Seal */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/20 rounded-full flex items-center justify-center border-2 border-[#D4AF37]/30">
                <span className="text-[#D4AF37] font-chinese-decorative text-xl">
                  福
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#D4AF37]/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-[#EAE4CC]/50 text-sm">
              <FaCopyright size={14} />
              <span className="font-['Montserrat',sans-serif]">
                {content[language].year} {content[language].couple} •{" "}
                {content[language].rights}
              </span>
            </div>

            {/* Decorative elements */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
                <span className="text-[#D4AF37]/70 text-xs font-chinese-decorative">
                  永结同心
                </span>
              </div>

              {/* Chinese Double Happiness Symbol */}
              <div className="flex items-center space-x-2">
                <span className="text-[#D4AF37] font-chinese-decorative text-lg opacity-80">
                  囍
                </span>
                <span className="text-[#EAE4CC]/40 text-xs font-['Cormorant_Garamond',serif]">
                  Double Happiness
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line with Chinese pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

      {/* Corner flourishes */}
      <div className="absolute bottom-4 left-4 text-[#D4AF37] opacity-30 font-chinese-decorative text-sm">
        龍
      </div>
      <div className="absolute bottom-4 right-4 text-[#D4AF37] opacity-30 font-chinese-decorative text-sm">
        鳳
      </div>
    </footer>
  );
};

export default Footer;
