import React, { useMemo } from "react";

export type ParticleType =
  | "dot"
  | "sparkle"
  | "balloon"
  | "orn"
  | "svg"
  | "custom";

interface ParticleConfig {
  type?: ParticleType;
  style?: string;
  anim?: string;
  text?: string;
  width?: number;
  height?: number;
  color?: string;
  custom?: React.ReactNode;
  top?: number;
  left?: number;
}

interface FloatingParticlesProps {
  count?: number;
  areaClassName?: string;
  particleClassName?: string;
  type?: ParticleType;
  configs?: ParticleConfig[];
  randomize?: boolean;
  minSize?: number;
  maxSize?: number;
  color?: string;
  animationName?: string;
  zIndex?: number;
}

const defaultColors = {
  dot: "#D4AF37",
  sparkle: "#D4AF37",
  balloon: "#fffbe6",
};

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 12,
  areaClassName = "absolute inset-0 pointer-events-none",
  particleClassName = "",
  type = "dot",
  configs,
  randomize = true,
  minSize = 6,
  maxSize = 16,
  color,
  animationName = "float",
  zIndex = 0,
}) => {
  const particles = useMemo(() => {
    if (configs && configs.length > 0) return configs;
    return Array.from({ length: count }, (_, i) => {
      const size = minSize + Math.random() * (maxSize - minSize);
      const top = randomize ? Math.random() * 100 : undefined;
      const left = randomize ? Math.random() * 100 : undefined;
      return {
        type,
        style: `w-[${size}px] h-[${size}px]`,
        anim: `${animationName} ${
          randomize ? `delay-${Math.round(Math.random() * 1000)}` : ""
        }`,
        color:
          color ||
          (type in defaultColors
            ? defaultColors[type as keyof typeof defaultColors]
            : "#D4AF37"),
        width: size,
        height: size,
        key: i,
        text: undefined,
        custom: undefined,
        top,
        left,
      } as ParticleConfig;
    });
  }, [count, configs, type, minSize, maxSize, color, animationName, randomize]);

  return (
    <div className={areaClassName} style={{ zIndex }}>
      {particles.map((p, i) => {
        const hasText = typeof p.text === "string";
        const hasCustom = typeof p.custom !== "undefined";
        const posStyle =
          p.top !== undefined && p.left !== undefined
            ? {
                top: `${p.top}%`,
                left: `${p.left}%`,
                position: "absolute" as const,
              }
            : {};
        if (p.type === "orn" && hasText) {
          return (
            <div
              key={i}
              className={`${p.style} ${p.anim} ${particleClassName}`}
              style={{ color: p.color, ...posStyle }}
            >
              {p.text}
            </div>
          );
        }
        if (p.type === "svg" && hasCustom) {
          return (
            <div
              key={i}
              className={`${p.style} ${p.anim} ${particleClassName}`}
              style={{ color: p.color, ...posStyle }}
            >
              {p.custom}
            </div>
          );
        }
        if (p.type === "balloon") {
          return (
            <div
              key={i}
              className={`${p.style} ${p.anim} ${particleClassName} rounded-full bg-gradient-to-br from-[#fffbe6] via-[#C8A882] to-[#BFA980] blur-2xl`}
              style={{ width: p.width, height: p.height, zIndex, ...posStyle }}
            />
          );
        }
        if (p.type === "sparkle") {
          return (
            <div
              key={i}
              className={`${p.style} ${p.anim} ${particleClassName} rounded-full`}
              style={{
                width: p.width,
                height: p.height,
                background: p.color,
                opacity: 0.5,
                zIndex,
                ...posStyle,
              }}
            />
          );
        }
        // Default: dot
        return (
          <div
            key={i}
            className={`${p.style} ${p.anim} ${particleClassName} rounded-full`}
            style={{
              width: p.width,
              height: p.height,
              background: p.color,
              opacity: 0.5,
              zIndex,
              ...posStyle,
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingParticles;
