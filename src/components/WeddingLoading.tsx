import React from "react";

// Elegant wedding-themed loading spinner
const WeddingLoading: React.FC = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-bl from-[#e8e2d5] via-[#ede8dc] to-[#f8f6f0]">
    <div className="relative mb-6">
      {/* Animated ring with floral accent */}
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#C8A882] border-opacity-60"></div>
      <img
        src="/icons/logo.png"
        alt="Wedding Logo"
        className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg"
        style={{ filter: "drop-shadow(0 2px 8px #C8A88288)" }}
        draggable="false"
      />
    </div>
    <div className="text-[#A67C52] text-2xl font-serif tracking-wide animate-pulse">
      Đang tải lời mời cưới...
    </div>
  </div>
);

export default WeddingLoading;
