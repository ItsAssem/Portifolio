import "./App.css";
import AboutMe from "./components/AboutMe";

import ContactMe from "./components/ContactMe";

import BackGroundEff from "./components/BackGroundEff";
import MyProjects from "./components/MyProjects";

function App() {
  return (
    <div className="skeleton">
      <BackGroundEff />
      <div className="skeleton-flexbox">
        <nav className="skeleton-nav"></nav>
        <div className="skeleton1" id="section-1">
          <AboutMe />
        </div>
        <div className="skeleton2" id="section-2">
          <div className="relative z-20 w-full p-3">
            <MyProjects />
          </div>
        </div>
        <div className="skeleton3" id="section-3">
          <ContactMe />
        </div>
      </div>
    </div>
  );
}

export default App;
