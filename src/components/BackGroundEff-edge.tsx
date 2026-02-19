import "./BackGroundEff-edge.css";
import "./BackGroundEff.css";
import { useState, useEffect } from "react";
import WateryBackground from "./WateryBackground";

/**
 * Responsive background effect component.
 * Renders spectrum gradient on mobile, watery effect on tablet, and original grid animation on desktop.
 *
 * @component
 * @returns {JSX.Element} Appropriate background effect based on screen size
 */
export default function BackGroundEff() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Check screen size and categorize device
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    // Initial check
    checkDevice();

    // Listen for window resize
    window.addEventListener("resize", checkDevice);

    // Cleanup
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isMobile) {
    // Return spectrum background for mobile
    return (
      <div className="spectrum-container">
        {/* Linear spectrum animation - mobile optimized */}
      </div>
    );
  }

  if (isTablet) {
    // Return watery background for tablet (and as an option for testing)
    return <WateryBackground lowPowerMode={true} />;
  }

  // For desktop, return watery background (can switch to grid if needed)
  return <WateryBackground />;
}
