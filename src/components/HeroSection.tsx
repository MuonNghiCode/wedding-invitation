import { forwardRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";

interface HeroSectionProps {
  language: "vi" | "en";
  content: {
    brideName: string;
    groomName: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDate: string;
    heroDescription: string;
    heroLocation: string;
    countdownTitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  weddingDate: Date;
}

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>((_, ref) => {
  // Removed countdown functionality since it's not needed in the simplified design

  useEffect(() => {
    // Hero content animations with 3D parallax effect
    const tl = gsap.timeline();

    // Animate the background layers with 3D perspective
    gsap.fromTo(
      ".couple-image",
      {
        scale: 1.2,
        opacity: 0,
        y: 50,
        rotationY: 10,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 2.5,
        ease: "power4.out",
        delay: 0.5,
      }
    );

    // Animate content sections
    tl.fromTo(
      ".hero-title",
      { y: -80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
    )
      .fromTo(
        ".hero-subtitle",
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".countdown-container",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3"
      );

    // Subtle parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxSpeed = 0.3;

      if (window.innerWidth > 768) {
        // Only on desktop for performance
        gsap.to(".couple-image", {
          y: scrollY * parallaxSpeed,
          duration: 0.1,
          ease: "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function
    return () => {
      tl.kill();
      gsap.killTweensOf(".couple-image");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array - chỉ chạy một lần

  // Tối ưu vị trí các element động chỉ random 1 lần nếu có
  const floralPositions = useMemo(
    () => [
      { top: "20%", left: "25%" },
      { bottom: "36px", right: "25%" },
    ],
    []
  );

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Layer (Clear, Sharp, Main Focus) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/backgrounds/hero-background.JPG"
          alt="Wedding Background"
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.85) saturate(1.1) contrast(1.1)",
            objectPosition: "center 25%",
          }}
        />
        {/* Light overlay để vẫn thấy màu đỏ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
        {/* Text protection zones nhẹ hơn */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
      </div>

      {/* 3D Effect: Enhanced Floating Couple Image */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="relative w-full h-full">
          <div
            className="couple-image absolute inset-0"
            style={{
              perspective: "1500px",
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src="/backgrounds/hero-background-removebg.png"
              alt="Wedding Couple"
              className="w-full h-full object-cover"
              style={{
                filter: `
                    drop-shadow(0 40px 80px rgba(0,0,0,0.6)) 
                    drop-shadow(0 20px 40px rgba(0,0,0,0.4))
                  `,
                transform: "translateZ(30px) rotateY(1deg)",
                transition: "all 0.3s ease-out",
                objectPosition: "center 25%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Content Overlay - Modern Typography Design */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        {/* Bottom Section: Modern Typography Names */}
        <div className="pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Luxury Typography - Stay Glory Serif Mobile-First */}
            <div className="text-center relative">
              {/* Mobile-First Design - Names Stacked Left-Aligned */}
              <div className="block lg:hidden">
                <div className="relative w-full px-2 flex flex-col items-start justify-start pl-4">
                  {/* Mobile layout: Stacked names căn trái, full width, với spacing rất lớn */}
                  <div className="relative w-full">
                    {/* THUAN - Full width, căn sát trái */}
                    <h1
                      className="text-6xl sm:text-7xl md:text-8xl text-white font-normal tracking-wide w-full block"
                      style={{
                        fontFamily:
                          "'Stay Glory Serif', 'Libre Baskerville', serif",
                        textShadow:
                          "0 10px 30px rgba(0,0,0,0.9), 0 5px 15px rgba(0,0,0,0.8), 0 0 25px rgba(212,175,55,0.3)",
                        letterSpacing: "0.25em",
                        fontWeight: "400",
                        textTransform: "uppercase",
                        textAlign: "left",
                        lineHeight: "1",
                        marginLeft: "0",
                        paddingLeft: "0",
                        marginBottom: "0.3rem",
                      }}
                    >
                      THUAN
                    </h1>

                    {/* HUONG với & bên trái - Improved Mobile Layout với khoảng cách lớn */}
                    <div className="relative w-full">
                      {/* Container for perfect alignment - đẩy qua phải một chút */}
                      <div className="relative flex items-center justify-start pl-0 sm:pl-4">
                        {/* Artistic Ampersand - Positioned perfectly with HUONG, size lớn hơn, ngang hàng */}
                        <div
                          className="relative flex-shrink-0 self-center"
                          style={{ marginTop: "0" }}
                        >
                          <div className="relative">
                            {/* Gold backdrop circle */}
                            <div
                              className="absolute inset-0 w-14 h-14 sm:w-18 sm:h-18 bg-gradient-radial from-[#D4AF37]/20 to-transparent rounded-full"
                              style={{
                                transform: "translate(-20%, -40%)",
                                left: "50%",
                                top: "50%",
                              }}
                            ></div>
                            <span
                              className="text-5xl sm:text-6xl md:text-7xl text-[#D4AF37] font-normal relative z-40 block"
                              style={{
                                fontFamily:
                                  "'Fabregas', 'Great Vibes', cursive",
                                textShadow:
                                  "0 12px 36px rgba(0,0,0,0.9), 0 6px 18px rgba(212,175,55,0.6), 0 0 30px rgba(212,175,55,0.5)",
                                fontWeight: "400",
                                transform: "rotate(-8deg) scale(1.2)",
                                filter:
                                  "drop-shadow(0 0 25px rgba(212,175,55,0.7))",
                                lineHeight: "1",
                                marginRight: "0.5rem",
                                textAlign: "left",
                              }}
                            >
                              &
                            </span>
                          </div>
                        </div>

                        {/* HUONG - Positioned next to & with perfect alignment */}
                        <div className="flex-1">
                          <h1
                            className="text-6xl sm:text-7xl md:text-8xl text-white font-normal tracking-wide block"
                            style={{
                              fontFamily:
                                "'Stay Glory Serif', 'Libre Baskerville', serif",
                              textShadow:
                                "0 10px 30px rgba(0,0,0,0.9), 0 5px 15px rgba(0,0,0,0.8), 0 0 25px rgba(212,175,55,0.3)",
                              letterSpacing: "0.25em",
                              fontWeight: "400",
                              textTransform: "uppercase",
                              textAlign: "left",
                              lineHeight: "1",
                              marginLeft: "-0.2em",
                            }}
                          >
                            HUONG
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout - Elegant Horizontal with Chinese Elements */}
              <div className="hidden lg:block">
                <div className="flex items-center justify-center space-x-8 xl:space-x-12">
                  <h1
                    className="text-6xl xl:text-7xl 2xl:text-8xl text-white font-normal tracking-wide"
                    style={{
                      fontFamily:
                        "'Stay Glory Serif', 'Libre Baskerville', serif",
                      textShadow:
                        "0 10px 30px rgba(0,0,0,0.8), 0 5px 15px rgba(0,0,0,0.6), 0 0 25px rgba(212,175,55,0.2)",
                      letterSpacing: "0.12em",
                      fontWeight: "400",
                      textTransform: "uppercase",
                    }}
                  >
                    THUAN
                  </h1>

                  {/* Artistic Ampersand - Desktop with Chinese ornament */}
                  <div className="relative">
                    {/* Chinese ornamental background */}
                    <div
                      className="absolute inset-0 w-24 h-24 xl:w-28 xl:h-28 bg-gradient-radial from-[#D4AF37]/15 to-transparent rounded-full"
                      style={{
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        top: "50%",
                      }}
                    ></div>
                    <span
                      className="text-8xl xl:text-9xl 2xl:text-[10rem] text-[#D4AF37] font-normal"
                      style={{
                        fontFamily: "'Fabregas', 'Great Vibes', cursive",
                        textShadow:
                          "0 15px 45px rgba(0,0,0,0.8), 0 8px 24px rgba(212,175,55,0.5), 0 0 40px rgba(212,175,55,0.4)",
                        transform: "translateY(0.18em) rotate(-5deg)",
                        fontWeight: "400",
                        filter: "drop-shadow(0 0 30px rgba(212,175,55,0.6))",
                        position: "relative",
                        top: "0.3em",
                      }}
                    >
                      &
                    </span>
                  </div>

                  <h1
                    className="text-6xl xl:text-7xl 2xl:text-8xl text-white font-normal tracking-wide"
                    style={{
                      fontFamily:
                        "'Stay Glory Serif', 'Libre Baskerville', serif",
                      textShadow:
                        "0 10px 30px rgba(0,0,0,0.8), 0 5px 15px rgba(0,0,0,0.6), 0 0 25px rgba(212,175,55,0.2)",
                      letterSpacing: "0.12em",
                      fontWeight: "400",
                      textTransform: "uppercase",
                    }}
                  >
                    HUONG
                  </h1>
                </div>
              </div>

              {/* Chinese-Style Decorative Elements */}
              <div className="mt-6 sm:mt-8 flex justify-center">
                <div className="flex items-center space-x-6">
                  {/* Left flourish with Chinese pattern */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[#D4AF37] opacity-70 font-chinese-decorative">
                      龍
                    </span>
                    <div
                      className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]/40"
                      style={{
                        boxShadow: "0 1px 3px rgba(212,175,55,0.3)",
                      }}
                    ></div>
                  </div>

                  {/* Center ornament - Double happiness symbol */}
                  <div className="relative">
                    <span
                      className="text-2xl sm:text-3xl text-[#D4AF37] opacity-90 font-chinese-decorative"
                      style={{
                        filter: "drop-shadow(0 3px 8px rgba(212,175,55,0.5))",
                        textShadow: "0 0 15px rgba(212,175,55,0.4)",
                      }}
                    >
                      囍
                    </span>
                    {/* Subtle glow background */}
                    <div className="absolute inset-0 text-2xl sm:text-3xl text-[#D4AF37] opacity-30 font-chinese-decorative blur-sm">
                      囍
                    </div>
                  </div>

                  {/* Right flourish with Chinese pattern */}
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]/40"
                      style={{
                        boxShadow: "0 1px 3px rgba(212,175,55,0.3)",
                      }}
                    ></div>
                    <span className="text-sm text-[#D4AF37] opacity-70 font-chinese-decorative">
                      鳳
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Romantic Elements Only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
        {/* Minimal floral background elements */}
        {floralPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              ...pos,
              animation:
                i === 0
                  ? "romantic-float 8s ease-in-out infinite 0.5s"
                  : "gentle-sway 10s ease-in-out infinite 2.5s",
            }}
          >
            <span
              className={
                i === 0 ? "text-3xl text-[#D4AF37]" : "text-4xl text-white"
              }
              style={{ fontFamily: "'Stay Glory Serif', serif" }}
            >
              {i === 0 ? "\u2740" : "\u273f"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
