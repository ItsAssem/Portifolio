import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import {
  PROFILE_IMAGE_CANDIDATES,
  PROFILE_IMAGE_OBJECT_POSITION,
  PROFILE_IMAGE_SCALE,
} from "../config/profileImage";

interface ProfileImageProps {
  url?: string;
  alt: string;
}

const ProfileImage = ({ url, alt }: ProfileImageProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const candidates = url
    ? [url, ...PROFILE_IMAGE_CANDIDATES.filter((candidate) => candidate !== url)]
    : PROFILE_IMAGE_CANDIDATES;
  const [candidateIndex, setCandidateIndex] = useState(0);
  const src = candidates[candidateIndex] ?? PROFILE_IMAGE_CANDIDATES.at(-1)!;

  useEffect(() => {
    setCandidateIndex(0);
  }, [url]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || prefersReducedMotion) return;

    let lastFrame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!lastFrame) {
        lastFrame = requestAnimationFrame(() => {
          const rect = frame.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / rect.width;
          const deltaY = (e.clientY - centerY) / rect.height;
          const rotateX = deltaY * -8;
          const rotateY = deltaX * 8;

          frame.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
          lastFrame = 0;
        });
      }
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(lastFrame);
      lastFrame = 0;
      frame.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    frame.addEventListener("mousemove", handleMouseMove);
    frame.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      frame.removeEventListener("mousemove", handleMouseMove);
      frame.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(lastFrame);
    };
  }, [src, prefersReducedMotion]);

  const handleError = () => {
    setCandidateIndex((current) => {
      if (current < candidates.length - 1) {
        return current + 1;
      }
      return current;
    });
  };

  return (
    <div className="group relative w-full h-full">
      <div
        className="pointer-events-none absolute -inset-3 rounded-2xl bg-brand-primary/25 blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-75"
        aria-hidden="true"
      />

      <div
        ref={frameRef}
        className="relative h-full w-full overflow-hidden rounded-2xl border border-green-500/30 shadow-[0_8px_32px_rgba(0,223,154,0.18)] transition-[transform,box-shadow] duration-300 ease-out will-change-transform group-hover:shadow-[0_12px_40px_rgba(0,223,154,0.28)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={src}
          alt={alt}
          onError={handleError}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
          style={{
            objectPosition: PROFILE_IMAGE_OBJECT_POSITION,
            transform: `scale(${PROFILE_IMAGE_SCALE})`,
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
