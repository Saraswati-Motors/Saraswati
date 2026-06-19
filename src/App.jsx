import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function MainSite() {
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

function TrueValueLayout({ children }) {
  return (
    <>
      <TrueValueNavbar />
      {children}
      <TrueValueFooter />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Site Route */}
        <Route path="/" element={<MainSite />} />

        {/* True Value Portal Routes */}
        <Route
          path="/truevalue"
          element={
            <TrueValueLayout>
              <TrueValueHome />
            </TrueValueLayout>
          }
        />
        <Route
          path="/truevalue/inventory"
          element={
            <TrueValueLayout>
              <TrueValueInventory />
            </TrueValueLayout>
          }
        />
        <Route
          path="/truevalue/about"
          element={
            <TrueValueLayout>
              <TrueValueAbout />
            </TrueValueLayout>
          }
        />
        <Route
          path="/truevalue/vehicle/:id"
          element={
            <TrueValueLayout>
              <TrueValueDetails />
            </TrueValueLayout>
          }
        />
      </Routes>
    </Router>
  );
}

