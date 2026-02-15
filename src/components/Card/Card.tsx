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
    <div className="CardContainer group flex w-full min-w-[350px] max-w-[420px] flex-col justify-between rounded-2xl border border-green-400/20 bg-black/40 p-6 backdrop-blur-md whitespace-pre-line overflow-hidden drop-shadow-[0_0_18px_rgba(34,197,94,0.18)] hover:drop-shadow-[0_0_26px_rgba(34,197,94,0.26)] transition-[filter,transform] duration-300">
      <div>
        <h2 className="CardTitle text-center text-lg sm:text-xl md:text-2xl font-bold text-green-200 mb-4 whitespace-normal">
          {title}
        </h2>

        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag, index) => (
            <span
              className="inline-block rounded-full border border-green-400/15 bg-green-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-green-200/90 hover:bg-green-500/15 transition-colors"
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="CardDesc overflow-auto text-sm sm:text-base leading-relaxed text-green-100/70">
          {description}
        </p>
      </div>
      <a
        className="mt-6 inline-flex items-center justify-center rounded-2xl border border-green-400/25 bg-green-500/5 px-4 py-2 text-center text-sm sm:text-base font-semibold text-green-200 shadow-[0_0_16px_rgba(34,197,94,0.18)] transition-[box-shadow,transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-green-500/10 hover:shadow-[0_0_26px_rgba(34,197,94,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
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
