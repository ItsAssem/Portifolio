import React, { useState, useEffect, useRef } from "react";

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SectionNavProps {
  sections: Section[];
}

const navButtonClassName = (isActive: boolean, isDesktop: boolean) =>
  [
    "relative rounded-lg transition-all duration-200 ease-out group focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    isDesktop ? "p-8" : "p-3",
    isActive
      ? "text-emerald-400 bg-emerald-500/20 ring-1 ring-emerald-500/40"
      : "text-gray-300 hover:text-emerald-300 hover:bg-emerald-500/10",
  ].join(" ");

const SectionNav: React.FC<SectionNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const updateActiveSection = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible[0]?.target.id) {
        setActiveSection(visible[0].target.id);
      }
    };

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    observerRef.current = new IntersectionObserver(updateActiveSection, {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: isDesktop ? "-10% 0px -10% 0px" : "-72px 0px -15% 0px",
    });

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionRefs.current[section.id] = element;
        observerRef.current?.observe(element);
      }
    });

    return () => {
      const currentRefs = sectionRefs.current;
      Object.values(currentRefs).forEach((element) => {
        if (element) {
          observerRef.current?.unobserve(element);
        }
      });
    };
  }, [sections]);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <nav
        aria-label="Section navigation"
        className="hidden lg:flex fixed right-0 top-0 h-full w-32 z-50"
      >
        <div className="h-full w-full bg-black/20 border-l border-white/10 rounded-lg flex flex-col items-center justify-center py-16 space-y-20">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              id={`nav-${section.id}`}
              onClick={() => handleNavClick(section.id)}
              className={navButtonClassName(
                activeSection === section.id,
                true,
              )}
              style={{ minHeight: "44px", minWidth: "44px" }}
              aria-label={`Navigate to ${section.label}`}
              aria-current={
                activeSection === section.id ? "true" : undefined
              }
            >
              <div className="flex flex-col items-center space-y-2">
                {section.icon}
                <span className="text-sm font-medium hidden xl:block">
                  {section.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </nav>

      <nav
        aria-label="Section navigation"
        className="lg:hidden fixed left-0 right-0 top-0 z-50"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center space-x-8 bg-black/20 border-b border-white/10 rounded-lg px-6 py-3">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                id={`nav-${section.id}`}
                onClick={() => handleNavClick(section.id)}
                className={navButtonClassName(
                  activeSection === section.id,
                  false,
                )}
                style={{ minHeight: "44px", minWidth: "44px" }}
                aria-label={`Navigate to ${section.label}`}
                aria-current={
                  activeSection === section.id ? "true" : undefined
                }
              >
                <div className="flex flex-col items-center space-y-1">
                  {section.icon}
                  <span className="text-sm font-medium">{section.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SectionNav;
