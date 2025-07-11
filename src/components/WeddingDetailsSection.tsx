import React, { useEffect, useRef, useMemo } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface WeddingDetailsSectionProps {
  language: "vi" | "en";
}

const details = {
  vi: {
    saveTheDate: "SAVE THE DATE",
    brideAndGroom: "Kim Thuận & Minh Hương",
    invitation: "Trân trọng kính mời đến dự lễ thành hôn",
    date: "18:00|09.08.2025|Thứ Bảy",
    location: "White Palace Võ Văn Kiệt",
    address: "59 Võ Văn Kiệt, An Lạc, Bình Tân, Hồ Chí Minh",
    dressCode: "Lịch sự, tông màu trắng - vàng - nâu",
    dressNote: "(Ưu tiên trang phục truyền thống hoặc hiện đại sang trọng)",
    mapText: "Xem đường đi",
    mapUrl:
      "https://maps.google.com/?q=White+Palace+Võ+Văn+Kiệt,+Bình+Tân,+TP.HCM",
    blessing: "百年好合，永结同心",
  },
  en: {
    saveTheDate: "SAVE THE DATE",
    brideAndGroom: "Kim Thuan & Minh Huong",
    invitation: "We cordially invite you to our wedding celebration",
    date: "6:00 PM|09.08.2025|Saturday",
    location: "White Palace Vo Van Kiet",
    address: "59 Vo Van Kiet, An Lac, Binh Tan, Ho Chi Minh City",
    dressCode: "Formal, white - gold - brown palette",
    dressNote: "(Prefer traditional or modern elegant attire)",
    mapText: "Get Directions",
    mapUrl:
      "https://maps.google.com/?q=White+Palace+Vo+Van+Kiet,+Binh+Tan,+HCMC",
    blessing: "百年好合，永结同心",
  },
};

// Particle: dot, line, hoa văn nhỏ, hoa văn Chinese SVG/unicode, di chuyển
const movingParticles = [
  // Dot
  {
    type: "dot",
    style: "left-[12%] top-[18%] w-2 h-2",
    anim: "animate-floatArt",
  },
  {
    type: "dot",
    style: "left-[80%] top-[22%] w-3 h-3",
    anim: "animate-waveArt delay-150",
  },
  // Line
  {
    type: "line",
    style: "left-[30%] top-[70%] w-16 h-1",
    anim: "animate-floatArt delay-300",
  },
  {
    type: "line",
    style: "left-[65%] top-[60%] w-10 h-1",
    anim: "animate-waveArt delay-500",
  },
  // Hoa văn nhỏ unicode
  {
    type: "orn",
    style: "left-[50%] top-[10%] text-2xl",
    anim: "animate-fadeArt",
    text: "囍",
  },
  {
    type: "orn",
    style: "left-[18%] top-[80%] text-xl",
    anim: "animate-floatArt delay-300",
    text: "福",
  },
  {
    type: "orn",
    style: "left-[78%] top-[75%] text-xl",
    anim: "animate-waveArt delay-150",
    text: "缘",
  },
  // SVG Chinese pattern
  {
    type: "svg",
    style: "left-[8%] top-[10%] w-16 h-16",
    anim: "animate-floatArt delay-500",
  },
  {
    type: "svg",
    style: "right-[8%] bottom-[8%] w-20 h-20",
    anim: "animate-waveArt delay-300",
  },
];

const ChinesePattern = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8"
      y="8"
      width="48"
      height="48"
      rx="12"
      stroke="#D4AF37"
      strokeWidth="3"
      fill="none"
      opacity=".18"
    />
    <path
      d="M16 32h32M32 16v32"
      stroke="#D4AF37"
      strokeWidth="2"
      opacity=".18"
    />
  </svg>
);

// Xóa particle hình tròn bóng bay (circleParticles)

// Balloon-like floating circle particles (luxury, subtle, like WelcomePage)
const balloonParticles = [
  {
    style: "left-[8%] top-[60%] w-24 h-24",
    anim: "animate-floatArt delay-200 opacity-20",
  },
  {
    style: "right-[10%] top-[30%] w-16 h-16",
    anim: "animate-waveArt delay-400 opacity-25",
  },
  {
    style: "left-[50%] bottom-[12%] w-20 h-20",
    anim: "animate-floatArt delay-700 opacity-15",
  },
  {
    style: "right-[20%] bottom-[18%] w-12 h-12",
    anim: "animate-floatArt delay-1000 opacity-20",
  },
];

const WeddingDetailsSection: React.FC<WeddingDetailsSectionProps> = ({
  language,
}) => {
  const content = details[language];
  // GSAP refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const saveDateRef = useRef<HTMLSpanElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const blessingRef = useRef<HTMLDivElement>(null);

  // Tối ưu vị trí particle chỉ random 1 lần khi mount
  // Giảm số lượng particle trên mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const particleCount = isMobile
    ? Math.ceil(movingParticles.length / 2)
    : movingParticles.length;
  const particlePositions = useMemo(
    () =>
      Array.from({ length: particleCount }, () => ({
        top: 10 + Math.random() * 80,
        left: 5 + Math.random() * 90,
      })),
    [particleCount]
  );

  useEffect(() => {
    if (!sectionRef.current) return;
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reset",
          // markers: true, // bật để debug nếu cần
        },
      });
      tl.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          saveDateRef.current,
          { opacity: 0, scale: 0.85, filter: "blur(8px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          namesRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          inviteRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          timeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          addressRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          blessingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "+=0.1"
        );
      // Animate particles luxury
      gsap.utils.toArray(".wedding-particle").forEach((el: any, i: number) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 0.3,
            y: 0,
            scale: 1,
            duration: 1.1,
            delay: 0.2 + i * 0.08,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section className="relative min-h-screen w-full py-3 xs:py-4 sm:py-10 md:py-16 bg-gradient-to-br from-[#f8f6f0] via-[#ede8dc] to-[#e8e2d5] flex flex-col items-center justify-center overflow-hidden select-none text-[15px] xs:text-[17px] sm:text-lg md:text-xl lg:text-2xl">
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Balloon particles luxury */}
        {balloonParticles.map((c, i) => (
          <div
            key={i}
            className={`wedding-particle absolute ${c.style
              .replace(/w-(\d+)/, (_, n) => `w-${Math.round(Number(n) * 1.15)}`)
              .replace(
                /h-(\d+)/,
                (_, n) => `h-${Math.round(Number(n) * 1.15)}`
              )} rounded-full bg-gradient-to-br from-[#fffbe6] via-[#C8A882] to-[#BFA980] blur-2xl ${
              c.anim
            }`}
          />
        ))}
        {/* Các particle cũ */}
        {movingParticles.map((particle, i) => (
          <div
            key={i}
            className={`absolute ${particle.style} ${particle.anim}`}
            style={{
              top: `${particlePositions[i].top}%`,
              left: `${particlePositions[i].left}%`,
            }}
          >
            {particle.type === "orn" ? particle.text : null}
            {particle.type === "svg" ? <ChinesePattern /> : null}
          </div>
        ))}
      </div>
      {/* Góc section: họa tiết Chinese pattern lớn */}
      <ChinesePattern className="absolute left-0 top-0 w-32 h-32 opacity-10 z-0" />
      <ChinesePattern className="absolute right-0 bottom-0 w-36 h-36 opacity-10 z-0" />
      <div
        ref={sectionRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center w-full h-full pb-6 xs:pb-8 sm:pb-14 md:pb-20 max-w-[99vw] sm:max-w-3xl md:max-w-4xl mx-auto px-2 xs:px-4 sm:px-10">
          {/* SAVE THE DATE center highlight, luxury effect, responsive nhỏ hơn trên mobile */}
          <div className="w-full flex items-center justify-center">
            <span
              ref={saveDateRef}
              className="text-[1.5rem] xs:text-[2rem] sm:text-[2.8rem] md:text-[3.7rem] lg:text-[5.5rem] font-['Stay_Glory_Serif',serif] tracking-widest text-[#C8A882] drop-shadow-[0_2px_8px_#C8A88255] uppercase mb-3 xs:mb-6 sm:mb-10 md:mb-14 luxury-glow animate-pulse-slow relative text-center whitespace-nowrap"
            >
              <span
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[2.8rem] xs:text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[12rem] text-[#C8A882] opacity-10 font-['Noto_Serif_SC',serif] pointer-events-none select-none z-0"
                style={{ zIndex: 0 }}
              >
                囍
              </span>
              <span className="relative z-10">{content.saveTheDate}</span>
              <span className="block absolute left-1/2 -translate-x-1/2 bottom-[-12px] xs:bottom-[-18px] sm:bottom-[-28px] w-20 xs:w-32 sm:w-56 h-3 bg-gradient-to-r from-[#C8A882] via-[#F5E7C4] to-[#A67C52] rounded-full blur-[3px] opacity-60" />
            </span>
          </div>
          {/* Tên cô dâu chú rể nghệ thuật, luxury, responsive, mobile: dọc đối xứng, & Fabregas giữa, desktop: ngang */}
          <div
            ref={namesRef}
            className="w-full flex items-center justify-center"
          >
            {/* Mobile layout: dọc đối xứng, & đè giữa, font rất lớn, Fabregas */}
            <span className="relative flex flex-col items-center justify-center w-full min-h-[7.5em] sm:hidden">
              {/* Kim Thuận trên, căn trái, font rất lớn */}
              <span
                className={`relative z-10 text-[2.5rem] xs:text-[3.2rem] tracking-[0.18em] text-left drop-shadow-gold ${
                  language === "vi"
                    ? "font-['Playfair_Display',serif] font-medium"
                    : "font-['Playfair_Display',serif] font-medium"
                } text-[#A67C52] whitespace-nowrap w-full px-2 flex justify-start`}
                style={{ letterSpacing: "0.18em" }}
              >
                <span
                  className="inline-block bg-none px-2 rounded-xl w-full text-left"
                  style={{ display: "block", textAlign: "left" }}
                >
                  {content.brideAndGroom.split("&")[0].trim()}
                </span>
              </span>
              {/* & rất lớn, đè giữa, font Fabregas */}
              <span
                className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none text-[4.5rem] xs:text-[5.5rem] text-[#C8A882] font-[400]"
                style={{
                  fontFamily: "Fabregas, serif",
                  lineHeight: "1",
                  textShadow: "0 2px 8px #c8a88255",
                }}
              >
                &amp;
              </span>
              {/* Minh Hương dưới, căn phải, font rất lớn */}
              <span
                className={`relative z-10 text-[2.5rem] xs:text-[3.2rem] tracking-[0.18em] text-right drop-shadow-gold ${
                  language === "vi"
                    ? "font-['Playfair_Display',serif] font-medium"
                    : "font-['Playfair_Display',serif] font-medium"
                } text-[#A67C52] whitespace-nowrap w-full px-2 mt-4 flex justify-end`}
                style={{ letterSpacing: "0.18em" }}
              >
                <span
                  className="inline-block bg-none px-2 rounded-xl w-full text-right"
                  style={{ display: "block", textAlign: "right" }}
                >
                  {content.brideAndGroom.split("&")[1]?.trim()}
                </span>
              </span>
              {/* Line dưới tên */}
              <span className="block w-24 xs:w-36 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent rounded-full opacity-60 mt-6 shadow-gold" />
              {/* Hoa văn Chinese phía trên */}
              <span
                className="absolute left-1/2 -translate-x-1/2 -top-8 xs:-top-12 text-[2rem] xs:text-[2.7rem] text-[#C8A882] opacity-7 font-['Noto_Serif_SC',serif] select-none pointer-events-none z-0"
                style={{ letterSpacing: "0.22em" }}
              >
                囍
              </span>
            </span>
            {/* Desktop layout: ngang, & inline */}
            <span className="relative hidden sm:flex flex-row items-center justify-center w-auto min-h-0">
              <span
                className={`relative z-10 text-[2.7rem] md:text-[3.7rem] lg:text-[4.3rem] tracking-[0.16em] text-center drop-shadow-gold ${
                  language === "vi"
                    ? "font-['Playfair_Display',serif] font-medium"
                    : "font-['Playfair_Display',serif] font-medium"
                } text-[#A67C52] whitespace-nowrap px-2`}
                style={{ letterSpacing: "0.16em" }}
              >
                <span className="inline-block bg-none px-2 rounded-xl">
                  {content.brideAndGroom.split("&")[0].trim()}
                </span>
              </span>
              <span
                className="inline-block mx-3 text-5xl md:text-6xl text-[#C8A882] drop-shadow-gold leading-none"
                style={{
                  fontFamily: "Fabregas, serif",
                  fontWeight: 400,
                  textShadow: "0 2px 8px #c8a88255",
                  lineHeight: "1",
                  position: "relative",
                  top: "0.5em",
                }}
              >
                &amp;
              </span>
              <span
                className={`relative z-10 text-[2.7rem] md:text-[3.7rem] lg:text-[4.3rem] tracking-[0.16em] text-center drop-shadow-gold ${
                  language === "vi"
                    ? "font-['Playfair_Display',serif] font-medium"
                    : "font-['Playfair_Display',serif] font-medium"
                } text-[#A67C52] whitespace-nowrap px-2`}
                style={{ letterSpacing: "0.16em" }}
              >
                <span className="inline-block bg-none px-2 rounded-xl">
                  {content.brideAndGroom.split("&")[1]?.trim()}
                </span>
              </span>
              {/* Line dưới tên */}
              <span className="block w-40 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent rounded-full opacity-60 mt-2 shadow-gold absolute bottom-[-1.5em] left-1/2 -translate-x-1/2" />
              {/* Hoa văn Chinese phía trên */}
              <span
                className="absolute left-1/2 -translate-x-1/2 -top-8 text-[3rem] text-[#C8A882] opacity-7 font-['Noto_Serif',serif] select-none pointer-events-none z-0"
                style={{ letterSpacing: "0.22em" }}
              >
                囍
              </span>
            </span>
          </div>
          {/* Dòng kính mời nhỏ hơn, spacing thoáng, responsive nhỏ hơn trên mobile */}
          <span
            ref={inviteRef}
            className="block text-sm xs:text-base sm:text-xl md:text-2xl font-['Noto_Serif_SC',serif] text-[#A67C52] tracking-wider mb-6 xs:mb-8 sm:mb-14 md:mb-20 text-center opacity-80 letter-glow"
          >
            {content.invitation}
          </span>
          {/* Thời gian luxury, dưới là địa chỉ, dọc, căn giữa, responsive font size tối ưu cho điện thoại */}
          <div
            ref={timeRef}
            className="flex flex-col items-center w-full max-w-3xl mx-auto px-2 xs:px-4 mb-6 sm:mb-12"
          >
            <div className="flex flex-col items-center w-full mb-5 sm:mb-10">
              <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-4 md:gap-6 py-2 sm:py-5">
                {/* 18:00 với 2 line vàng trên dưới, chữ nhỏ hơn, font luxury, responsive */}
                <span className="flex flex-col items-center relative min-w-[56px] xs:min-w-[70px] sm:min-w-[90px]">
                  <span className="block w-10 xs:w-14 sm:w-20 md:w-28 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent rounded-full opacity-80 mb-1 xs:mb-2 sm:mb-3 drop-shadow-[0_2px_8px_#C8A88255]" />
                  <span className="text-sm xs:text-base sm:text-xl md:text-3xl lg:text-4xl font-semibold text-[#A67C52] tracking-widest font-['Noto_Serif_SC',serif] whitespace-nowrap drop-shadow-[0_2px_8px_#C8A88255] px-1 xs:px-2 sm:px-3">
                    {content.date.split("|")[0].trim()}
                  </span>
                  <span className="block w-10 xs:w-14 sm:w-20 md:w-28 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent rounded-full opacity-80 mt-1 xs:mt-2 sm:mt-3 drop-shadow-[0_2px_8px_#C8A88255]" />
                </span>
                {/* | luxury gradient gold, lớn, bo tròn */}
                <span className="mx-1 xs:mx-2 sm:mx-3 text-base xs:text-lg sm:text-3xl md:text-5xl lg:text-5xl font-extrabold bg-gradient-to-b from-[#C8A882] via-[#F5E7C4] to-[#A67C52] bg-clip-text text-transparent px-1 xs:px-2 sm:px-3 select-none drop-shadow-[0_2px_8px_#C8A88255]">
                  |
                </span>
                {/* Ngày lớn nhất, font luxury, glow gold, responsive */}
                <span
                  className="text-lg xs:text-xl sm:text-3xl md:text-6xl lg:text-6xl font-extrabold text-[#C8A882] tracking-widest font-['Stay_Glory_Serif',serif] whitespace-nowrap px-2 xs:px-3 sm:px-5 drop-shadow-[0_2px_8px_#C8A88255] animate-pulse-slow"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {content.date.split("|")[1]?.trim()}
                </span>
                {/* | luxury gradient gold, lớn, bo tròn */}
                <span className="mx-1 xs:mx-2 sm:mx-3 text-base xs:text-lg sm:text-3xl md:text-5xl lg:text-5xl font-extrabold bg-gradient-to-b from-[#C8A882] via-[#F5E7C4] to-[#A67C52] bg-clip-text text-transparent px-1 xs:px-2 sm:px-3 select-none drop-shadow-[0_2px_8px_#C8A88255]">
                  |
                </span>
                {/* Thứ Bảy với 2 line vàng trên dưới, chữ nhỏ hơn, font luxury, responsive */}
                <span className="flex flex-col items-center relative min-w-[56px] xs:min-w-[70px] sm:min-w-[90px]">
                  <span className="block w-10 xs:w-14 sm:w-20 md:w-28 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent rounded-full opacity-80 mb-1 xs:mb-2 sm:mb-3 drop-shadow-[0_2px_8px_#C8A88255]" />
                  <span className="text-sm xs:text-base sm:text-xl md:text-3xl lg:text-4xl font-semibold text-[#A67C52] tracking-widest font-['Noto_Serif_SC',serif] whitespace-nowrap drop-shadow-[0_2px_8px_#C8A88255] px-1 xs:px-2 sm:px-3">
                    {content.date.split("|")[2]?.trim()}
                  </span>
                  <span className="block w-10 xs:w-14 sm:w-20 md:w-28 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent rounded-full opacity-80 mt-1 xs:mt-2 sm:mt-3 drop-shadow-[0_2px_8px_#C8A88255]" />
                </span>
              </div>
              {/* Label luxury */}
              <span className="mt-2 xs:mt-3 text-xs xs:text-sm sm:text-base md:text-lg text-[#A67C52] font-semibold tracking-widest uppercase letter-glow flex items-center gap-2">
                <span className="font-['Noto_Serif_SC',serif] text-[#C8A882] text-base sm:text-lg">
                  时光
                </span>{" "}
                Thời gian / Time
              </span>
            </div>
            {/* Địa chỉ luxury dưới thời gian, size lớn, spacing thoáng, responsive nhỏ hơn trên mobile */}
            <div
              ref={addressRef}
              className="flex flex-col items-center mt-4 sm:mt-10 w-full"
            >
              {/* Địa điểm luxury, font Việt hóa, lớn ngang thời gian, lấy từ content, line gold gradient trên/dưới, spacing sang trọng */}
              <span className="block w-auto sm:w-72 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent rounded-full opacity-90 mb-6 sm:mb-10 drop-shadow-[0_2px_8px_#C8A88255]" />
              <span className="relative flex items-center justify-center mb-3 sm:mb-6">
                <span className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-12 h-[3px] bg-gradient-to-r from-transparent via-[#C8A882] to-transparent opacity-70 rounded-full" />
                <span
                  className={`text-lg xs:text-xl sm:text-[3.2rem] md:text-[3.8rem] font-extrabold ${
                    language === "vi"
                      ? "font-['Noto_Serif',serif]"
                      : "font-['Stay_Glory_Serif',serif]"
                  } text-[#C8A882] tracking-[0.14em] uppercase drop-shadow-[0_2px_8px_#C8A88255] px-3 sm:px-6 whitespace-nowrap luxury-glow`}
                  style={{ letterSpacing: "0.14em" }}
                >
                  {content.location}
                </span>
                <span className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-12 h-[3px] bg-gradient-to-l from-transparent via-[#C8A882] to-transparent opacity-70 rounded-full" />
              </span>
              <span
                className={`text-sm xs:text-base sm:text-2xl md:text-3xl text-[#A67C52] opacity-95 text-center mb-3 sm:mb-4 font-medium tracking-wide px-2 sm:px-4 whitespace-nowrap luxury-font ${
                  language === "en"
                    ? "font-['Playfair_Display',serif]"
                    : "font-['Noto_Serif',serif]"
                }`}
                style={{ letterSpacing: "0.05em" }}
              >
                {content.address}
              </span>
              <a
                href={content.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-xl sm:text-2xl font-semibold text-[#C8A882] hover:text-[#A67C52] transition-all duration-200 font-['Noto_Serif_SC',serif] tracking-widest underline underline-offset-[10px] cursor-pointer luxury-font mb-3 mt-3"
              >
                <FaMapMarkedAlt className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform duration-200 text-[#A67C52]" />
                {content.mapText}
              </a>
              <span className="block w-40 sm:w-72 h-1 bg-gradient-to-r from-transparent via-[#C8A882] to-transparent rounded-full opacity-90 mt-8 drop-shadow-[0_2px_8px_#C8A88255]" />
              <span className="text-lg text-[#A67C52] font-semibold tracking-widest uppercase letter-glow flex items-center gap-2 mt-6">
                <span className="font-['Noto_Serif_SC',serif] text-[#C8A882] text-xl">
                  地
                </span>{" "}
                Địa điểm / Venue
              </span>
            </div>
          </div>
          {/* Dòng thơ/câu chúc Chinese ở cuối section */}
          <div
            ref={blessingRef}
            className="w-full flex justify-center mt-12 mb-6"
          >
            <span className="font-['Noto_Serif_SC',serif] text-[#C8A882] text-xl md:text-3xl opacity-70 tracking-widest text-center select-none">
              {content.blessing}
            </span>
          </div>
        </div>
      </div>
      {/* Custom CSS: .drop-shadow-gold { filter: drop-shadow(0 2px 8px #C8A88255); } .animate-pulse-slow { animation: pulse 2.5s infinite; } .animate-fade-in-up { animation: fadeInUp 1.2s both; } .delay-500 { animation-delay: .5s; } .letter-glow { text-shadow: 0 2px 8px #C8A88255; } @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } } @keyframes floatArt { 0% { transform: translateY(0); } 100% { transform: translateY(-18px); } } @keyframes waveArt { 0% { transform: translateX(0) scale(1); } 50% { transform: translateX(12px) scale(1.1); } 100% { transform: translateX(0) scale(1); } } @keyframes fadeArt { 0% { opacity: 0.2; } 50% { opacity: 0.5; } 100% { opacity: 0.2; } } .animate-floatArt { animation: floatArt 4s ease-in-out infinite alternate; } .animate-waveArt { animation: waveArt 5.5s ease-in-out infinite alternate; } .animate-fadeArt { animation: fadeArt 3.5s ease-in-out infinite alternate; } */}
    </section>
  );
};

export default WeddingDetailsSection;
