import type { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg";
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
};

const SectionCard = ({
  children,
  className = "",
  maxWidth = "md",
}: SectionCardProps) => {
  return (
    <div
      className={`section-card w-full ${maxWidthClasses[maxWidth]} ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionCard;
