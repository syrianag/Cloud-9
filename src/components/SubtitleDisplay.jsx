import "../styles/SubtitleDisplay.css";

const SubtitleDisplay = ({ text, isVisible }) => {
  if (!isVisible || !text) return null;

  return (
    <div
      className="subtitle-container"
      role="status"
      aria-live="polite"
    >
      {text}
    </div>
  );
};

export default SubtitleDisplay;
