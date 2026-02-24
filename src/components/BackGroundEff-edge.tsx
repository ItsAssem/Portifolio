import "./BackGroundEff-edge.css";
import "./BackGroundEff.css";
import WateryBackground from "./WateryBackground";

/**
 * Responsive background effect component.
 * Renders spectrum gradient on mobile, watery effect on tablet, and original grid animation on desktop.
 *
 * @component
 * @returns {JSX.Element} Appropriate background effect based on screen size
 */
export default function BackGroundEff() {
  console.log("BackGroundEff: Component mounting!");

  // TEMPORARY: Always show WateryBackground for testing
  return <WateryBackground />;
}
