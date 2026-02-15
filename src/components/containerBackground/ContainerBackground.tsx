import React, { useEffect } from "react";

/**
 * Interface defining the props for the ContainerBackground component.
 */
interface ContainerBackgroundProps {
  /** The content to be rendered inside the container. */
  children: React.ReactNode;
  /** The CSS height value for the component (e.g., '500px' or '100vh'). Defaults to '100%'. */
  height?: string;
  /** Optional CSS class names to apply to the wrapper. */
  className?: string;
}

/**
 * A reusable container component that renders an animated gradient
 * background and moving wave effects.
 */
const ContainerBackground: React.FC<ContainerBackgroundProps> = ({
  children,
  height = "100%",
  className = "",
}) => {
  // Injecting keyframes and specific wave CSS to the document head
  useEffect(() => {
    const styles = `
      /* --- WRAPPER STYLES --- */
      .animated-bg-wrapper {
        position: relative; 
        width: 100%;
        overflow: hidden; /* Clips the wave overflow */
      }
      
      /* --- ANIMATED BACKGROUND CONTAINER (LOCALIZED) --- */
      .local-animated-bg {
        position: absolute; 
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0; /* Background layer */
        
        /* Animated Gradient Background */
        background: linear-gradient(315deg, rgba(101,0,94,1) 3%, rgba(60,132,206,1) 38%, rgba(48,238,226,1) 68%, rgba(255,25,25,1) 98%);
        animation: local-gradient 15s ease infinite;
        background-size: 400% 400%;
        /* Fixed attachment creates a subtle parallax effect when scrolling the whole page */
        background-attachment: fixed; 
      }

      /* Keyframe for the Gradient */
      @keyframes local-gradient {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }

      /* Wave Styles */
      .local-wave-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 12em; /* Fixed height for waves */
        z-index: 1; /* Above the gradient, below content */
        pointer-events: none; /* Allows clicks to pass through */
      }

      .local-wave {
        background: rgb(255 255 255 / 25%);
        border-radius: 1000% 1000% 0 0;
        position: absolute; 
        width: 200%;
        height: 100%;
        animation: local-wave 10s -3s linear infinite;
        transform: translate3d(0, 0, 0);
        opacity: 0.8;
        bottom: 0;
        left: 0;
      }

      .local-wave:nth-of-type(2) {
        bottom: -1.25em;
        animation: local-wave 18s linear reverse infinite;
        opacity: 0.8;
      }

      .local-wave:nth-of-type(3) {
        bottom: -2.5em;
        animation: local-wave 20s -1s reverse infinite;
        opacity: 0.9;
      }

      /* Keyframe for the Wave motion */
      @keyframes local-wave {
        0% { transform: translateX(0); }
        25% { transform: translateX(-25%); }
        50% { transform: translateX(-50%); }
        75% { transform: translateX(-25%); }
        100% { transform: translateX(0); }
      }
      
      /* --- CHILDREN CONTENT WRAPPER --- */
      .animated-bg-content {
        position: relative;
        z-index: 2; /* Ensures children appear above waves and gradient */
        width: 100%;
        height: 100%;
      }
    `;

    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Cleanup function
    return () => {
      // Clean up the injected styles when the component unmounts
      const existingStyle = document.querySelector("style");
      if (existingStyle && document.head.contains(existingStyle)) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <div
      className={`animated-bg-wrapper ${className}`}
      style={{ height: height }}
    >
      {/* Background Layer */}
      <div className="local-animated-bg" />

      {/* Wave Layer */}
      <div className="local-wave-container">
        <div className="local-wave"></div>
        <div className="local-wave"></div>
        <div className="local-wave"></div>
      </div>

      {/* Children Content Layer */}
      <div className="animated-bg-content">{children}</div>
    </div>
  );
};

export default ContainerBackground;
