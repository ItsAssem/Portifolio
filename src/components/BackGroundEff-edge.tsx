import "./BackGroundEff-edge.css";
import "./BackGroundEff.css";
import { useState, useEffect } from "react";

/**
 * Responsive background effect component.
 * Renders spectrum gradient on mobile devices and original grid animation on desktop.
 *
 * @component
 * @returns {JSX.Element} Appropriate background effect based on screen size
 */
export default function BackGroundEff() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen size is mobile (768px and below)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Listen for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    // Return spectrum background for mobile
    return (
      <div className="spectrum-container">
        {/* Linear spectrum animation - mobile optimized */}
      </div>
    );
  }

  // For desktop, return original complex background
  return (
    <div className="grid-container">
      <div className="plane">
        <div className="grid"></div>
        <div className="glow"></div>
      </div>
      <div className="plane">
        <div className="grid"></div>
        <div className="glow"></div>
      </div>
    </div>
  );
}
