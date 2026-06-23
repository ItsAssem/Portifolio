import { FaGithub, FaLinkedin } from "react-icons/fa";
import SectionCard from "./SectionCard";

const socialLinkClassName =
  "flex flex-col items-center p-3 sm:p-4 bg-black/20 rounded-lg border border-green-500/30 hover:bg-brand-primary/20 transition-all focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const ContactMe = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center font-sans text-base relative px-2 sm:px-4 md:px-6 lg:px-8">
      <SectionCard maxWidth="sm">
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 animate-text-glow mb-2">
            Ready to talk?
          </h2>
          <p className="text-xs sm:text-sm text-center text-brand-secondary/80 px-2 leading-tight">
            Have a project in mind? Let's connect over the latest in tech!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="bg-black/20 rounded-lg p-2 sm:p-3 border border-green-500/30 hover:bg-brand-primary/20 transition-colors">
            <h3 className="text-xs sm:text-sm font-semibold text-green-400 mb-1">
              Email
            </h3>
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=assemnajjar9999@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-brand-secondary hover:text-green-300 break-all focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
            >
              assemnajjar9999@gmail.com
            </a>
          </div>

          <div className="bg-black/20 rounded-lg p-2 sm:p-3 border border-green-500/30">
            <h3 className="text-xs sm:text-sm font-semibold text-green-400 mb-1">
              Location
            </h3>
            <p className="text-xs sm:text-sm text-brand-secondary">
              Birmingham, UK
            </p>
            <p className="text-xs text-green-300">Right to work available</p>
          </div>
        </div>

        <div className="flex justify-center gap-3 sm:gap-4">
          <a
            href="https://github.com/ItsAssem"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClassName}
            aria-label="Visit GitHub profile"
          >
            <FaGithub className="w-6 h-6 sm:w-8 sm:h-8 mb-1 text-green-400" />
            <span className="text-xs sm:text-sm text-brand-secondary">
              GitHub
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/asem-najjar-a5a332240/"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClassName}
            aria-label="Visit LinkedIn profile"
          >
            <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8 mb-1 text-green-400" />
            <span className="text-xs sm:text-sm text-brand-secondary">
              LinkedIn
            </span>
          </a>
        </div>
      </SectionCard>
    </div>
  );
};

export default ContactMe;
