import { FaGithub, FaLinkedin } from "react-icons/fa";

const ContactMe = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center font-serif text-base relative px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Mobile-First Compact Contact Card */}
      <div className="w-full max-w-3xl bg-green-800/20 backdrop-blur-xl rounded-xl p-3 sm:p-4 md:p-6 m-2 sm:m-4 border-2 border-green-300 animate-shadow-glow">
        {/* Header - Ultra Compact */}
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 animate-text-glow mb-2">
            Ready to talk?
          </h2>
          <p className="text-xs sm:text-sm text-center text-[#14df9e]/80 px-2 leading-tight">
            Have a project in mind? Let's connect over the latest in tech!
          </p>
        </div>

        {/* Contact Info - Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {/* Email - Compact */}
          <div className="bg-black/20 rounded-lg p-2 sm:p-3 border border-green-500/30 hover:bg-[#00df9a]/20 transition-colors">
            <h3 className="text-xs sm:text-sm font-semibold text-green-400 mb-1">
              Email
            </h3>
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=assemnajjar9999@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-[#14df9e] hover:text-green-300 break-all"
            >
              assemnajjar9999@gmail.com
            </a>
          </div>

          {/* Location - Compact */}
          <div className="bg-black/20 rounded-lg p-2 sm:p-3 border border-green-500/30">
            <h3 className="text-xs sm:text-sm font-semibold text-green-400 mb-1">
              Location
            </h3>
            <p className="text-xs sm:text-sm text-[#14df9e]">Birmingham, UK</p>
            <p className="text-xs text-green-300">Right to work Available</p>
          </div>
        </div>

        {/* Social Links - Compact Row */}
        <div className="flex justify-center gap-3 sm:gap-4">
          {/* GitHub - Compact */}
          <a
            href="https://github.com/ItsAssem"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-3 sm:p-4 bg-black/20 rounded-lg border border-green-500/30 hover:bg-[#00df9a]/20 transition-all hover:scale-105"
          >
            <FaGithub size={24} className="sm:size-32 mb-1 text-green-400" />
            <span className="text-xs sm:text-sm text-[#14df9e]">GitHub</span>
          </a>

          {/* LinkedIn - Compact */}
          <a
            href="https://www.linkedin.com/in/asem-najjar-a5a332240/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-3 sm:p-4 bg-black/20 rounded-lg border border-green-500/30 hover:bg-[#00df9a]/20 transition-all hover:scale-105"
          >
            <FaLinkedin size={24} className="sm:size-32 mb-1 text-green-400" />
            <span className="text-xs sm:text-sm text-[#14df9e]">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
