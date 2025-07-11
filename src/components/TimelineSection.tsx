import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function TimelineSection({ lang = "vi" }: { lang?: "vi" | "en" }) {
  // Dữ liệu timeline mới, alternating trên-dưới, dot luxury, không dùng icon thô
  const WEDDING_TIMELINE = [
    {
      time: "17:30",
      title: { vi: "Đón Khách", en: "Guest Reception" },
      zh: "迎宾",
      accent: "bg-[#F8E1E7] border-[#F6E7C1]",
    },
    {
      time: "19:00",
      title: { vi: "Đón Lễ", en: "Ceremony" },
      zh: "开宴",
      accent: "bg-[#F6E7C1] border-[#E7BFA5]",
    },
    {
      time: "19:30",
      title: { vi: "Khai Tiệc", en: "Main Banquet" },
      zh: "宴席",
      accent: "bg-[#F7E7CE] border-[#C8A882]",
    },
    {
      time: "20:00",
      title: { vi: "Tưng Bừng", en: "End & Photos" },
      zh: "留影",
      accent: "bg-[#F8F6F0] border-[#A67C52]",
    },
  ];

  // DRESSCODE giữ nguyên
  const DRESSCODE = [
    {
      color: "#C8A882",
      label: {
        vi: "Vàng",
        en: "Gold",
      },
    },
    {
      color: "#C0392B",
      label: {
        vi: "Đỏ",
        en: "Chinese Red",
      },
    },
    {
      color: "#ede8dc",
      label: {
        vi: "Trắng",
        en: "Ivory",
      },
    },
    {
      color: "#1C1C1C",
      label: {
        vi: "Đen",
        en: "Jet Black",
      },
    },
  ];

  // GSAP refs
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particleRefs = useRef<(HTMLDivElement | SVGSVGElement | null)[]>([]);
  const timelineBarRef = useRef<HTMLDivElement>(null); // Thêm ref cho thanh ngang

  // Responsive: xác định mobile
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Giảm số lượng dot và particle trên mobile
  const dotCount = isMobile
    ? Math.ceil(WEDDING_TIMELINE.length / 2)
    : WEDDING_TIMELINE.length;
  const particleCount = isMobile ? 2 : 6;
  const dotPositions = useMemo(
    () =>
      Array.from({ length: dotCount }, () => ({
        top: 10 + Math.random() * 80,
        left: 5 + Math.random() * 90,
      })),
    [dotCount]
  );
  const particlePositions = useMemo(
    () =>
      Array.from({ length: particleCount }, () => ({
        top: 10 + Math.random() * 80,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 2,
      })),
    [particleCount]
  );

  // Optimize dresscode particles: reduce count on mobile, useMemo for positions
  const dresscodeParticleCount = isMobile ? 8 : 20;
  const dresscodeParticles = useMemo(() => {
    return Array.from({ length: dresscodeParticleCount }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: isMobile ? 8 + Math.random() * 8 : 12 + Math.random() * 16,
      opacity: 0.3 + Math.random() * 0.5,
      delay: Math.random() * 2,
    }));
  }, [isMobile, dresscodeParticleCount]);

  useEffect(() => {
    // Timeline fade-in
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8, // chậm hơn
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "restart none none none", // Đổi thành restart
          },
        }
      );
    }
    // Timeline bar animation từ trái sang phải
    if (timelineBarRef.current) {
      gsap.fromTo(
        timelineBarRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 2.1, // chậm hơn
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: timelineBarRef.current,
            start: "top 85%",
            toggleActions: "restart none none none", // Đổi thành restart
          },
        }
      );
    }
    // Dot luxury alternating float-in
    dotRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0.6, opacity: 0, y: i % 2 === 0 ? -40 : 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.5, // chậm hơn
            delay: 0.3 + i * 0.22,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "restart none none none", // Đổi thành restart
            },
          }
        );
      }
    });
    // Card info fade-up
    cardRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5, // chậm hơn
            delay: 0.5 + i * 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "restart none none none", // Đổi thành restart
            },
          }
        );
      }
    });
    // Particle luxury sparkle/float
    particleRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 0.18 + (i % 3) * 0.08,
            scale: 1,
            duration: 1.5, // chậm hơn
            delay: 1 + i * 0.09,
            ease: "power1.out",
            yoyo: true,
            repeat: -1,
            repeatDelay: 2 + Math.random() * 2,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 90%",
              toggleActions: "restart none none none", // Đổi thành restart
            },
          }
        );
      }
    });
    // Tagline luxury animate in
    const tagline = document.querySelector(".luxury-tagline");
    if (tagline) {
      gsap.fromTo(
        tagline,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5, // chậm hơn
          delay: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tagline,
            start: "top 95%",
            toggleActions: "restart none none none", // Đổi thành restart
          },
        }
      );
    }
    // Dresscode circle animate in
    const dresscodeCircles = document.querySelectorAll(".dresscode-circle");
    dresscodeCircles.forEach((el, i) => {
      gsap.fromTo(
        el,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5, // chậm hơn
          delay: 0.5 + i * 0.18,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "restart none none none", // Đổi thành restart
          },
        }
      );
    });
  }, []);

  return (
    <section
      className="w-full px-2 md:px-8 py-12 bg-gradient-to-br from-[#f8f6f0] via-[#ede8dc] to-[#e8e2d5] relative overflow-hidden "
      id="timeline"
    >
      {/* Chinese luxury pattern 4 góc */}
      <svg
        className="absolute left-0 top-0 w-24 h-24 md:w-32 md:h-32 opacity-30 z-0"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10,90 Q40,60 90,10"
          stroke="#C8A882"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="18" cy="82" r="6" fill="#F6E7C1" fillOpacity="0.7" />
        <rect
          x="5"
          y="85"
          width="10"
          height="5"
          rx="2"
          fill="#E7BFA5"
          fillOpacity="0.5"
        />
      </svg>
      <svg
        className="absolute right-0 top-0 w-24 h-24 md:w-32 md:h-32 opacity-30 z-0 rotate-90"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10,90 Q40,60 90,10"
          stroke="#C8A882"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="18" cy="82" r="6" fill="#F6E7C1" fillOpacity="0.7" />
        <rect
          x="5"
          y="85"
          width="10"
          height="5"
          rx="2"
          fill="#E7BFA5"
          fillOpacity="0.5"
        />
      </svg>
      <svg
        className="absolute left-0 bottom-0 w-24 h-24 md:w-32 md:h-32 opacity-30 z-0 rotate-[-90deg]"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10,90 Q40,60 90,10"
          stroke="#C8A882"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="18" cy="82" r="6" fill="#F6E7C1" fillOpacity="0.7" />
        <rect
          x="5"
          y="85"
          width="10"
          height="5"
          rx="2"
          fill="#E7BFA5"
          fillOpacity="0.5"
        />
      </svg>
      <svg
        className="absolute right-0 bottom-0 w-24 h-24 md:w-32 md:h-32 opacity-30 z-0 rotate-180"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10,90 Q40,60 90,10"
          stroke="#C8A882"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="18" cy="82" r="6" fill="#F6E7C1" fillOpacity="0.7" />
        <rect
          x="5"
          y="85"
          width="10"
          height="5"
          rx="2"
          fill="#E7BFA5"
          fillOpacity="0.5"
        />
      </svg>
      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className={`text-center text-3xl md:text-4xl font-bold mb-16 tracking-wider text-[#A67C52] ${
            lang === "vi"
              ? "font-['Noto_Serif_SC',serif]"
              : "font-['Stay_Glory_Serif','Playfair_Display',serif]"
          }`}
        >
          {lang === "vi" ? "Lịch Trình Buổi Tiệc" : "Wedding Timeline"}
        </h2>

        {/* Timeline alternating trên-dưới, luxury, dot lớn nối liền đường kẻ */}
        {!isMobile ? (
          <div className="relative w-full min-h-[340px] md:min-h-[400px] flex items-center justify-center pb-8">
            {/* Đường timeline chính: gradient pastel, dot luxury nằm trên đường */}
            <div
              ref={timelineBarRef}
              className="absolute left-8 right-8 md:left-16 md:right-16 top-1/2 h-2 md:h-3 rounded-full z-0 shadow-md"
              style={{
                background:
                  "linear-gradient(90deg, #F8E1E7 0%, #F6E7C1 40%, #E7C6C6 60%, #F7E7CE 100%)",
                transform: "translateY(-50%)",
              }}
            ></div>
            <div className="w-full flex justify-between items-center relative z-10 px-8 md:px-16">
              {WEDDING_TIMELINE.map((item, idx) => {
                const isTop = idx % 2 === 0;
                // Màu luxury đồng bộ toàn trang: pastel vàng nhạt, hồng phấn, ivory, gold, accent nâu nhạt
                const dotBg = [
                  "bg-[#F8E1E7]",
                  "bg-[#F6E7C1]",
                  "bg-[#F7E7CE]",
                  "bg-[#F8F6F0]",
                ][idx % 4];
                const dotBorder = [
                  "border-[#C8A882]",
                  "border-[#E7BFA5]",
                  "border-[#F6E7C1]",
                  "border-[#A67C52]",
                ][idx % 4];
                const cardBorder = [
                  "border-[#F6E7C1]",
                  "border-[#E7BFA5]",
                  "border-[#C8A882]",
                  "border-[#A67C52]",
                ][idx % 4];
                const cardShadow =
                  "shadow-[0_4px_32px_0_rgba(200,168,130,0.10),0_2px_16px_0_rgba(231,191,165,0.08)]";
                const cardBg =
                  "bg-gradient-to-br from-[#fffaf6]/90 via-[#f8f6f0]/80 to-[#f8e1e7]/90";
                const textColor = "text-[#A67C52]";
                // Chọn font luxury cho tiêu đề
                const titleFont =
                  lang === "vi"
                    ? "font-['Noto_Serif_SC',serif]"
                    : "font-['Playfair_Display',serif]";
                // Card width tự động, padding hợp lý, không wrap, không overflow
                const titleLength = item.title[lang].length;
                const cardMinWidth =
                  titleLength < 10 ? 120 : titleLength < 18 ? 150 : 180;
                const cardMaxWidth = titleLength < 18 ? 220 : 260;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center w-1/4 min-w-[100px] relative group"
                    ref={(el) => {
                      dotRefs.current[idx] = el;
                    }}
                  >
                    {/* Line nối dot với card info - luxury gradient, luôn căn giữa */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 ${
                        isTop ? "bottom-full" : "top-full"
                      } w-1 h-10 md:h-16 bg-gradient-to-b from-[#E7BFA5] to-[#F6E7C1] z-0`}
                      style={{
                        marginBottom: isTop ? "0.5rem" : 0,
                        marginTop: !isTop ? "0.5rem" : 0,
                      }}
                    ></div>
                    {/* Dot luxury pastel, border gold, Chinese nhỏ, luôn căn giữa */}
                    <div
                      className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center z-20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl ${dotBg} ${dotBorder}`}
                      style={{
                        fontFamily: "Noto Serif SC, serif",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        boxShadow:
                          "0 8px 32px 0 rgba(200, 168, 130, 0.13), 0 2px 16px 0 rgba(231,191,165,0.10)",
                        borderColor: undefined,
                      }}
                    >
                      {/* Inner circle cho depth */}
                      <div className="absolute inset-2 rounded-full bg-white/30 border border-white/40"></div>
                      <span
                        className="font-chinese-elegant select-none pointer-events-none drop-shadow-lg text-center block w-full relative z-10 text-[#A67C52]"
                        style={{
                          fontSize: "1.1em",
                          lineHeight: 1,
                          textShadow: "0 1px 2px rgba(166,124,82,0.13)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {item.zh}
                      </span>
                    </div>
                    {/* Card info luxury, width động, luôn căn giữa, font động, padding đều */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-500 group-hover:scale-105 ${
                        isTop
                          ? "bottom-full mb-10 md:mb-16"
                          : "top-full mt-10 md:mt-16"
                      }`}
                      style={{
                        zIndex: 3,
                        animation: "fadeInUp 1s both",
                        animationDelay: `${0.2 + idx * 0.15}s`,
                        minWidth: cardMinWidth,
                        maxWidth: cardMaxWidth,
                        width: "auto",
                      }}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                    >
                      <div
                        className={`flex flex-col items-center ${cardBg} px-5 py-3 md:px-7 md:py-4 rounded-3xl ${cardShadow} border-2 ${cardBorder} text-center`}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          minWidth: cardMinWidth,
                          maxWidth: cardMaxWidth,
                          width: "auto",
                          boxSizing: "border-box",
                        }}
                      >
                        <span
                          className={`font-bold ${titleFont} mb-1 tracking-wide leading-tight whitespace-nowrap w-full block ${textColor}`}
                          style={{
                            fontSize: titleLength > 18 ? "1em" : "1.13em",
                            textAlign: "center",
                          }}
                        >
                          {item.title[lang]}
                        </span>
                        <span className="text-xs md:text-base text-[#C8A882] font-sans font-semibold bg-[#F8E1E7]/60 px-3 py-1 rounded-full whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // MOBILE TIMELINE: dọc, dot ở giữa, card trái/phải luân phiên
          <div className="relative w-full flex flex-col items-center min-h-[420px] pb-8 px-2">
            {/* Dọc: line dọc ở giữa */}
            <div
              className="absolute left-1/2 top-8 bottom-8 w-2 bg-gradient-to-b from-[#F8E1E7] via-[#F6E7C1] to-[#E7C6C6] rounded-full z-0"
              style={{ transform: "translateX(-50%)" }}
              ref={timelineBarRef}
            ></div>
            <div className="flex flex-col w-full max-w-xs mx-auto relative z-10">
              {WEDDING_TIMELINE.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                // Dot luxury
                const dotBg = [
                  "bg-[#F8E1E7]",
                  "bg-[#F6E7C1]",
                  "bg-[#F7E7CE]",
                  "bg-[#F8F6F0]",
                ][idx % 4];
                const dotBorder = [
                  "border-[#C8A882]",
                  "border-[#E7BFA5]",
                  "border-[#F6E7C1]",
                  "border-[#A67C52]",
                ][idx % 4];
                const cardBorder = [
                  "border-[#F6E7C1]",
                  "border-[#E7BFA5]",
                  "border-[#C8A882]",
                  "border-[#A67C52]",
                ][idx % 4];
                const cardShadow =
                  "shadow-[0_4px_32px_0_rgba(200,168,130,0.10),0_2px_16px_0_rgba(231,191,165,0.08)]";
                const cardBg =
                  "bg-gradient-to-br from-[#fffaf6]/90 via-[#f8f6f0]/80 to-[#f8e1e7]/90";
                const textColor = "text-[#A67C52]";
                const titleFont =
                  lang === "vi"
                    ? "font-['Noto_Serif_SC',serif]"
                    : "font-['Playfair_Display',serif]";
                const titleLength = item.title[lang].length;
                const cardMinWidth =
                  titleLength < 10 ? 120 : titleLength < 18 ? 150 : 180;
                const cardMaxWidth = titleLength < 18 ? 220 : 260;
                return (
                  <div
                    key={idx}
                    className="relative flex w-full min-h-[110px] mb-12 last:mb-0"
                  >
                    {/* Card info luxury trái/phải */}
                    <div
                      className={`flex flex-col items-${
                        isLeft ? "end" : "start"
                      } justify-center w-1/2 pr-2 pl-2`}
                      style={{ order: isLeft ? 0 : 2 }}
                    >
                      <div
                        className={`relative ${cardBg} px-4 py-3 rounded-2xl ${cardShadow} border-2 ${cardBorder} ${textColor} ${titleFont} text-sm font-bold text-right max-w-[90vw]`}
                        style={{
                          minWidth: cardMinWidth,
                          maxWidth: cardMaxWidth,
                          marginLeft: isLeft ? 0 : "auto",
                          marginRight: isLeft ? "auto" : 0,
                        }}
                        ref={(el) => {
                          cardRefs.current[idx] = el;
                        }}
                      >
                        <span>{item.title[lang]}</span>
                        <span className="block text-xs text-[#C8A882] font-sans font-semibold bg-[#F8E1E7]/60 px-2 py-0.5 rounded-full mt-1">
                          {item.time}
                        </span>
                      </div>
                    </div>
                    {/* Dot luxury ở giữa */}
                    <div
                      className="flex flex-col items-center justify-center w-0 relative"
                      style={{ order: 1 }}
                    >
                      {/* Line xiên nối dot với card info */}
                      <div
                        className="absolute"
                        style={{
                          top: "50%",
                          left: isLeft ? "calc(-50vw + 50%)" : "auto",
                          right: isLeft ? "auto" : "calc(-50vw + 50%)",
                          width: "60vw",
                          height: 0,
                          borderTop: `2px solid ${cardBorder.replace(
                            "border-",
                            "#"
                          )}`,
                          transform: isLeft
                            ? "translateY(-50%) rotate(-18deg)"
                            : "translateY(-50%) rotate(18deg)",
                          zIndex: 1,
                          opacity: 0.5,
                          display: "block",
                          maxWidth: 120,
                          minWidth: 40,
                        }}
                      ></div>
                      <div
                        className={`relative w-10 h-10 rounded-full border-4 flex items-center justify-center z-20 ${dotBg} ${dotBorder}`}
                        style={{
                          fontFamily: "Noto Serif SC, serif",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                        }}
                        ref={(el) => {
                          dotRefs.current[idx] = el;
                        }}
                      >
                        <div className="absolute inset-2 rounded-full bg-white/30 border border-white/40"></div>
                        <span
                          className="font-chinese-elegant select-none pointer-events-none drop-shadow-lg text-center block w-full relative z-10 text-[#A67C52]"
                          style={{
                            fontSize: "1.1em",
                            lineHeight: 1,
                          }}
                        >
                          {item.zh}
                        </span>
                      </div>
                      {/* Line dọc nối dot với dot tiếp theo */}
                      {idx < WEDDING_TIMELINE.length - 1 && (
                        <div className="w-1 h-10 bg-gradient-to-b from-[#E7BFA5] to-[#F6E7C1] z-0 mx-auto"></div>
                      )}
                    </div>
                    {/* Card info luxury phải/trái (ẩn) */}
                    <div
                      className="w-1/2"
                      style={{ order: isLeft ? 2 : 0 }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Particle luxury sparkle effect - cải tiến: random vị trí, màu, opacity, số lượng, hiệu ứng rõ hơn */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {dotPositions.map((pos, i) => (
            <div
              key={`timeline-dot-${i}`}
              className="timeline-dot absolute bg-[#D4AF37] rounded-full opacity-30"
              style={{
                top: `${pos.top}%`,
                left: `${pos.left}%`,
              }}
            />
          ))}
          {particlePositions.map((pos, i) => (
            <div
              key={`timeline-particle-${i}`}
              className="timeline-particle absolute text-[#D4AF37] opacity-20 font-chinese-decorative text-sm pointer-events-none"
              style={{
                top: `${pos.top}%`,
                left: `${pos.left}%`,
                animationDelay: `${pos.delay}s`,
              }}
            >
              {i % 2 === 0 ? "福" : "缘"}
            </div>
          ))}
          {dresscodeParticles.map((particle, idx) => (
            <div
              key={idx}
              className="absolute rounded-full bg-pink-200 pointer-events-none"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                animationDelay: `${particle.delay}s`,
                filter: "blur(1.5px)",
              }}
            />
          ))}
        </div>

        {/* Dresscode section - luxury, cách điệu */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#C0392B] mb-12 font-['Playfair_Display','Stay_Glory_Serif',serif] tracking-wider relative drop-shadow-lg">
            {lang === "vi" ? "DRESSCODE" : "DRESSCODE"}
            {/* Decorative underline */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-[#C8A882] to-[#E7BFA5] mt-2"></div>
          </h3>

          <div
            className={
              isMobile
                ? "flex flex-row justify-center items-stretch gap-2 w-full overflow-hidden scrollbar-thin scrollbar-thumb-[#E7BFA5]/60 scrollbar-track-transparent px-1"
                : "flex flex-wrap justify-center gap-8 md:gap-12 mt-8"
            }
          >
            {DRESSCODE.map((item, idx) => (
              <div
                key={idx}
                className={
                  isMobile
                    ? "relative flex flex-col items-center group cursor-pointer transition-all duration-500 w-[100px] min-w-[90px] min-h-[140px] mx-1"
                    : "relative flex flex-col items-center group cursor-pointer transition-all duration-500 w-[110px] md:w-[140px] min-h-[160px] md:min-h-[180px] mx-2"
                }
                style={{ minWidth: 90, minHeight: 140 }}
              >
                {/* Particle luxury sparkle quanh circle */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {Array.from({ length: 7 }).map((_, pi) => {
                    const angle = (pi / 7) * 2 * Math.PI;
                    const r = 54 + Math.random() * 8;
                    const x = 60 + Math.cos(angle) * r;
                    const y = 60 + Math.sin(angle) * r;
                    const size = 7 + Math.random() * 5;
                    const color = [
                      "#F6E7C1",
                      "#C8A882",
                      "#fffbe8",
                      "#ffe9b0",
                      "#e7bfa5",
                      "#fff",
                    ][pi % 6];
                    return (
                      <div
                        key={pi}
                        style={{
                          position: "absolute",
                          top: y,
                          left: x,
                          width: size,
                          height: size,
                          borderRadius: "50%",
                          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                          opacity: 0.7,
                          filter: "blur(1.5px)",
                          zIndex: 2,
                          pointerEvents: "none",
                          transition: "all 0.5s",
                        }}
                      ></div>
                    );
                  })}
                </div>
                {/* Pattern Trung Hoa nhỏ phía sau */}
                <svg
                  className="absolute top-8 left-1/2 -translate-x-1/2 z-0 opacity-20"
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8,46 Q27,27 46,8"
                    stroke="#C8A882"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="13"
                    cy="41"
                    r="3.5"
                    fill="#F6E7C1"
                    fillOpacity="0.7"
                  />
                </svg>
                {/* Outer glow ring */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#F8E1E7] to-[#F6E7C1] opacity-60 blur-2xl z-10 group-hover:opacity-90 transition-all duration-500"></div>
                {/* Main color circle luxury */}
                <div
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-2xl mb-4 ring-2 ring-[#C8A882] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-3xl z-20 dresscode-circle"
                  style={{
                    background: `radial-gradient(circle at 60% 40%, ${item.color} 80%, #fffbe8 100%)`,
                    boxShadow:
                      "0 8px 32px 0 rgba(200, 168, 130, 0.23), 0 2px 16px 0 rgba(0, 0, 0, 0.13)",
                  }}
                >
                  {/* Inner decorative circle */}
                  <div className="absolute inset-2 rounded-full bg-white/20 border border-white/40"></div>
                  <span
                    className="text-2xl md:text-3xl font-chinese-elegant text-white/90 drop-shadow-lg relative z-10 select-none pointer-events-none"
                    style={{
                      textShadow: "0 2px 8px #C8A882, 0 1px 0 #fff",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {idx === 0 ? "金" : idx === 1 ? "红" : "白"}
                  </span>
                </div>
                {/* Label luxury */}
                <span
                  className={
                    `font-semibold group-hover:text-[#C0392B] transition-all duration-300 tracking-wide drop-shadow-lg z-20 ` +
                    (lang === "vi"
                      ? "font-['Noto_Serif_SC',serif] "
                      : "font-['Stay_Glory_Serif','Playfair_Display',serif] ") +
                    "text-xs md:text-lg xl:text-xl"
                  }
                  style={{
                    textShadow: "0 2px 8px #F6E7C1, 0 1px 0 #fff",
                    letterSpacing: "0.06em",
                    marginTop: 8,
                    color: "#A67C52",
                    fontFamily:
                      lang === "vi"
                        ? "Noto Serif SC, serif"
                        : "Stay Glory Serif, Playfair Display, serif",
                    fontWeight: 700,
                  }}
                >
                  {item.label[lang]}
                </span>
              </div>
            ))}
          </div>

          {/* Luxury tagline thay cho text cũ */}
          <div className="mt-12 flex flex-col items-center justify-center select-none">
            {/* <span
              className={`luxury-tagline text-xl md:text-2xl font-bold tracking-wider mb-2 drop-shadow-lg ${
                lang === "vi"
                  ? "font-['Noto_Serif_SC',serif]"
                  : "font-['Stay_Glory_Serif','Playfair_Display',serif]"
              }`}
              style={{
                letterSpacing: "0.09em",
                textShadow: "0 2px 12px #F6E7C1, 0 1px 0 #fff",
                WebkitTextStroke: "0.3px #E7BFA5",
                color: "#C8A882",
                background: "none",
              }}
            >
              {lang === "vi"
                ? "Luxury Dresscode – Sắc màu đồng điệu, tôn vinh vẻ đẹp buổi tiệc"
                : "Luxury Dresscode – Elegant Harmony for the Celebration"}
            </span> */}
            {/* Icon luxury nhỏ */}
            <svg
              width="38"
              height="18"
              viewBox="0 0 38 18"
              fill="none"
              className="mt-2"
              aria-hidden="true"
            >
              <path
                d="M2 9 Q10 2 19 9 Q28 16 36 9"
                stroke="#C8A882"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="19" cy="9" r="2.5" fill="#F6E7C1" fillOpacity="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
