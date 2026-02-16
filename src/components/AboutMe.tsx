import ProfileImage from "./ProfileImage";
import { ReactTyped } from "react-typed";

// Profile picture URL for hero section
const profilePictureUrl = "/asem pfp.png";
const AboutMe = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Mobile-First Compact Design */}
      <div className="w-full max-w-5xl bg-green-800/20 backdrop-blur-xl rounded-xl justify-items-center items-center p-2 sm:p-3 md:p-4 lg:p-6 m-4 sm:m-6 border border-green-500/30 shadow-lg">
        {/* Mobile: Stacked Layout | Desktop: Side-by-Side */}
        <div className="flex flex-col md:flex-row justify-center items-center w-full gap-2 sm:gap-3 md:gap-4">
          {/* Profile Image - Mobile Compact | Desktop Contained */}
          <div className="flex justify-center items-center w-full md:w-2/5 lg:w-1/3 p-1 sm:p-2 md:p-3">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-lg overflow-hidden">
              <ProfileImage
                url={profilePictureUrl}
                alt="Assem Kanjo Alnajjar - Computer Engineering Portfolio"
              />
            </div>
          </div>

          {/* Content - Mobile Compact | Desktop Balanced */}
          <div className="flex flex-col justify-center items-center w-full md:w-3/5 lg:w-2/3 text-center space-y-1 sm:space-y-2 md:space-y-3 p-1 sm:p-2 md:p-3">
            {/* Header - Compact */}
            <header className="space-y-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 font-inter">
                Assem Kanjo Alnajjar
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-[#00df9a]/80 font-inter">
                B.S. Computer Engineering @ Qatar University
              </p>
            </header>

            {/* Typed Text - Compact */}
            <div className="h-4 sm:h-6 md:h-8 flex items-center justify-center">
              <ReactTyped
                className="text-xs sm:text-sm md:text-base font-medium text-[#00df9a] font-fira-code"
                aria-live="polite"
                strings={[
                  "Computer Engineer",
                  "Software Developer",
                  "Full Stack Developer",
                  "AI Systems Engineer",
                ]}
                loop
                typeSpeed={80}
                backSpeed={40}
              />
            </div>

            {/* Bio - Compact */}
            <p className="text-xs sm:text-sm md:text-base text-[#14df9e]/90 font-inter leading-tight max-w-prose">
              Computer Engineering graduate with 3+ years experience in
              hardware-software integration, autonomous systems, and real-time
              control.
            </p>

            {/* Resume Button - Compact */}
            <a
              href="https://drive.google.com/file/d/1E_iwrjTXlzQ42WGQIOcfqFM1eXshhOKI/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-3"
            >
              <button className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-black bg-linear-to-r from-green-400 to-emerald-500 rounded-full border border-green-500/30 shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:shadow-green-500/40 active:scale-95">
                Resume
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
