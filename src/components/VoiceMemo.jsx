// src/components/VoiceMemo.jsx
import { useState } from "react";
import "../styles/VoiceMemo.css";

const VoiceMemo = ({ weather, location, onStart, onEnd }) => {
  const [speaking, setSpeaking] = useState(false);

  const playMemo = () => {
    if (!window.speechSynthesis) return alert("Speech not supported.");

    const summary = `Weather update for ${location}. Current temperature is ${weather.temp} degrees. Condition: ${weather.condition}.`;

    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.onstart = () => {
      setSpeaking(true);
      onStart?.();
    };
    utterance.onend = () => {
      setSpeaking(false);
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="voice-memo-container">
      <button
        onClick={playMemo}
        disabled={speaking}
        aria-pressed={speaking}
        aria-label="Play voice weather summary"
        className={`voice-memo-btn ${speaking ? "speaking" : ""}`}
      >
        {speaking ? "Speaking..." : "Play Voice Memo"}
      </button>
    </div>
  );
};

export default VoiceMemo;
