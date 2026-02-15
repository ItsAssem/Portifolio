// src/components/ArtLink/ArtLink.tsx
import React, { useState, useEffect } from "react";
import "./ArtLink.css";

interface ArtLinkProps {
  href?: string;
  className?: string;
}

const ArtLink: React.FC<ArtLinkProps> = ({
  href = "#section-1",
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Assem";

  useEffect(() => {
    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeLetter = () => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
        // Random delay between 100-300ms for human-like typing
        const delay = Math.random() * 200 + 100;
        timeoutId = setTimeout(typeLetter, delay);
      } else {
        // Pause for 2 seconds after full text, cursor remains
        timeoutId = setTimeout(() => {
          setDisplayText("");
          index = 0;
          timeoutId = setTimeout(typeLetter, 200); // Start next cycle
        }, 2000);
      }
    };

    timeoutId = setTimeout(typeLetter, 200); // Initial delay
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <a
      href={href}
      className={`skeleton-link ${className}`}
      aria-label="Navigate to section 1"
    >
      <div className="art-link-container">
        <svg
          width="40"
          height="23"
          viewBox="0 0 90 71"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="10" width="35" height="52" fill="#000000" />
          <path
            d="M0 0V70.338H89.521V0H0ZM19.184 53.481L12.79 47.085L19.184 40.691L25.578 34.2971C25.578 34.2971 21.681 30.4 19.184 27.903C16.687 25.406 12.79 21.509 12.79 21.509L15.987 18.3115L19.184 15.114L28.7755 24.7055L38.367 34.2971L28.7755 43.889L19.184 53.481Z"
            fill="aliceblue"
          />
          <rect
            className="blinkit"
            x="45"
            y="44"
            width="29"
            height="8"
            fill="#000000"
          />
        </svg>
        <span className="art-link-text">
          {displayText}
          <span className="typing-cursor">|</span>
        </span>
      </div>
    </a>
  );
};

export default ArtLink;
