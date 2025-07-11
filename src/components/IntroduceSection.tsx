import { useEffect, useRef, useState, useMemo, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHeart } from "react-icons/fa";
import { getAllPhotoPaths } from "./photoList";

gsap.registerPlugin(ScrollTrigger);

interface IntroduceSectionProps {
  language: "vi" | "en";
  weddingDate: Date;
  content: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}

const IntroduceSection = memo(
  ({ language, weddingDate, content }: IntroduceSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    // Thêm các ref cho từng nhóm cần animate
    const titleRef = useRef<HTMLHeadingElement>(null);
    const separatorRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const countdownTitleRef = useRef<HTMLHeadingElement>(null);
    const dateLineRef = useRef<HTMLDivElement>(null);
    const countdownCardsRef = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    // Update countdown every second
    // Chỉ render floating-photo khi section xuất hiện trên màn hình, đồng thời delay animation để tối ưu INP
    const [showFloating, setShowFloating] = useState(false);
    useEffect(() => {
      const section = sectionRef.current;
      if (!section) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (window.requestIdleCallback) {
              window.requestIdleCallback(() => setShowFloating(true));
            } else {
              setTimeout(() => setShowFloating(true), 200);
            }
          } else {
            setShowFloating(false);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    }, []);
    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(timer);
    }, [weddingDate]);

    useEffect(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const animDuration = prefersReducedMotion ? 0.01 : 1;
      const animDurationLong = prefersReducedMotion ? 0.01 : 1.5;
      const ctx = gsap.context(() => {
        // Main section animation
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: animDurationLong,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Logo animation
        gsap.fromTo(
          ".wedding-logo",
          { scale: 0, rotation: 180 },
          {
            scale: 1,
            rotation: 0,
            duration: animDuration,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Countdown cards animation
        gsap.fromTo(
          ".countdown-card",
          { scale: 0, y: 100 },
          {
            scale: 1,
            y: 0,
            duration: animDuration,
            ease: "back.out(1.7)",
            stagger: prefersReducedMotion ? 0 : 0.2,
            scrollTrigger: {
              trigger: ".countdown-container",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate floating-photo (mobile): scale, opacity, rotation, debounce by group for INP
        if (!prefersReducedMotion) {
          const floatingEls = gsap.utils.toArray(".floating-photo");
          const groupSize = 4; // animate 4 at a time
          let groupIndex = 0;
          function animateGroup() {
            const group = floatingEls.slice(groupIndex, groupIndex + groupSize);
            group.forEach((el, i) => {
              // Only animate if in viewport
              const observer = new window.IntersectionObserver(
                ([entry], obs) => {
                  if (entry.isIntersecting) {
                    gsap.fromTo(
                      el as Element,
                      {
                        opacity: 0,
                        scale: 0.7,
                        rotate: gsap.getProperty(el as Element, "rotate") || 0,
                      },
                      {
                        opacity: 1,
                        scale: 1,
                        rotate: gsap.getProperty(el as Element, "rotate") || 0,
                        duration: 1.1,
                        delay: 0.15 + i * 0.08,
                        ease: "power2.out",
                        scrollTrigger: {
                          trigger: el as Element,
                          start: "top 95%",
                          toggleActions: "play none none reverse",
                        },
                      }
                    );
                    obs.disconnect();
                  }
                },
                { threshold: 0.1 }
              );
              observer.observe(el as Element);
            });
            groupIndex += groupSize;
            if (groupIndex < floatingEls.length) {
              setTimeout(animateGroup, 350); // debounce next group
            }
          }
          animateGroup();
        }

        // Enhanced Photos Flying In Animation - More dynamic and varied
        if (!prefersReducedMotion) {
          gsap.fromTo(
            ".floating-photo",
            {
              scale: 0,
              opacity: 0,
              x: (index) => {
                const positions = [
                  -600, 600, -500, 500, -400, 400, -700, 700, -450, 450, -550,
                  550, -350, 350, -650, 650, -300, 300, -750, 750,
                ];
                return positions[index % positions.length];
              },
              y: (index) => {
                const positions = [
                  -300, -250, 400, 350, -200, 450, -150, 400, -100, 350, 500,
                  -50, 300, 250, -400, 200, -350, 150, -300, 100,
                ];
                return positions[index % positions.length];
              },
              rotation: (index) => {
                const rotations = [
                  90, -90, 180, -180, 135, -135, 225, -225, 270, -270, 45, -45,
                  315, -315, 120, -120, 240, -240, 60, -60,
                ];
                return rotations[index % rotations.length];
              },
            },
            {
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
              rotation: (index) => {
                const finalRotations = [
                  -18, 25, -32, 14, 28, -22, 35, -16, -24, 31, 19, -27, 38, -33,
                  26, -29, 41, -12, 8, -6,
                ];
                return finalRotations[index % finalRotations.length];
              },
              duration: (index) => {
                const durations = [
                  1.2, 1.5, 1.8, 1.3, 1.6, 1.4, 1.7, 1.1, 1.9, 1.0, 2.0, 1.25,
                  1.75, 1.35, 1.65, 1.45, 1.55, 1.85, 1.15, 1.95,
                ];
                return durations[index % durations.length];
              },
              ease: "power3.out",
              stagger: 0.1,
              delay: 0.5,
            }
          );
        }

        // Set immediate rotation using CSS variables for testing
        gsap.set(".floating-photo", {
          "--rotation": (index: number) => {
            const finalRotations = [
              -18, 25, -32, 14, 28, -22, 35, -16, -24, 31, 19, -27, 38, -33, 26,
              -29, 41, -12, 8, -6,
            ];
            return finalRotations[index % finalRotations.length] + "deg";
          },
        });

        // Subtle floating hearts
        if (!prefersReducedMotion) {
          gsap.to(".floating-heart", {
            y: -20,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.5,
          });
        }

        // Subtle sparkle animation
        if (!prefersReducedMotion) {
          gsap.to(".sparkle", {
            scale: 1.2,
            opacity: 0.8,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.3,
          });
        }

        // Title animation
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        // Separator animation
        if (separatorRef.current) {
          gsap.fromTo(
            separatorRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: separatorRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        // Description animation
        if (descRef.current) {
          gsap.fromTo(
            descRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: descRef.current,
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        // Countdown title animation
        if (countdownTitleRef.current) {
          gsap.fromTo(
            countdownTitleRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: countdownTitleRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        // Date line animation
        if (dateLineRef.current) {
          gsap.fromTo(
            dateLineRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: dateLineRef.current,
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        // Countdown cards stagger animation
        if (countdownCardsRef.current) {
          gsap.fromTo(
            countdownCardsRef.current.querySelectorAll(".countdown-card"),
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.18,
              delay: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: countdownCardsRef.current,
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Subtle floating hearts
        gsap.to(".floating-heart", {
          y: -20,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.5,
        });

        // Subtle sparkle animation
        gsap.to(".sparkle", {
          scale: 1.2,
          opacity: 0.8,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
        });
      }, sectionRef);

      return () => ctx.revert();
    }, []);

    // Lấy danh sách ảnh từ photoList
    const photoList = useMemo(() => getAllPhotoPaths(), []);
    const mobilePositions = useMemo(
      () => [
        { top: "6%", left: "4%", rot: -12 },
        { top: "8%", right: "4%", rot: 10 },
        { bottom: "8%", left: "6%", rot: -20 },
        { bottom: "10%", right: "8%", rot: 18 },
      ],
      []
    ); // Giảm còn 4 ảnh trên mobile
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const floatingPhotos = useMemo(() => {
      if (isMobile) {
        return photoList.slice(0, 4);
      }
      return photoList.slice(0, 7);
    }, [isMobile, photoList, mobilePositions]);

    return (
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#ede8dc] to-[#e8e2d5] overflow-hidden flex flex-col justify-center"
      >
        {/* Chinese-inspired decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Traditional Chinese corner ornaments */}
          <div className="absolute top-4 left-4 w-16 h-16 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A882]">
              <path
                d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"
                fill="currentColor"
              />
              <path
                d="M15 15 L85 15 L85 25 L25 25 L25 85 L15 85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute top-4 right-4 w-16 h-16 opacity-10 rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A882]">
              <path
                d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"
                fill="currentColor"
              />
              <path
                d="M15 15 L85 15 L85 25 L25 25 L25 85 L15 85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 w-16 h-16 opacity-10 -rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A882]">
              <path
                d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"
                fill="currentColor"
              />
              <path
                d="M15 15 L85 15 L85 25 L25 25 L25 85 L15 85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 rotate-180">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A882]">
              <path
                d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"
                fill="currentColor"
              />
              <path
                d="M15 15 L85 15 L85 25 L25 25 L25 85 L15 85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Traditional Chinese cloud patterns */}
          <div className="absolute top-1/4 left-8 opacity-5">
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              className="text-[#C8A882]"
            >
              <path
                d="M10 30 Q20 10 40 20 Q60 10 70 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5 25 Q15 15 25 25 Q35 15 45 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute top-1/3 right-8 opacity-5">
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              className="text-[#C8A882]"
            >
              <path
                d="M10 30 Q20 10 40 20 Q60 10 70 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5 25 Q15 15 25 25 Q35 15 45 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Subtle bamboo-inspired vertical lines */}
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#C8A882]/10 to-transparent"></div>
          <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#C8A882]/10 to-transparent"></div>
        </div>
        {/* Enhanced Floating Photos - Overlapping and stacked naturally */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Chỉ render floating-photo khi section xuất hiện trên màn hình */}
          {showFloating &&
            floatingPhotos.map((src, idx) => {
              const pos = isMobile
                ? mobilePositions[idx % mobilePositions.length]
                : [
                    { top: "12%", left: "6%", rot: -12 },
                    { bottom: "10%", right: "8%", rot: 18 },
                    { top: "60%", left: "12%", rot: -8 },
                    { top: "22%", right: "10%", rot: 10 },
                  ][idx % 4];
              let responsiveClass = "";
              if (!isMobile) {
                if (pos.top) responsiveClass += ` xs:top-[${pos.top}]`;
                if (pos.left) responsiveClass += ` xs:left-[${pos.left}]`;
                if (pos.right) responsiveClass += ` xs:right-[${pos.right}]`;
                if (pos.bottom) responsiveClass += ` xs:bottom-[${pos.bottom}]`;
              }
              return (
                <div
                  key={idx}
                  className={`floating-photo absolute w-12 h-16 xs:w-14 xs:h-18 sm:w-16 sm:h-20 rounded-lg z-10 block${responsiveClass}`}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    bottom: pos.bottom,
                    transform: `${
                      "transform" in pos && pos.transform ? pos.transform : ""
                    } rotate(${pos.rot}deg)`,
                  }}
                >
                  <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden w-full h-full border-2 border-white/95">
                    <img
                      src={src}
                      alt="Memory"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent hidden xs:block"></div>
                  </div>
                </div>
              );
            })}

          {/* Floating photos for desktop/tablet: dynamic from getAllPhotoPaths, 8 images, with predefined positions/rotations */}
          {showFloating &&
            !isMobile &&
            photoList.slice(0, 8).map((src, idx) => {
              const desktopFloatingPositions = [
                {
                  top: "15%",
                  left: "8%",
                  rot: -10,
                  z: 10,
                  className: "hidden xs:block",
                },
                {
                  top: "8%",
                  left: "4%",
                  rot: 12,
                  z: 20,
                  className: "hidden xs:block",
                },
                {
                  top: "10%",
                  right: "6%",
                  rot: 8,
                  z: 15,
                  className: "hidden sm:block",
                },
                {
                  top: "18%",
                  right: "2%",
                  rot: -14,
                  z: 25,
                  className: "hidden sm:block",
                },
                {
                  bottom: "18%",
                  left: "2%",
                  rot: 16,
                  z: 10,
                  className: "hidden sm:block",
                },
                {
                  bottom: "12%",
                  left: "6%",
                  rot: -8,
                  z: 20,
                  className: "hidden sm:block",
                },
                {
                  bottom: "8%",
                  right: "4%",
                  rot: 10,
                  z: 15,
                  className: "hidden md:block",
                },
                {
                  top: "35%",
                  left: "2%",
                  rot: -6,
                  z: 10,
                  className: "hidden md:block",
                },
              ];
              const pos =
                desktopFloatingPositions[idx % desktopFloatingPositions.length];
              return (
                <div
                  key={src}
                  className={`floating-photo absolute transition-all duration-700 hover:scale-105 hover:z-50 z-${pos.z} block ${pos.className}`}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    bottom: pos.bottom,
                    transform: `rotate(${pos.rot}deg)`,
                  }}
                >
                  <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-28 lg:h-32 border-2 border-white/95">
                    <img
                      src={src}
                      alt="Memory"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Ultra-subtle floating elements with luxury colors */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="floating-heart absolute opacity-10 hidden xs:block"
              style={{
                top: `${25 + Math.random() * 50}%`,
                left: `${15 + Math.random() * 70}%`,
                animationDelay: `${i * 3}s`,
              }}
            >
              <FaHeart className="text-[#C8A882] text-xs md:text-sm" />
            </div>
          ))}

          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="sparkle absolute w-1 h-1 bg-[#C8A882] rounded-full opacity-15 hidden xs:block"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content - Smaller desktop spacing */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 max-w-[100vw] overflow-x-hidden">
          {/* Logo Section - Hidden on desktop with Chinese-inspired frame */}
          <div className="text-center mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:hidden">
            <div className="inline-block relative">
              {/* Traditional Chinese octagonal frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  className="text-[#C8A882] opacity-20"
                >
                  <polygon
                    points="35,10 85,10 110,35 110,85 85,110 35,110 10,85 10,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full border-2 border-[#C8A882]/30 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-lg flex items-center justify-center shadow-2xl relative z-10">
                <img
                  src="/icons/logo.png"
                  alt="Wedding Logo"
                  className="wedding-logo w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 bg-gradient-to-br from-[#C8A882] to-[#A67C52] rounded-full flex items-center justify-center shadow-lg z-20">
                <FaHeart className="text-white text-sm sm:text-base md:text-base" />
              </div>
            </div>
          </div>

          {/* Title Section - Larger desktop content without logo */}
          <div className="text-center mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-14 xl:mb-16 max-w-6xl mx-auto">
            <h2
              ref={titleRef}
              className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#4A3B2A] mb-2 xs:mb-4 sm:mb-6 md:mb-6 lg:mb-10 xl:mb-12 leading-tight font-medium ${
                language === "vi"
                  ? "font-['Noto_Serif_SC']"
                  : "font-['Stay_Glory_Serif']"
              }`}
            >
              {language === "vi"
                ? "Chúng Em Sắp Kết Hôn"
                : "We Are Getting Married"}
            </h2>
            {/* Elegant Separator - Chinese-inspired with traditional elements */}
            <div
              ref={separatorRef}
              className="flex items-center justify-center space-x-2 xs:space-x-4 sm:space-x-6 md:space-x-6 lg:space-x-10 xl:space-x-12 mb-2 xs:mb-4 sm:mb-6 md:mb-6 lg:mb-10 xl:mb-12"
            >
              <div className="flex items-center space-x-2">
                <div className="w-12 sm:w-16 md:w-18 lg:w-24 xl:w-28 h-px bg-gradient-to-r from-transparent via-[#C8A882] to-[#C8A882]/60"></div>
                {/* Traditional Chinese knot pattern */}
                <div className="w-3 h-3 border border-[#C8A882] rotate-45 opacity-60"></div>
              </div>
              <div className="relative">
                {/* Traditional Chinese double happiness symbol background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    className="text-[#C8A882]"
                  >
                    <path
                      d="M4 8 L12 8 L12 12 L20 12 L20 8 L28 8 L28 16 L20 16 L20 20 L12 20 L12 16 L4 16 Z M8 12 L8 20 L12 20 L12 24 L20 24 L20 20 L24 20 L24 12"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                {/* Chinese characters instead of ring icon */}
                <span className="text-[#C8A882] text-lg sm:text-xl md:text-xl lg:text-3xl xl:text-4xl font-['Noto_Serif_SC'] font-medium relative z-10">
                  囍
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border border-[#C8A882] rotate-45 opacity-60"></div>
                <div className="w-12 sm:w-16 md:w-18 lg:w-24 xl:w-28 h-px bg-gradient-to-l from-transparent via-[#C8A882] to-[#C8A882]/60"></div>
              </div>
            </div>

            <p
              ref={descRef}
              className={`text-xs xs:text-sm sm:text-base md:text-base lg:text-xl xl:text-2xl text-[#4A3B2A]/80 leading-relaxed max-w-4xl mx-auto px-1 xs:px-2 sm:px-4 font-light ${
                language === "vi"
                  ? "font-['Noto_Serif_SC']"
                  : "font-['Playfair_Display',serif]"
              }`}
            >
              {language === "vi"
                ? "Với niềm hạnh phúc vô bờ, chúng em xin trân trọng chia sẻ với mọi người tin vui này"
                : "With boundless happiness, we joyfully share this wonderful news with you"}
            </p>
          </div>
          {/* Countdown Section - Larger desktop text */}
          <div className="countdown-container text-center w-full max-w-5xl mx-auto mb-4 xs:mb-8 sm:mb-12 md:mb-12 lg:mb-18 xl:mb-20">
            <div className="mb-2 xs:mb-6 sm:mb-8 md:mb-8 lg:mb-12 xl:mb-14">
              <h3
                ref={countdownTitleRef}
                className={`text-base xs:text-lg sm:text-xl md:text-xl lg:text-3xl xl:text-4xl text-[#4A3B2A] mb-2 xs:mb-3 sm:mb-4 md:mb-4 lg:mb-8 xl:mb-10 font-medium ${
                  language === "vi"
                    ? "font-['Noto_Serif_SC']"
                    : "font-['Stay_Glory_Serif']"
                }`}
              >
                {language === "vi"
                  ? "Đếm Ngược Đến Ngày Trọng Đại"
                  : "Countdown to Our Big Day"}
              </h3>
              <div
                ref={dateLineRef}
                className="flex items-center justify-center space-x-1 xs:space-x-3 sm:space-x-4 md:space-x-4 lg:space-x-8 xl:space-x-10"
              >
                {/* Traditional Chinese date format with decorative elements - removed calendar icon */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#C8A882] rounded-full opacity-60"></div>
                  <span
                    className={`text-base sm:text-lg md:text-lg lg:text-2xl xl:text-3xl text-[#4A3B2A] tracking-wider font-light ${
                      language === "vi"
                        ? "font-['Noto_Serif_SC']"
                        : "font-['Playfair_Display',serif]"
                    }`}
                  >
                    09 . 08 . 2025
                  </span>
                  <div className="w-2 h-2 bg-[#C8A882] rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
            {/* Countdown Cards - Larger desktop size */}
            <div
              ref={countdownCardsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-4 lg:gap-8 xl:gap-10 px-1 xs:px-2 sm:px-4"
            >
              {[
                {
                  label: content.days,
                  value: timeLeft.days.toString().padStart(2, "0"),
                },
                {
                  label: content.hours,
                  value: timeLeft.hours.toString().padStart(2, "0"),
                },
                {
                  label: content.minutes,
                  value: timeLeft.minutes.toString().padStart(2, "0"),
                },
                {
                  label: content.seconds,
                  value: timeLeft.seconds.toString().padStart(2, "0"),
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="countdown-card relative bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-3xl xl:rounded-3xl p-4 sm:p-5 md:p-5 lg:p-8 xl:p-10 shadow-xl border border-[#C8A882]/20 hover:bg-white/90 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 overflow-hidden">
                    {/* Chinese-inspired corner decorations */}
                    <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-[#C8A882]/30"></div>
                    <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-[#C8A882]/30"></div>
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-[#C8A882]/30"></div>
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-[#C8A882]/30"></div>

                    <div className="countdown-number text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-[#4A3B2A] mb-2 sm:mb-3 md:mb-3 lg:mb-5 xl:mb-6 tracking-wide relative z-10">
                      {item.value}
                    </div>
                    <div
                      className={
                        `text-sm sm:text-base md:text-base lg:text-lg xl:text-xl text-[#4A3B2A]/70 uppercase tracking-wider font-light relative z-10 ` +
                        (language === "en"
                          ? "font-['Playfair_Display',serif]"
                          : "font-['Noto_Serif_SC']")
                      }
                    >
                      {item.label}
                    </div>

                    {/* Subtle traditional pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full bg-gradient-to-br from-[#C8A882]/20 via-transparent to-[#C8A882]/10"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default IntroduceSection;
