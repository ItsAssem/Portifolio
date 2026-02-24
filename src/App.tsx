import "./App.css";
import AboutMe from "./components/AboutMe";
import ContactMe from "./components/ContactMe";
import BackGroundEff from "./components/BackGroundEff-edge";
import MyProjects from "./components/MyProjects";
import SectionNav from "./components/SectionNav";
import { Home, Code, Mail } from "lucide-react";

// Define sections for navigation
const sections = [
  { id: "section-1", label: "Home", icon: <Home size={20} /> },
  { id: "section-2", label: "Projects", icon: <Code size={20} /> },
  { id: "section-3", label: "Contact", icon: <Mail size={20} /> },
];

function App() {
  return (
    <div className="skeleton">
      <BackGroundEff />
      <SectionNav sections={sections} />
      <div className="skeleton-flexbox">
        <nav className="skeleton-nav"></nav>
        <div className="skeleton1" id="section-1">
          <AboutMe />
        </div>
        <div className="skeleton2" id="section-2">
          <MyProjects />
        </div>
        <div className="skeleton3" id="section-3">
          <ContactMe />
        </div>
      </div>
    </div>
  );
}

export default App;
