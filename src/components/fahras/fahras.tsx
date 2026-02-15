import React from "react";
import "./fahras.css";
interface FahrasProps {
  sectionNames: string[];
}
const Fahras: React.FC<FahrasProps> = ({ sectionNames = [] }) => {
  return (
    // Fixed positioning for the entire navigator on the right side of the screen

    <div className="nav-container">
      <ul className="nav-list">
        {sectionNames.map((name, index) => (
          // The section ID is calculated as 'section-1', 'section-2', etc.
          <li key={name} className="nav-list-item">
            <a
              href={`#section-${index + 1}`}
              className="nav-link"
              aria-label={`Go to ${name}`}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fahras;
