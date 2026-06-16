import { useState, useEffect } from 'react';
import './index.css'
import AboutUs from './sections/AboutUs';
import Hero from './sections/Hero';
import Locations from './sections/Locations';
import LogoMarquee from './sections/LogoMarquee';
import Navbar from './sections/Navbar'
import Team from './sections/Team';
import Timeline from './sections/Timeline';
import Work from './sections/Work';
import FooterBar from './sections/FooterBar';
import Leader from './sections/Leader';

// True Value Portal Components
import TrueValueNavbar from './truevalue/TrueValueNavbar';
import TrueValueHome from './truevalue/TrueValueHome';
import TrueValueInventory from './truevalue/TrueValueInventory';
import TrueValueAbout from './truevalue/TrueValueAbout';
import TrueValueDetails from './truevalue/TrueValueDetails';
import TrueValueFooter from './truevalue/TrueValueFooter';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    
    // Intercept clicks on links that are internal
    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (anchor && anchor.href && anchor.host === window.location.host) {
        const path = anchor.pathname;
        if (path.startsWith("/truevalue") || path === "/") {
          e.preventDefault();
          window.history.pushState({}, "", path);
          setCurrentPath(path);
          window.scrollTo(0, 0);
        }
      }
    };
    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  // True Value Routing
  if (currentPath.startsWith("/truevalue")) {
    let PageComponent = <TrueValueHome />;
    let vehicleId = null;

    if (currentPath === "/truevalue/inventory") {
      PageComponent = <TrueValueInventory />;
    } else if (currentPath === "/truevalue/about") {
      PageComponent = <TrueValueAbout />;
    } else if (currentPath.startsWith("/truevalue/vehicle/")) {
      vehicleId = currentPath.substring("/truevalue/vehicle/".length);
      PageComponent = <TrueValueDetails vehicleId={vehicleId} />;
    }

    return (
      <>
        <TrueValueNavbar currentPath={currentPath} />
        {PageComponent}
        <TrueValueFooter />
      </>
    );
  }

  // Main Site (Default Route)
  return (
    <>
      <Navbar />

      <section id="home"><Hero /></section>
      <LogoMarquee />
      <Leader />

      <section id="about"><AboutUs /></section>
      <section id="work"><Work /></section>
      <section id="history"><Timeline /></section>
      <section id="team"><Team /></section>
      <section id="locations"><Locations /></section>

      <FooterBar />
    </>
  );
}

