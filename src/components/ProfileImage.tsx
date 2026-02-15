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
      "(prefers-reduced-motion: reduce)",
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
      className="animate-shadow-glow mx-auto w-20 h-20 sm:w-52 sm:h-52 md:w-78 md:h-78 rounded-2xl object-cover object-center border-2 border-green-500/50 ring-2 sm:ring-3 md:ring-4 ring-green-500 ring-opacity-75 shadow-lg shadow-green-500/50 transition-transform duration-200 ease-out hover:shadow-xl hover:shadow-green-500/75 active:scale-95 backdrop-blur-sm"
    />
  );
};

export default ProfileImage;
