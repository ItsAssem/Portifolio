import React from "react";

interface Card2Props {
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
}

const Card2: React.FC<Card2Props> = ({
  title = "Cool Project",
  githubLink = "https://github.com/ItsAssem",
  description = "An awesome project that does amazing things.",
  tags = ["React"],
}) => {
  return (
    <div className="CardContainer flex flex-col justify-center bg-black/40 backdrop-blur-md max-h-50dvh outline-1 p-8 min-h-3/4 h-120 w-full max-w-md rounded-2xl border-2 border-green-500/50 shadow-lg whitespace-pre-line animate-liquid-glow drop-shadow-[0_0_25px_rgba(34,197,94,0.4)] mx-4 my-4">
      <div>
        <h2 className="CardTitle text-center grow text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-3 animate-text-glow whitespace-normal">
          {title}
        </h2>

        {tags.map((tag, index) => (
          <span
            className="inline-block bg-[#00df9a]/30 text-green-300 text-xs sm:text-sm font-medium p-1 m-1  rounded-full hover:bg-green-800/40 backdrop-blur-sm"
            key={index}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 justify-center">
        <p className="CardDesc grow overflow-auto text-green-100/70 leading-relaxed">
          {description}
        </p>
      </div>
      <a
        className="mt-auto border-2 text-center border-green-500/50 rounded-2xl px-3 py-1.5 text-green-400 hover:scale-105 transition-all duration-300 bg-green-900/20 backdrop-blur-sm hover:bg-green-800/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Project Link
      </a>
    </div>
  );
};

export default Card2;
