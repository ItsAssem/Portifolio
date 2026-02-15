import React, { useRef, useEffect } from "react";

interface ProfileImageProps {
  url: string;
  alt: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ url, alt }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    let lastFrame = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Simple throttle using requestAnimationFrame
      if (!lastFrame) {
        lastFrame = requestAnimationFrame(() => {
          const rect = img.getBoundingClientRect();
          const imgCenterX = rect.left + rect.width / 2;
          const imgCenterY = rect.top + rect.height / 2;
          const deltaX = e.clientX - imgCenterX;
          const deltaY = e.clientY - imgCenterY;
          const rotateX = (deltaY / rect.height) * -15;
          const rotateY = (deltaX / rect.width) * 15;
          img.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          lastFrame = 0;
        });
      }
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(lastFrame);
      lastFrame = 0;
      img.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg)";
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!prefersReducedMotion) {
      img.addEventListener("mousemove", handleMouseMove);
      img.addEventListener("mouseleave", handleMouseLeave);
    }

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
      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/320")}
      className="animate-shadow-glow mx-auto w-16 h-16 sm:w-40 sm:h-40 md:w-60 md:h-60 rounded-full object-cover object-center border-2 border-transparent ring-2 sm:ring-3 md:ring-4 ring-red-500 ring-opacity-75 shadow-md shadow-red-500/50 transition-transform duration-200 ease-out hover:shadow-lg active:scale-95"
    />
  );
};

export default ProfileImage;
