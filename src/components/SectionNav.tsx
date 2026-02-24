import React, { useState, useEffect, useRef } from "react";
import { Home, Code, Mail } from "lucide-react";

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SectionNavProps {
  sections: Section[];
}

const SectionNav: React.FC<SectionNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // Setup Intersection Observer for performance
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when section is 50% visible
        rootMargin: "-10% 0px -10% 0px", // Slightly expand detection area
      },
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionRefs.current[section.id] = element;
        observerRef.current?.observe(element);
      }
    });

    return () => {
      // Cleanup observer
      Object.values(sectionRefs.current).forEach((element) => {
        if (element) {
          observerRef.current?.unobserve(element);
        }
      });
    };
  }, [sections]);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll to section
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Top Right, Full Height */}
      <div className="hidden lg:flex fixed right-0 top-0 h-full w-32 z-50">
        <div className="h-full w-full bg-emerald-500/5 backdrop-blur-sm border-r border-white/10 rounded-lg flex flex-col items-center justify-center py-8 space-y-8">
          {/* Navigation Icons */}
          {sections.map((section) => (
            <button
              key={section.id}
              id={`nav-${section.id}`}
              onClick={() => handleNavClick(section.id)}
              className={`
                relative p-6 rounded-lg transition-all duration-200 ease-out group
                ${
                  activeSection === section.id
                    ? "text-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/50"
                    : "text-gray-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                }
              `}
              style={{ minHeight: "44px", minWidth: "44px" }} // Mobile touch targets
              aria-label={`Navigate to ${section.label}`}
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
      </div>

      {/* Mobile Header - Centered, Full Width */}
      <div className="lg:hidden fixed left-0 right-0 top-0 z-50">
        <div className="flex items-center justify-center w-full">
          <div className="relative">
            {/* Navigation Icons */}
            <div className="flex items-center justify-center space-x-6 bg-emerald-500/5 backdrop-blur-sm border-b border-white/10 rounded-lg px-6 py-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  id={`nav-${section.id}`}
                  onClick={() => handleNavClick(section.id)}
                  className={`
                    relative p-4 rounded-lg transition-all duration-200 ease-out group
                    ${
                      activeSection === section.id
                        ? "text-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/50"
                        : "text-gray-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                    }
                  `}
                  style={{ minHeight: "44px", minWidth: "44px" }} // Mobile touch targets
                  aria-label={`Navigate to ${section.label}`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    {section.icon}
                    <span className="text-sm font-medium">{section.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionNav;
