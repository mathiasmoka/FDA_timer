import { useState, useEffect } from "react";
import Button from "./ui/button.js";
import "./DebateTimer.css";

const bellSound = new Audio("/bell.mp3");

bellSound.addEventListener('error', (e) => {
  console.error('Error loading audio file:', e);
});

bellSound.addEventListener('canplaythrough', () => {
  console.log('Audio file loaded successfully');
});

export default function DebateTimer({ debateTitle, speakers }) {
  const [timeLeft, setTimeLeft] = useState(300); // 7 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [currentRole, setCurrentRole] = useState("Prime Minister");
  const [poiStatus, setPoiStatus] = useState("Closed");
  const [currentTeam, setCurrentTeam] = useState("government");

  const roles = [
    "Prime Minister",
    "First Speaker",
    "Second Speaker",
    "Third Speaker",
    "Whip"
  ];

  const playBellSound = () => {
    bellSound.play().catch((error) => {
      console.error('Error playing audio file:', error);
    });
  };

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 61 || prev === 1 || (prev < 0 && prev % 15 === 0)) {
          playBellSound();
        }
        if (prev > 300 || prev <= 60) {
          setPoiStatus("Closed");
        } else {
          setPoiStatus("Open");
        }
        return prev > 0 ? prev - 1 : prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleNextSpeaker = () => {
    let nextIndex = currentSpeakerIndex;
    let nextTeam = currentTeam === "government" ? "opposition" : "government";
  
    // Incrémenter l'index seulement après le passage à l'opposition
    if (currentTeam === "opposition") {
      nextIndex += 1;
    }
  
    // Si on atteint la fin de la liste, on revient au premier orateur
    if (nextIndex >= roles.length) {
      nextIndex = 0;
    }
  
    // Mettre à jour les états
    setCurrentSpeakerIndex(nextIndex);
    setCurrentRole(roles[nextIndex]);
    setCurrentTeam(nextTeam);
    
    // Réinitialiser le temps et mettre le chrono en pause
    setTimeLeft(300);
    setIsRunning(false);
  };  

  const currentSpeaker = currentTeam === "government" 
    ? speakers.government[currentSpeakerIndex] 
    : speakers.opposition[currentSpeakerIndex];

  return (
    <div className="container">
      <div className="progress-bar">
      <div className="progress" style={{ width: `${(timeLeft / 300) * 100}%` }}></div>
      </div>
      <h1 className="debate-title">{debateTitle}</h1>
      <h1 className="timer">
        {formatTime(timeLeft)}
      </h1>
      <h2 className={`team ${currentTeam === "government" ? "team-government" : "team-opposition"}`}>
        {currentTeam.charAt(0).toUpperCase() + currentTeam.slice(1)}
      </h2>
      <h2 className="role">
        {currentRole} - {currentSpeaker}
      </h2>
      <div className="poi-status">
        <span className={`poi-indicator ${poiStatus.toLowerCase()}`}></span>
        POI Status: {poiStatus}
      </div>
      <div className="flex space-x-6">
        <Button
          className="button button-start"
          onClick={() => {
            setIsRunning(!isRunning);
            if (!isRunning) {
              playBellSound(); // Play sound when starting the timer
            }
          }}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          className="button button-reset"
          onClick={() => {
            setTimeLeft(300); // Reset time
            setIsRunning(false); // Pause the timer
          }}
        >
          Reset
        </Button>
        <Button
          className="button button-next"
          onClick={handleNextSpeaker}
        >
          Next Speaker
        </Button>
      </div>
    </div>
  );
}