// src/components/TypingAnimation/TypingAnimation.tsx
import React, { useState, useEffect } from "react";
import "./TypingAnimation.css"; // Plain CSS for styling

interface TypingAnimationProps {
  strings?: string[]; // Custom strings
  className?: string; // Optional classes
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  strings = ["CSS typed this string!", "It typed this one too 😱", "Enjoy ☕"],
  className = "",
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const typeSpeed = 80; // ms per char (aggressive)
  const deleteSpeed = 60; // ms per delete
  const pauseTime = 1000; // 1s pause after full text

  useEffect(() => {
    const currentString = strings[currentStringIndex];

    if (!isDeleting && text === currentString) {
      // Pause then start deleting
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      // Finished deleting, move to next string
      setIsDeleting(false);
      setCurrentStringIndex((prev) => (prev + 1) % strings.length);
      return;
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const nextText = isDeleting
      ? currentString.slice(0, -1)
      : currentString.slice(0, text.length + 1);

    const timeout = setTimeout(() => setText(nextText), speed);
    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    currentStringIndex,
    strings,
    typeSpeed,
    deleteSpeed,
    pauseTime,
  ]);

  return (
    <div className={`typing-container ${className}`}>
      <span className="typing-text">{text}</span>
      <span className="typing-cursor">|</span>
    </div>
  );
};

export default TypingAnimation;
