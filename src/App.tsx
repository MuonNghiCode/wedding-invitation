import { useState, Suspense, lazy } from "react";
import "./App.css";

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
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center text-xl">
            Loading...
          </div>
        }
      >
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
