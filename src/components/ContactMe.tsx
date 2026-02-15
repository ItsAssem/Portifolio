import { FaGithub, FaLinkedin } from "react-icons/fa";

const ContactMe = () => {
  return (
    <div className="SCREEN w-full h-full flex justify-center items-center align-middle font-serif text-base relative ">
      <div className="flex flex-col h-auto max-w-3xl border-2 p-5 m-5 gap-3 border-green-300   justify-center align-middle  animate-shadow-glow relative rounded-2xl bg-green-800/20 backdrop-blur-xl">
        <div className=" ROW1Box flex flex-col  ">
          <h2 className="  text-3xl font-bold text-center text-green-700 m-auto py-3 animate-text-glow">
            Ready to talk?
          </h2>
          <p className="text-center px-3">
            Have a project in mind, a role to fill, or just want to connect over
            the latest in tech? Drop me a line—I'm always excited to hear new
            ideas.
          </p>
        </div>
        <div className="ROW2BOX h-auto relative flex flex-col  justify-evenly p-3 gap-3 mask-right-auto">
          <div className=" relative hover:border-l-5 hover:bg-[#00df9a]/50 border-green-300 delay-100 rounded-2xl flex  flex-col justify-center align-middle items-center  sm:flex-row sm:justify-start sm:align-bottom sm:items-baseline ">
            <h2 className="">Email: </h2>
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=assemnajjar9999@gmail.com"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer"
            >
              <p className=" px-3 wrap-anywhere break-all">
                assemnajjar9999@gmail.com
              </p>
            </a>
          </div>
          <div className="relative hover:border-l-5 hover:bg-[#00df9a]/50 border-green-300 delay-100 rounded-2xl flex  flex-col justify-center align-middle items-center  sm:flex-row sm:justify-start sm:align-bottom sm:items-baseline">
            <h2 className=""> Location:</h2>
            <p className="px-3">Birmingham, UK (Right to work Available)</p>
          </div>
        </div>
        <div className="ROW3 w-full flex flex-col sm:flex-row place-content-center justify-center align-middle items-center gap-5 p-3 ">
          <div className="  w-1/2 sm:w-2/5 lg:w-1/4 border-2 flex flex-col justify-center items-center align-middle p-5 rounded-2xl  hover:scale-105 transition-transform  animate-shadow-glow hover:bg-[#00df9a]/50">
            <a
              href="https://github.com/ItsAssem"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer"
            >
              <FaGithub size={50} />
              <span>GitHub</span>
            </a>
          </div>
          <div className=" w-1/2 sm:w-2/5 lg:w-1/4 border-2 flex flex-col  justify-center items-center align-middle p-5 rounded-2xl hover:scale-105 transition-transform  animate-shadow-glow hover:bg-[#00df9a]/50">
            <a
              href="https://www.linkedin.com/in/asem-najjar-a5a332240/"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer"
            >
              <FaLinkedin size={50} />
              <span>Linkedin</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
