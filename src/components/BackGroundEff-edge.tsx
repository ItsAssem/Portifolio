import "./BackGroundEff-edge.css";
import "./BackGroundEff.css";
import { isEdgeBrowser } from "../utils/browserDetection";

/**
 * Conditional background effect component.
 * Renders original background for non-Edge browsers, spectrum for Edge.
 *
 * @component
 * @returns {JSX.Element} Appropriate background effect based on browser
 */
export default function BackGroundEff() {
  // Detect if user is on Edge browser
  const isEdge = isEdgeBrowser();

  if (isEdge) {
    // Return simple spectrum background for Edge
    return (
      <div className="spectrum-container">
        {/* Linear spectrum animation - Edge compatible */}
      </div>
    );
  }

  // For non-Edge browsers, return original complex background
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
