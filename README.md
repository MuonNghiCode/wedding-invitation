# Wedding Invitation React App

A modern, customizable wedding invitation website built with React, TypeScript, and Vite. Inspired by Chinese minimalist design, this template features smooth animations, responsive layouts, and multi-language support.

---

## 📂 Project Structure

```
├── public/
│   ├── backgrounds/           # Hero background images
│   │   ├── hero-background-removebg.png
│   │   └── hero-background.JPG
│   ├── decorations/           # Decorative bamboo patterns
│   │   ├── bamboo-parttern-removebg-preview.png
│   │   └── bamboo-parttern2-removebg-preview.png
│   ├── font/                  # Custom fonts (Fabregas, Stay Glory Serif)
│   ├── icons/                 # Logo images (PNG, SVG)
│   ├── image/                 # (Empty or for future use)
│   ├── music/                 # Background music (wedding-music.mp3)
│   ├── photos/                # Wedding photos (T-51.JPG, T-89.JPG)
│   ├── humans.txt, robots.txt, sitemap.xml, site.webmanifest, _headers, _redirects
│   └── ...
├── src/
│   ├── assets/
│   │   └── img/               # Duplicated images for React import
│   ├── components/            # React components
│   │   ├── Footer.tsx
│   │   ├── GallerySection.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── IntroduceSection.tsx
│   │   ├── LoveStorySection.tsx
│   │   ├── photoList.ts
│   │   ├── TimelineSection.tsx
│   │   ├── WeddingDetailsSection.tsx
│   │   └── WelcomePage.tsx
│   ├── pages/
│   │   └── MainLandingPage.tsx
│   ├── App.tsx, main.tsx, App.css, index.css, vite-env.d.ts
│   └── ...
├── .vscode/, dist/, node_modules/, .gitignore, package.json, tsconfig*.json, vite.config.ts, eslint.config.js, index.html
└── README.md
```

---

## ✨ Features

- **3D Welcome Envelope** with GSAP animation and parallax bamboo background
- **Hero Section** with countdown timer and glassmorphism UI
- **Smooth scroll-triggered animations**
- **Background music** with auto-play, loop, and toggle controls
- **Multi-language support** (Vietnamese/English, Chinese typography)
- **Responsive design** for all devices
- **SEO optimized**

---

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- React Icons
- Cloudinary (optional, for image management)

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MuonNghiCode/wedding-invitation.git
   cd wedding-invitation
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```
5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 🖼️ Customization Guide

- **Hero background:** Replace images in `public/backgrounds/`
- **Logo:** Replace files in `public/icons/`
- **Bamboo patterns:** Replace files in `public/decorations/`
- **Music:** Replace `public/music/wedding-music.mp3` (MP3, 3-5 min recommended)
- **Photos:** Add or replace images in `public/photos/`
- **Fonts:** Add custom fonts to `public/font/` and update CSS if needed

---

## 📱 Technical Highlights

- Mobile-first, responsive layout
- GSAP-powered animations
- Multi-language and Chinese typography support
- Countdown timer to wedding date
- SEO best practices

---

## 👤 Author

Developed by [Phạm Minh Quân](https://github.com/MuonNghiCode)

---

## 📄 License

MIT License — Free for personal and commercial use.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.
