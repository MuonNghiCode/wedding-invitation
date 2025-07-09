import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { getAllPhotoPaths } from "./photoList";
import { FixedSizeGrid as Grid } from "react-window";

const ALL_PHOTOS = getAllPhotoPaths();
const PHOTOS = ALL_PHOTOS.slice(0, 12);

const LANG = {
  vi: {
    album: "The Album Ảnh",
    of: "của",
    love: "Love",
    album2: "Thư Viện Ảnh",
    love2: "Tình Yêu",
    viewAll: "Xem tất cả ảnh",
    close: "Đóng thư viện ảnh",
  },
  en: {
    album: "The Album Photo",
    of: "of",
    love: "Love",
    album2: "Gallery",
    love2: "Love",
    viewAll: "View All Photos",
    close: "Close Gallery",
  },
} as const;

type LangKey = keyof typeof LANG;

// Định nghĩa biến toàn cục cho window để tránh lỗi typescript
declare global {
  interface Window {
    __galleryWaveAnimated?: boolean;
  }
}
if (
  typeof window !== "undefined" &&
  window.__galleryWaveAnimated === undefined
) {
  window.__galleryWaveAnimated = false;
}

function GallerySection({ lang = "vi" }: { lang?: LangKey }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const t = LANG[lang] || LANG.vi;
  const overlayPreloaded = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Preload 12 ảnh đầu khi load trang
  useEffect(() => {
    if (typeof window !== "undefined") {
      PHOTOS.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, []);

  // Khi overlay mở, preload toàn bộ ảnh còn lại (nếu chưa preload)
  useEffect(() => {
    if (
      showOverlay &&
      typeof window !== "undefined" &&
      !overlayPreloaded.current
    ) {
      ALL_PHOTOS.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
      overlayPreloaded.current = true;
    }
  }, [showOverlay]);

  useEffect(() => {
    if (showOverlay && typeof window !== "undefined") {
      // Import gsap động để tránh lỗi SSR nếu có
      import("gsap").then((gsapModule) => {
        const gsap = gsapModule.gsap;
        const items = Array.from(
          document.querySelectorAll('[id^="overlay-photo-"]')
        );
        // Tính toán hiệu ứng wave từ giữa ra
        const mid = Math.floor(items.length / 2);
        const order = [];
        for (let i = 0; i < items.length; i++) {
          const left = mid - i;
          const right = mid + i;
          if (left >= 0) order.push(left);
          if (right < items.length && right !== left) order.push(right);
        }
        const orderedItems = order.map((idx) => items[idx]).filter(Boolean);
        gsap.to(orderedItems, {
          scale: 1,
          opacity: 1,
          stagger: 0.07,
          duration: 0.55,
          ease: "back.out(1.7)",
          delay: 0.1,
        });
      });
    }
  }, [showOverlay]);

  // Hiệu ứng wave GSAP cho virtual grid
  useEffect(() => {
    if (showOverlay && typeof window !== "undefined") {
      import("gsap").then((gsapModule) => {
        const gsap = gsapModule.gsap;
        const items = Array.from(
          document.querySelectorAll('[id^="overlay-photo-"] img')
        );
        if (!items.length) return;
        // @ts-ignore
        if (!window.__galleryWaveAnimated) {
          const mid = Math.floor(items.length / 2);
          const order = [];
          for (let i = 0; i < items.length; i++) {
            const left = mid - i;
            const right = mid + i;
            if (left >= 0) order.push(left);
            if (right < items.length && right !== left) order.push(right);
          }
          const orderedItems = order.map((idx) => items[idx]).filter(Boolean);
          gsap.set(items, { scale: 0.7, opacity: 0 });
          gsap.to(orderedItems, {
            scale: 1,
            opacity: 1,
            stagger: 0.07,
            duration: 0.55,
            ease: "back.out(1.7)",
            delay: 0.1,
            // @ts-ignore
            onComplete: () => {
              window.__galleryWaveAnimated = true;
            },
          });
        } else {
          gsap.set(items, { scale: 1, opacity: 1 });
        }
      });
    } else if (!showOverlay && typeof window !== "undefined") {
      // @ts-ignore
      window.__galleryWaveAnimated = false;
    }
  }, [showOverlay]);

  // Animation cho từng ảnh gallery chính (fade-in từng ảnh, KHÔNG fade section)
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap").then((gsapModule) => {
        const gsap = gsapModule.gsap;
        import("gsap/ScrollTrigger").then((stModule) => {
          gsap.registerPlugin(stModule.ScrollTrigger);
          const items = Array.from(
            document.querySelectorAll('[id^="main-gallery-photo-"]')
          );
          if (!items.length) return;
          gsap.set(items, { opacity: 0, y: 40 });
          items.forEach((el, i) => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });
          });
        });
      });
    }
  }, []);

  // Utility để random col/row span và style cho từng ảnh
  function getRandomBentoStyle(idx: number) {
    // Để giữ layout đẹp, random nhưng có kiểm soát
    const colSpanArr = [1, 2, 3];
    const rowSpanArr = [1, 2];
    // Đảm bảo ảnh đầu và cuối luôn lớn hơn
    const colSpan =
      idx === 0 || idx === 11
        ? 3
        : colSpanArr[Math.floor(Math.random() * colSpanArr.length)];
    const rowSpan =
      idx === 0 || idx === 11
        ? 2
        : rowSpanArr[Math.floor(Math.random() * rowSpanArr.length)];
    // Random border, shadow, bo góc
    const borderStyles = [
      "border-4 border-double border-[#C8A882] rounded-tl-[3rem] shadow-[0_0_32px_8px_rgba(200,168,130,0.18)]",
      "border-2 border-dashed border-[#C0392B] rounded-br-[2.5rem] shadow-lg",
      "border-2 border-[#C8A882] rounded-bl-[2.5rem] shadow-xl",
      "border border-[#C8A882] rounded-2xl shadow-md",
      "border-2 border-[#D4AF37] rounded-tr-[2rem] shadow-gold",
      "border-2 border-[#C0392B] rounded-bl-[2rem] shadow-red-500/30",
    ];
    const borderClass =
      borderStyles[Math.floor(Math.random() * borderStyles.length)];
    return {
      colSpan,
      rowSpan,
      borderClass,
    };
  }

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-[60vh] px-2 md:px-8 py-8 bg-gradient-to-bl from-[#e8e2d5] via-[#ede8dc] to-[#f8f6f0] relative overflow-x-hidden"
      id="gallery"
    >
      {/* Luxury Title (song ngữ) */}
      <div className="text-center pt-12 pb-8">
        <div className="text-3xl md:text-5xl font-['Playfair_Display','Stay_Glory_Serif','Cormorant_Garamond',serif] font-bold text-[#A67C52] tracking-wide">
          {t.album2}
        </div>
        <div className="text-2xl md:text-4xl font-serif mt-2 text-[#C8A882] flex flex-col items-center">
          <span className="font-['Great_Vibes','Fabregas',cursive] text-3xl md:text-4xl text-[#A67C52] mx-2">
            {t.of}
          </span>
          <span className="font-['Playfair_Display','Stay_Glory_Serif','Cormorant_Garamond',serif] text-[#4A3B2A]">
            {t.love2}
          </span>
        </div>
      </div>
      {/* Chinese pattern background luxury - pattern chìm */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-0 select-none">
        <img
          src="/image/film-pattern.png"
          alt="film pattern background"
          className="w-full h-full absolute inset-0 object-cover opacity-10 blur-md mix-blend-luminosity filter sepia-[0.7] hue-rotate-[40deg] brightness-125 saturate-150"
          draggable="false"
          aria-hidden="true"
        />
        {/* Chinese character pattern chìm */}
        <div
          className="absolute left-8 top-8 text-[5vw] md:text-6xl font-chinese-elegant text-[#C8A882] opacity-20 select-none pointer-events-none"
          style={{ letterSpacing: "0.2em" }}
        >
          {" "}
          囍 福 爱 缘
        </div>
        <div
          className="absolute right-8 bottom-8 text-[4vw] md:text-5xl font-chinese-elegant text-[#A67C52] opacity-15 select-none pointer-events-none"
          style={{ letterSpacing: "0.2em" }}
        >
          百年好合 永结同心
        </div>
      </div>
      {/* Gallery Bento luxury layout - bento lộn xộn, đậm chất Trung Hoa */}
      <div className="relative mx-auto max-w-[98vw] md:max-w-[1800px] pb-8">
        {/* Floating particles luxury - nhiều hơn */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#D4AF37] rounded-full opacity-70 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animation: `float ${
                  3 + Math.random() * 3
                }s ease-in-out infinite alternate`,
              }}
            />
          ))}
          {/* Thêm particle đỏ Trung Hoa */}
          {[...Array(12)].map((_, i) => (
            <div
              key={100 + i}
              className="absolute w-2 h-2 bg-[#C0392B] rounded-full opacity-60 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animation: `float ${
                  4 + Math.random() * 3
                }s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
        {/* Bento grid luxury, lộn xộn, đậm chất Trung Hoa */}
        <div className="relative z-20 grid grid-cols-2 md:grid-cols-7 gap-8 auto-rows-[180px] md:auto-rows-[260px] lg:auto-rows-[340px]">
          {PHOTOS.map((src, idx) => {
            // Random bento style mỗi lần render
            const { colSpan, rowSpan, borderClass } = getRandomBentoStyle(idx);
            // Ánh xạ col/row span thành class cố định để Tailwind nhận diện
            const colSpanClass =
              colSpan === 1
                ? "col-span-1"
                : colSpan === 2
                ? "col-span-2"
                : "col-span-3";
            const rowSpanClass = rowSpan === 1 ? "row-span-1" : "row-span-2";
            let className = `group overflow-hidden bg-[#ede8dc] relative transition-transform duration-300 hover:scale-[1.04] hover:shadow-gold ${colSpanClass} ${rowSpanClass} ${borderClass}`;
            let imgClass =
              "w-full h-full object-cover group-hover:scale-105 group-hover:opacity-95 transition-all duration-500 drop-shadow-xl";
            // Accent Chinese: thêm chữ Trung Hoa nổi bật trên 1 số ảnh
            const chineseAccent =
              idx % 5 === 0 ? (
                <div className="absolute left-2 top-2 text-xl md:text-2xl font-chinese-elegant text-[#C0392B] opacity-70 select-none pointer-events-none">
                  囍
                </div>
              ) : idx % 7 === 0 ? (
                <div className="absolute right-2 bottom-2 text-lg md:text-xl font-chinese-elegant text-[#C8A882] opacity-60 select-none pointer-events-none">
                  福
                </div>
              ) : null;
            // Accent particle vàng/đỏ random
            const accentParticle =
              Math.random() > 0.5 ? (
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full opacity-80 animate-pulse"></div>
              ) : (
                <div className="absolute top-2 left-2 w-2 h-2 bg-[#C0392B] rounded-full opacity-70 animate-pulse"></div>
              );
            return (
              <div
                key={src}
                id={`main-gallery-photo-${idx}`}
                className={className}
              >
                <img
                  src={src}
                  alt={`Ảnh cưới ${idx + 1}`}
                  className={imgClass}
                  loading="eager"
                  decoding="async"
                />
                {/* Gold/Red particle accent */}
                {accentParticle}
                {/* Chinese accent */}
                {chineseAccent}
              </div>
            );
          })}
        </div>
      </div>
      {/* View All trigger as text link */}
      <div className="flex justify-center mt-8">
        <span
          className={
            lang === "vi"
              ? "text-lg md:text-xl font-sans font-semibold text-[#A67C52] underline underline-offset-4 cursor-pointer hover:text-[#C8A882] transition-colors duration-200 select-none"
              : "text-lg md:text-xl font-serif text-[#A67C52] underline underline-offset-4 cursor-pointer hover:text-[#C8A882] transition-colors duration-200 select-none"
          }
          onClick={() => setShowOverlay(true)}
        >
          {t.viewAll}
        </span>
      </div>
      {/* Overlay modal - virtual scroll grid */}
      {showOverlay && (
        <>
          <div
            className="fixed inset-0 z-[101] bg-black/0 backdrop-blur-[6px] transition-all duration-300"
            onClick={() => setShowOverlay(false)}
          />
          <div className="fixed inset-0 z-[102] flex items-center justify-center">
            {/* Nút tắt overlay */}
            <button
              className="fixed top-6 right-8 z-[200] bg-[#A67C52] text-white rounded-full w-12 h-12 flex items-center justify-center text-3xl shadow-lg hover:bg-[#C8A882] transition-all duration-300"
              onClick={() => setShowOverlay(false)}
              aria-label={t.close}
              style={{ pointerEvents: "auto" }}
            >
              ×
            </button>
            <Grid
              columnCount={window.innerWidth < 640 ? 2 : 5}
              rowCount={Math.ceil(
                ALL_PHOTOS.length / (window.innerWidth < 640 ? 2 : 5)
              )}
              columnWidth={
                window.innerWidth < 640
                  ? Math.floor(window.innerWidth / 2)
                  : Math.floor(window.innerWidth / 5)
              }
              rowHeight={
                window.innerWidth < 640
                  ? Math.floor(window.innerHeight / 3.2)
                  : Math.floor(window.innerHeight / 2.1)
              }
              height={window.innerHeight}
              width={window.innerWidth}
              style={{ outline: "none", background: "none" }}
              children={({
                columnIndex,
                rowIndex,
                style,
              }: {
                columnIndex: number;
                rowIndex: number;
                style: React.CSSProperties;
              }) => {
                const colCount = window.innerWidth < 640 ? 2 : 5;
                const idx = rowIndex * colCount + columnIndex;
                if (idx >= ALL_PHOTOS.length) return null;
                return (
                  <div
                    id={`overlay-photo-${idx}`}
                    className="w-full h-full flex items-center justify-center"
                    style={style}
                  >
                    <img
                      src={ALL_PHOTOS[idx]}
                      alt={`Ảnh cưới ${idx + 1}`}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                );
              }}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default GallerySection;
