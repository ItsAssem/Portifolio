import React, { useRef, useEffect } from "react";

/**
 * Props for the ProfileImage component
 * @interface ProfileImageProps
 * @property {string} url - URL of the profile image to display
 * @property {string} alt - Alt text for accessibility and SEO
 */
interface ProfileImageProps {
  url: string;
  alt: string;
}

/**
 * ProfileImage component - Interactive profile picture with 3D mouse tracking effects.
 *
 * Features responsive sizing, glassmorphism styling, and accessibility considerations.
 * Includes mouse-tracking 3D rotation effects with respect for user's motion preferences.
 *
 * @component
 * @param {ProfileImageProps} props - Component props
 * @returns {JSX.Element} Rendered profile image with interactive effects
 *
 * @example
 * ```tsx
 * <ProfileImage
 *   url="/path/to/profile.jpg"
 *   alt="Assem Kanjo Alnajjar's profile picture"
 * />
 * ```
 */
const ProfileImage: React.FC<ProfileImageProps> = ({ url, alt }) => {
  // Reference to the image DOM element for 3D effect calculations
  const imgRef = useRef<HTMLImageElement>(null);

  /**
   * Sets up 3D mouse tracking effect for the profile image.
   * Calculates rotation based on mouse position relative to image center.
   * Respects user's motion preferences for accessibility.
   */
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Track last animation frame to prevent performance issues
    let lastFrame = 0;

    /**
     * Handles mouse movement over the image to create 3D rotation effect.
     * Uses requestAnimationFrame for smooth 60fps animations.
     *
     * @param {MouseEvent} e - Mouse movement event
     */
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle animations to prevent performance issues
      if (!lastFrame) {
        lastFrame = requestAnimationFrame(() => {
          // Calculate image center coordinates for rotation calculations
          const rect = img.getBoundingClientRect();
          const imgCenterX = rect.left + rect.width / 2;
          const imgCenterY = rect.top + rect.height / 2;

          // Calculate distance from mouse to image center
          const deltaX = e.clientX - imgCenterX;
          const deltaY = e.clientY - imgCenterY;

          // Convert mouse position to rotation angles (max 15 degrees)
          const rotateX = (deltaY / rect.height) * -15;
          const rotateY = (deltaX / rect.width) * 15;

          // Apply 3D transformation with perspective
          img.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          lastFrame = 0;
        });
      }
    };

    /**
     * Resets image rotation when mouse leaves the image area.
     * Cancels any pending animation frames for clean state reset.
     */
    const handleMouseLeave = () => {
      cancelAnimationFrame(lastFrame);
      lastFrame = 0;
      img.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg)";
    };

    // Check if user prefers reduced motion for accessibility
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Only add mouse tracking if user doesn't prefer reduced motion
    if (!prefersReducedMotion) {
      img.addEventListener("mousemove", handleMouseMove);
      img.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup event listeners and animation frames on unmount
    return () => {
      img.removeEventListener("mousemove", handleMouseMove);
      img.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(lastFrame);
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={url}
      alt={alt}
      // Fallback to placeholder if image fails to load
      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/320")}
      // Responsive sizing: matches container dimensions, square with rounded edges
      // Glassmorphism effect with green theme matching website design
      className="animate-shadow-glow mx-auto w-full h-full rounded-2xl object-cover object-center border-2 border-green-500/50 ring-2 sm:ring-3 md:ring-4 ring-green-500 ring-opacity-75 shadow-lg shadow-green-500/50 transition-transform duration-200 ease-out hover:shadow-xl hover:shadow-green-500/75 active:scale-95 backdrop-blur-sm"
    />
  );
};

export default ProfileImage;
