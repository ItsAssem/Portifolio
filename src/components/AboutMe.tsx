import ProfileImage from "./ProfileImage";
import SectionCard from "./SectionCard";
import { ReactTyped } from "react-typed";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { PROFILE_IMAGE_URL } from "../config/profileImage";

const ROLE_STRINGS = [
  "Computer Engineer",
  "Software Developer",
  "Full Stack Developer",
  "AI Systems Engineer",
];

const AboutMe = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="w-full flex flex-col justify-center items-center px-2 sm:px-4 md:px-6 lg:px-8">
      <SectionCard maxWidth="md">
        <div className="flex flex-col md:flex-row justify-center items-center w-full gap-2 sm:gap-3 md:gap-4">
          <div className="flex justify-center items-center w-full md:w-2/5 lg:w-1/3 p-1 sm:p-2 md:p-3">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64">
              <ProfileImage
                url={PROFILE_IMAGE_URL}
                alt="Assem Kanjo Alnajjar - Computer Engineering Portfolio"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full md:w-3/5 lg:w-2/3 text-center space-y-1 sm:space-y-2 md:space-y-3 p-1 sm:p-2 md:p-3">
            <header className="space-y-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 font-sans">
                Assem Kanjo Alnajjar
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-brand-primary/80 font-sans">
                B.S. Computer Engineering @ Qatar University
              </p>
            </header>

            <div className="h-4 sm:h-6 md:h-8 flex items-center justify-center">
              {prefersReducedMotion ? (
                <span className="text-xs sm:text-sm md:text-base font-medium text-brand-primary font-mono">
                  {ROLE_STRINGS[0]}
                </span>
              ) : (
                <ReactTyped
                  className="text-xs sm:text-sm md:text-base font-medium text-brand-primary font-mono"
                  strings={ROLE_STRINGS}
                  loop
                  typeSpeed={80}
                  backSpeed={40}
                />
              )}
            </div>

            <p className="text-xs sm:text-sm md:text-base text-brand-secondary/90 font-sans leading-tight max-w-prose">
              Computer Engineering graduate with 3+ years experience in
              hardware-software integration, autonomous systems, and real-time
              control.
            </p>

            <a
              href="https://drive.google.com/file/d/1VqCtc-iQqmC68K9sttW5FYS-vQqnvU2v/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-3 inline-block px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-black bg-linear-to-r from-green-400 to-emerald-500 rounded-full border border-green-500/30 shadow-md shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Resume
            </a>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default AboutMe;
