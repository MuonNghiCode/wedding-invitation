import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHeart, FaRing, FaCalendarAlt } from "react-icons/fa";
import { getAllPhotoPaths } from "./photoList";

gsap.registerPlugin(ScrollTrigger);

interface LoveStorySectionProps {
  language: "vi" | "en";
}

const LoveStorySection = ({ language }: LoveStorySectionProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line from top to bottom
      gsap.fromTo(
        timelineLineRef.current,
        { height: 0 },
        {
          height: "calc(100% + 40px)", // Extend beyond container
          duration: 3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      // Animate extended connecting lines
      gsap.fromTo(
        ".timeline-connector-top",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".timeline-connector-bottom",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate timeline items with stronger effects
      gsap.fromTo(
        ".timeline-item",
        {
          opacity: 0,
          x: (index) => (index % 2 === 0 ? -150 : 150),
          y: 100,
          scale: 0.6,
          rotation: (index) => (index % 2 === 0 ? -15 : 15),
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".timeline-item",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate story particles with floating effect
      gsap.fromTo(
        ".story-particle",
        {
          opacity: 0,
          y: 20,
          scale: 0.3,
        },
        {
          opacity: 0.3,
          y: 0,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".story-particle",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline cards entrance with story elements
      gsap.fromTo(
        ".timeline-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Add parallax effect to story elements
      gsap.to(".story-image", {
        y: -50,
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Animate background story elements
      gsap.fromTo(
        ".story-bg-element",
        {
          opacity: 0,
          scale: 0.5,
          rotation: -30,
        },
        {
          opacity: 0.1,
          scale: 1,
          rotation: 0,
          duration: 2,
          stagger: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Add floating animation to background elements
      gsap.to(".story-bg-element", {
        y: -20,
        rotation: 10,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Animate Chinese characters
      gsap.fromTo(
        ".chinese-char",
        { opacity: 0, scale: 0, rotation: 45 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate Groom & Bride Section
      gsap.fromTo(
        ".groom-animate, .bride-animate",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".groom-animate",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, [language]);

  const timelineData = {
    vi: {
      title: "Hành Trình Tình Yêu",
      subtitle: "Từ Ngày Đầu Tiên Đến Mãi Mãi",
      events: [
        {
          title: "Khởi Đầu",
          description:
            "Khi định mệnh an bài, hai tâm hồn tìm thấy nhau trong vô vàn người trên thế gian này.",
          icon: FaHeart,
          chinese: "缘",
          chineseMeaning: "Duyên phận",
          color: "from-pink-400 to-rose-500",
          scene: {
            characters: [
              { emoji: "👨‍💼", position: "left", animation: "walk-right" },
              { emoji: "👩‍💼", position: "right", animation: "walk-left" },
              { emoji: "☕", position: "center", animation: "steam" },
            ],
            setting: "🏪",
            atmosphere: ["✨", "💫", "🌸"],
          },
        },
        {
          title: "Tình Yêu",
          description:
            "Tình cảm nảy nở, hai trái tim cùng nhịp đập, cùng chia sẻ niềm vui nỗi buồn.",
          icon: FaHeart,
          chinese: "爱",
          chineseMeaning: "Tình yêu",
          color: "from-red-400 to-pink-500",
          scene: {
            characters: [
              { emoji: "�‍❤️‍👩", position: "center", animation: "heart-beat" },
              { emoji: "💕", position: "around", animation: "float-around" },
            ],
            setting: "🌳",
            atmosphere: ["❤️", "💖", "🌹"],
          },
        },
        {
          title: "Cam Kết",
          description:
            "Lời hứa thiêng liêng, quyết định bên nhau trọn đời, không rời không bỏ.",
          icon: FaRing,
          chinese: "诺",
          chineseMeaning: "Lời hứa",
          color: "from-yellow-400 to-amber-500",
          scene: {
            characters: [
              { emoji: "🧎‍♂️", position: "left", animation: "propose" },
              { emoji: "�‍♀️", position: "right", animation: "surprised" },
              { emoji: "💍", position: "center", animation: "shine" },
            ],
            setting: "🌅",
            atmosphere: ["💎", "⭐", "🌟"],
          },
        },
        {
          title: "Kết Hôn",
          description:
            "Ngày trọng đại, chính thức trở thành một gia đình, bắt đầu hành trình mới.",
          icon: FaCalendarAlt,
          chinese: "婚",
          chineseMeaning: "Hôn nhân",
          color: "from-emerald-400 to-teal-500",
          scene: {
            characters: [
              { emoji: "🤵", position: "left", animation: "dance" },
              { emoji: "👰", position: "right", animation: "dance" },
              { emoji: "💒", position: "background", animation: "glow" },
            ],
            setting: "🎊",
            atmosphere: ["🎉", "🎊", "🌺"],
          },
        },
      ],
    },
    en: {
      title: "Love Journey",
      subtitle: "From First Day to Forever",
      events: [
        {
          title: "Beginning",
          description:
            "When destiny arranges, two souls find each other among countless people in this world.",
          icon: FaHeart,
          chinese: "缘",
          chineseMeaning: "Destiny",
          color: "from-pink-400 to-rose-500",
          scene: {
            characters: [
              { emoji: "👨‍💼", position: "left", animation: "walk-right" },
              { emoji: "👩‍💼", position: "right", animation: "walk-left" },
              { emoji: "☕", position: "center", animation: "steam" },
            ],
            setting: "🏪",
            atmosphere: ["✨", "💫", "🌸"],
          },
        },
        {
          title: "Love",
          description:
            "Feelings bloom, two hearts beat in sync, sharing joys and sorrows together.",
          icon: FaHeart,
          chinese: "爱",
          chineseMeaning: "Love",
          color: "from-red-400 to-pink-500",
          scene: {
            characters: [
              { emoji: "�‍❤️‍👩", position: "center", animation: "heart-beat" },
              { emoji: "💕", position: "around", animation: "float-around" },
            ],
            setting: "🌳",
            atmosphere: ["❤️", "💖", "🌹"],
          },
        },
        {
          title: "Commitment",
          description:
            "Sacred promise, decision to be together for life, never to part.",
          icon: FaRing,
          chinese: "诺",
          chineseMeaning: "Promise",
          color: "from-yellow-400 to-amber-500",
          scene: {
            characters: [
              { emoji: "🧎‍♂️", position: "left", animation: "propose" },
              { emoji: "�‍♀️", position: "right", animation: "surprised" },
              { emoji: "💍", position: "center", animation: "shine" },
            ],
            setting: "🌅",
            atmosphere: ["💎", "⭐", "🌟"],
          },
        },
        {
          title: "Marriage",
          description:
            "The big day, officially becoming a family, starting a new journey.",
          icon: FaCalendarAlt,
          chinese: "婚",
          chineseMeaning: "Marriage",
          color: "from-emerald-400 to-teal-500",
        },
      ],
    },
  };

  const content = timelineData[language];

  // Thông tin chú rể/cô dâu cho từng ngôn ngữ
  const groomInfo =
    language === "vi"
      ? {
          title: "Chú Rể",
          name: "Uông Kim Thuận",
          birth: "Sinh năm 1997",
          desc: "kỹ sư vi mạch, điểm đạm, trưởng thành.",
        }
      : {
          title: "Groom",
          name: "Uong Kim Thuan",
          birth: "Born in 1997",
          desc: "Electrical engineering, computer science, and mature.",
        };
  const brideInfo =
    language === "vi"
      ? {
          title: "Cô Dâu",
          name: "Phạm Minh Hương",
          birth: "Sinh năm 2002",
          desc: "Vui tính thích du lịch và đọc sách.",
        }
      : {
          title: "Bride",
          name: "Pham Minh Huong",
          birth: "Born in 2002",
          desc: "Humorous loves traveling and reading.",
        };

  // Lấy danh sách ảnh từ photoList
  const photoList = getAllPhotoPaths();
  // Lấy đúng link ảnh T-58 cho chú rể, T-4 cho cô dâu
  const groomPhoto =
    photoList.find((url) => url.includes("/T-117_")) || photoList[0];
  const bridePhoto =
    photoList.find((url) => url.includes("/T-126_")) || photoList[1];

  // Tối ưu vị trí particle chỉ random 1 lần khi mount
  // Giảm số lượng particle trên mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const particleCount = isMobile ? 2 : 8;
  const particlePositions = useMemo(
    () =>
      Array.from({ length: particleCount }, () => ({
        top: 10 + Math.random() * 80,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 2,
      })),
    [particleCount]
  );

  return (
    <>
      <section
        ref={timelineRef}
        className="relative min-h-screen py-20 bg-gradient-to-bl from-[#e8e2d5] via-[#ede8dc] to-[#f8f6f0] overflow-hidden"
      >
        {/* SEO Heading */}
        <h2 className="sr-only">
          Hành trình tình yêu của Minh Hương &amp; Kim Thuận
        </h2>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 blur-sm">
          <div className="absolute inset-0 bg-[url('/bamboo-parttern-removebg-preview.png')] bg-repeat bg-center opacity-30 blur-md"></div>
        </div>

        {/* Chinese Corner Decorations */}
        <div className="absolute top-8 left-8 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#8B7355]">
            <defs>
              <radialGradient id="gold-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffbe6" />
                <stop offset="100%" stopColor="#D4AF37" />
              </radialGradient>
            </defs>
            <path
              d="M10 10 L90 10 L90 90 L10 90 Z"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="2"
            />
            <path
              d="M20 20 L80 20 L80 80 L20 80 Z"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="absolute top-8 right-8 w-24 h-24 opacity-10 rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#8B7355]">
            <use href="#gold-gradient" />
            <path
              d="M10 10 L90 10 L90 90 L10 90 Z"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="2"
            />
            <path
              d="M20 20 L80 20 L80 80 L20 80 Z"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16 md:mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 mb-4 sm:mb-6">
              <div className="chinese-char text-3xl sm:text-4xl md:text-5xl font-chinese-decorative text-[#8B7355] opacity-60 mb-2 sm:mb-0">
                爱
              </div>
              <div className="flex flex-col items-center">
                <h2
                  className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#8B7355] ${
                    language === "vi"
                      ? "font-['Noto_Serif_SC',serif]"
                      : "font-['Stay_Glory_Serif',serif] normal-case"
                  }`}
                  style={{ textTransform: "none" }}
                >
                  {content.title}
                </h2>
              </div>
              <div className="chinese-char text-3xl sm:text-4xl md:text-5xl font-chinese-decorative text-[#8B7355] opacity-60 mt-2 sm:mt-0">
                情
              </div>
            </div>

            {/* Groom & Bride Section */}
            <div className="flex flex-col gap-10 items-center w-full max-w-3xl mx-auto mb-4 pt-10 pb-10">
              {/* Groom Row */}
              <div
                className="groom-animate flex flex-row items-center w-full justify-center relative gap-5"
                style={{ opacity: 0, transform: "translateY(32px)" }}
              >
                {/* Watermark Chinese */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 text-[16vw] sm:text-[8vw] md:text-[5vw] text-[#D4AF37] opacity-10 font-chinese-decorative select-none pointer-events-none z-0">
                  夫
                </span>
                {/* Ảnh chú rể */}
                <div className="flex-shrink-0 w-[48vw] max-w-[180px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[400px] aspect-[3/4] rounded-2xl overflow-visible relative z-10 shadow-2xl -rotate-6">
                  <img
                    src={groomPhoto}
                    alt={groomInfo.title}
                    className="w-full h-full object-cover rounded-2xl border-4 border-[#D4AF37] shadow-gold"
                    style={{
                      boxShadow: "0 8px 32px 0 #D4AF37, 0 2px 8px #fffbe6",
                    }}
                  />
                </div>
                {/* Thông tin chú rể */}
                <div className="flex-1 ml-4 sm:ml-10 md:ml-16 text-left relative z-10 py-2 sm:py-6">
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-['Noto_Serif_SC',serif] text-[#8B7355] font-bold mb-2 drop-shadow-gold tracking-wide">
                    {groomInfo.title}
                  </h4>
                  <div
                    className={`text-sm sm:text-lg text-[#8B7355] opacity-95 font-light leading-relaxed pl-3 sm:pl-8 border-l-4 border-dotted border-[#D4AF37]/80 italic ${
                      language === "en"
                        ? "font-['Playfair_Display',serif]"
                        : "font-['Noto_Serif_SC',serif]"
                    }`}
                  >
                    {groomInfo.name}
                    <br />
                    {groomInfo.birth}
                    <br />
                    {groomInfo.desc}
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37]/80 to-transparent rounded-full mt-3 mb-1"></div>
                </div>
              </div>
              {/* Bride Row */}
              <div
                className="bride-animate flex flex-row-reverse items-center w-full justify-center relative gap-5"
                style={{ opacity: 0, transform: "translateY(32px)" }}
              >
                {/* Watermark Chinese */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 text-[16vw] sm:text-[8vw] md:text-[5vw] text-[#D4AF37] opacity-10 font-chinese-decorative select-none pointer-events-none z-0">
                  妻
                </span>
                {/* Ảnh cô dâu */}
                <div className="flex-shrink-0 w-[48vw] max-w-[180px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[400px] aspect-[3/4] rounded-2xl overflow-visible relative z-10 shadow-2xl rotate-6">
                  <img
                    src={bridePhoto}
                    alt={brideInfo.title}
                    className="w-full h-full object-cover rounded-2xl border-4 border-[#D4AF37] shadow-gold"
                    style={{
                      boxShadow: "0 8px 32px 0 #D4AF37, 0 2px 8px #fffbe6",
                    }}
                  />
                </div>
                {/* Thông tin cô dâu */}
                <div className="flex-1 mr-4 sm:mr-10 md:mr-16 text-right relative z-10 py-2 sm:py-6">
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-['Noto_Serif_SC',serif] text-[#8B7355] font-bold mb-2 drop-shadow-gold tracking-wide">
                    {brideInfo.title}
                  </h4>
                  <div
                    className={`text-sm sm:text-lg text-[#8B7355] opacity-95 font-light leading-relaxed pr-3 sm:pr-8 border-r-4 border-dotted border-[#D4AF37]/80 italic ${
                      language === "en"
                        ? "font-['Playfair_Display',serif]"
                        : "font-['Noto_Serif_SC',serif]"
                    }`}
                  >
                    {brideInfo.name}
                    <br />
                    {brideInfo.birth}
                    <br />
                    {brideInfo.desc}
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-l from-[#D4AF37]/80 to-transparent rounded-full mt-3 mb-1 ml-auto"></div>
                </div>
              </div>
            </div>

            <p
              className={`text-base sm:text-xl md:text-2xl opacity-80 font-light tracking-wide mb-4 sm:mb-8 text-[#8B7355] ${
                language === "vi"
                  ? "font-['Noto_Serif_SC',serif]"
                  : "font-['Playfair_Display',serif] normal-case"
              }`}
              style={{ textTransform: "none" }}
            >
              {content.subtitle}
            </p>

            {/* Decorative line with enhanced design */}
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]"></div>
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-gold"></div>
              </div>
              <div className="relative">
                <div className="chinese-char text-3xl text-[#D4AF37] font-chinese-decorative drop-shadow-gold">
                  囍
                </div>
                <div className="absolute inset-0 text-3xl text-[#D4AF37] font-chinese-decorative blur-sm opacity-30">
                  囍
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-gold"></div>
                <div className="w-20 h-px bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]"></div>
              </div>
            </div>
          </div>

          {/* Timeline */}

          {/* Bottom Decoration */}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particlePositions.map((pos, i) => (
            <div
              key={`story-particle-${i}`}
              className="story-particle absolute text-[#D4AF37] opacity-20 font-chinese-decorative text-sm pointer-events-none"
              style={{
                top: `${pos.top}%`,
                left: `${pos.left}%`,
                animationDelay: `${pos.delay}s`,
              }}
            >
              {i % 2 === 0 ? "福" : "缘"}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default LoveStorySection;
