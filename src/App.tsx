import "./App.css";
import AboutMe from "./components/AboutMe";
import ContactMe from "./components/ContactMe";
import BackGroundEff from "./components/BackGroundEff-edge";
import MyProjects from "./components/MyProjects";
import SectionNav from "./components/SectionNav";
import { Home, Code, Mail } from "lucide-react";

const sections = [
  { id: "section-1", label: "Home", icon: <Home size={20} /> },
  { id: "section-2", label: "Projects", icon: <Code size={20} /> },
  { id: "section-3", label: "Contact", icon: <Mail size={20} /> },
];

function App() {
  return (
    <div className="skeleton">
      <a href="#section-1" className="skip-link">
        Skip to content
      </a>
      <BackGroundEff />
      <SectionNav sections={sections} />
      <main className="skeleton-flexbox relative z-10">
        <section id="section-1" aria-label="About" className="skeleton1">
          <AboutMe />
        </section>
        <section id="section-2" aria-label="Projects" className="skeleton2">
          <MyProjects />
        </section>
        <section id="section-3" aria-label="Contact" className="skeleton3">
          <ContactMe />
        </section>
      </main>
    </div>
  );
}

export default App;
