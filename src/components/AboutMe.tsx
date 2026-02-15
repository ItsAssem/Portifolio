import ProfileImage from "./ProfileImage";
import { ReactTyped } from "react-typed";
const pic = "/asem pfp.png";
const AboutMe = () => {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 bg-green-800/20 backdrop-blur-xl rounded-xl overflow-visible justify-items-center items-center p-4 sm:p-6 md:p-8 m-auto border border-green-500/20 shadow-inner">
        <div className="flex flex-col justify-center items-center w-full h-auto p-4 sm:p-6 md:p-8 md:order-1 order-2 md:scale-100 scale-50 animate-pulse-slow">
          <ProfileImage
            url={pic}
            alt="Assem Kanjo Alnajjar's profile picture"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full h-auto p-4 sm:p-6 md:p-8 text-center space-y-4 font-inter md:order-2 order-1">
          <header>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#14df9e] font-inter mb-2">
              Assem Kanjo Alnajjar
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#00df9a]/80 font-inter mb-4">
              B.S. Computer Engineering @ Qatar University
            </p>
          </header>

          <div className="h-12 flex items-center justify-center">
            <ReactTyped
              className="text-lg sm:text-xl md:text-2xl font-medium text-[#00df9a] font-fira-code"
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

          <p className="text-sm sm:text-base md:text-lg text-[#14df9e]/90 font-inter leading-relaxed max-w-prose">
            Computer Engineering graduate with 3+ years of experience in
            hardware-software integration, autonomous systems, and real-time
            control. Proficient in C/C++, Python, and embedded systems. Skilled
            in developing AI-driven applications and full-stack web solutions.
            Passionate about leveraging technology to solve complex problems and
            drive innovation.
          </p>

          <a
            href="https://drive.google.com/file/d/1E_iwrjTXlzQ42WGQIOcfqFM1eXshhOKI/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6"
          >
            <button className="px-6 py-3 text-sm sm:text-base font-semibold text-black bg-linear-to-r from-green-400 to-emerald-500 rounded-full border-2 border-green-500/30 shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:shadow-green-500/40 hover:from-green-500 hover:to-emerald-600 active:scale-95 animate-pulse">
              Check Resume
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
