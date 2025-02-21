import React, { useState } from 'react';
import SetupScreen from "./components/SetupScreen";
import DebateTimer from "./components/DebateTimer";

function App() {
  const [debateData, setDebateData] = useState(null);

  const handleSetupComplete = (data) => {
    setDebateData(data);
  };

  return (
    <div>
      {debateData ? (
        <DebateTimer debateTitle={debateData.debateTitle} speakers={debateData} />
      ) : (
        <SetupScreen onSetupComplete={handleSetupComplete} />
      )}
    </div>
  );
}

export default App;