import { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import MainLandingPage from "./pages/MainLandingPage";

import "./App.css";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleOpenInvitation = () => {
    setShowWelcome(false);
    // TODO: Navigate to main landing page
    console.log("Opening main invitation...");
  };

  return (
    <div className="min-h-screen">
      {showWelcome ? (
        <WelcomePage onOpen={handleOpenInvitation} />
      ) : (
        <MainLandingPage />
      )}
    </div>
  );
}

export default App;
