import { useState, Suspense, lazy } from "react";
import "./App.css";
import WeddingLoading from "./components/WeddingLoading";

const WelcomePage = lazy(() => import("./components/WelcomePage"));
const MainLandingPage = lazy(() => import("./pages/MainLandingPage"));

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleOpenInvitation = () => {
    setShowWelcome(false);
    // TODO: Navigate to main landing page
    console.log("Opening main invitation...");
  };

  return (
    <div className="min-h-screen">
      <Suspense fallback={<WeddingLoading />}>
        {showWelcome ? (
          <WelcomePage onOpen={handleOpenInvitation} />
        ) : (
          <MainLandingPage />
        )}
      </Suspense>
    </div>
  );
}

export default App;
