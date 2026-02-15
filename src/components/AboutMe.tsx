import ProfileImage from "./ProfileImage";
import { ReactTyped } from "react-typed";
import pic from "/asem pfp.png";

const AboutMe = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center ">
      <div className=" animate-shadow-glow w-11/12 sm:w-3/4 md:w-2/3 max-w-7xl box-content size-100 sm:size-120 md:h-xl max-h-xl grid grid-cols-1 md:grid-cols-2 bg-[#000000]/30 backdrop-blur-sm rounded-xl overflow-visible justify-items-center items-center bg-gr2ay-900  p-4 sm:p-6 md:p-8 m-auto shadow-lg shadow-green-500/50">
        <div className="flex flex-col justify-center items-center w-full h-auto p-4 sm:p-6 md:p-8">
          <ProfileImage
            url={pic}
            alt="Assem Kanjo Alnajjar's profile picture"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full h-auto p-4 sm:p-6 md:p-8 text-center space-y-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#14df9e] font-sans">
            Assem Kanjo Alnajjar
          </p>
          <ReactTyped
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00df9a] font-sans"
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
          <p className="text-sm sm:text-base md:text-lg text-[#14df9e] font-sans leading-relaxed max-w-prose">
            Computer Engineering graduate with 3+ years of experience in
            hardware-software integration, autonomous systems, and real-time
            control. Proficient in C/C++, Python, and embedded systems. Skilled
            in developing AI-driven applications and full-stack web solutions.
            Passionate about leveraging technology to solve complex problems and
            drive innovation.
          </p>
          <a
            href="https://drive.google.com/file/d/1E_iwrjTXlzQ42WGQIOcfqFM1eXshhOKI/view?usp=sharing"
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer"
          >
            <button className="relative top-3 mt-4 w-32 sm:w-40 h-12 rounded-full border-2 border-amber-300 bg-amber-400 text-black font-bold transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Check Resume
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
