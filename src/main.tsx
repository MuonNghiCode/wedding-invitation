import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();
console.log("Vercel Speed Insights initialized.");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
