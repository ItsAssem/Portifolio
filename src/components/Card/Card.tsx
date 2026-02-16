import React from "react";

interface Card2Props {
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
}

const Card2: React.FC<Card2Props> = ({
  title = "Cool Project",
  githubLink = "",
  description = "An awesome project that does amazing things.",
  tags = ["React"],
}) => {
  console.log("Card props:", { title, githubLink, description, tags });

  return (
    <div className="CardContainer flex flex-col justify-between bg-black/40 backdrop-blur-md h-[350px] sm:h-[400px] md:h-[500px] p-2 sm:p-3 md:p-4 w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl border-2 border-green-500/50 shadow-lg whitespace-pre-line overflow-hidden relative">
      <div className="flex flex-col gap-1 sm:gap-2 shrink-0">
        <h2 className="CardTitle text-center text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-green-400 whitespace-normal">
          {title}
        </h2>

        <div className="flex flex-wrap gap-1 sm:gap-2">
          {tags.map((tag, index) => (
            <span
              className="inline-block bg-[#00df9a]/30 text-green-300 text-xs sm:text-sm font-medium px-1 sm:px-2 py-1 rounded-full"
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-h-0">
        <p className="CardDesc overflow-y-auto text-green-100/70 leading-relaxed pr-2 text-xs sm:text-sm">
          {description}
        </p>

        {githubLink ? (
          <>
            {console.log("Rendering button for link:", githubLink)}
            <a
              className="mt-auto border-2 border-green-500/50 rounded-full px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base font-semibold text-black bg-linear-to-r from-green-400 to-emerald-500 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Project Link
            </a>
          </>
        ) : (
          <>
            {console.log("No link provided, showing placeholder")}
            <div className="mt-auto h-10 sm:h-[52px] shrink-0"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card2;
