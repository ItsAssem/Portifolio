// src/PetalsAnimation.tsx
import React, { useEffect } from "react";
import "./PetalAnimation.css"; // Import CSS for animations
const PetalsAnimation: React.FC = () => {
  useEffect(() => {
    const petalContainer = document.getElementById("petal-container");
    if (!petalContainer) {
      console.error("Petal container not found");
      return;
    }

    const createPetal = (isLeft: boolean) => {
      const petal = document.createElement("div");
      petal.className = `petal absolute ${isLeft ? "left-0" : "right-0"}`;
      // Randomize shade, size, opacity, and animation properties
      const shade = isLeft
        ? `rgb(${Math.floor(150 + Math.random() * 105)}, 0, 0)` // Red shades (150-255)
        : `rgb(${Math.floor(200 + Math.random() * 55)}, ${Math.floor(
            150 + Math.random() * 50
          )}, 0)`; // Golden shades
      const size = Math.random() * 1.5 + 1; // 1-2.5vw for visibility
      const animationDuration = Math.random() * 5 + 5; // 5-10s
      const animationDelay = Math.random() * 5; // 0-5s
      const startX = isLeft
        ? Math.random() * (window.innerWidth / 2 - size * 10) // Adjust for vw
        : Math.random() * (window.innerWidth / 2 - size * 10) +
          window.innerWidth / 2;

      petal.style.backgroundColor = shade;
      petal.style.width = `${size}vw`;
      petal.style.height = `${size * 2.5}vw`; // Taller oval for petal shape
      petal.style.left = `${startX}px`;
      petal.style.opacity = `${Math.random() * 0.5 + 0.5}`; // 0.5-1.0 for visibility
      petal.style.animation = `fall ${animationDuration}s linear ${animationDelay}s infinite, sway ${
        Math.random() * 2 + 2
      }s ease-in-out infinite alternate`;
      petalContainer.appendChild(petal);

      // Clean up petal
      setTimeout(() => {
        petal.remove();
      }, (animationDuration + animationDelay) * 1000);
    };

    // Create 20 petals (10 left, 10 right)
    const createPetals = () => {
      petalContainer.innerHTML = ""; // Clear existing petals
      for (let i = 0; i < 10; i++) {
        createPetal(true); // Left (red)
        createPetal(false); // Right (golden)
      }
    };

    createPetals();
    const interval = setInterval(createPetals, 5000); // Recreate every 5s

    // Handle resize
    const handleResize = () => {
      createPetals(); // Recreate petals
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="petal-container"
      className="fixed top-0 left-0 w-full h-[100dvh] pointer-events-none z-0"
    />
  );
};

export default PetalsAnimation;
