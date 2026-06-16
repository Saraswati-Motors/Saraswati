import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About us", path: "about" },
    { name: "Our Work", path: "work" },
    { name: "History", path: "history" },
    { name: "Team", path: "team" },
    { name: "Locations", path: "locations" },
    { name: "True Value", path: "/truevalue", isPage: true }
  ];

  // 🔥 Smooth scroll with navbar offset
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // navbar height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
    setOpen(false);
  };

  const handleLinkClick = (item) => {
    if (item.isPage) {
      window.history.pushState({}, "", item.path);
      window.dispatchEvent(new Event("popstate"));
      window.scrollTo(0, 0);
      setOpen(false);
    } else {
      handleScroll(item.path);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[1100] bg-black/40 backdrop-blur-lg shadow-md">
        <div className="mx-auto px-6 h-16 flex items-center justify-between text-white/80">

          {/* Logo */}
          <button
            onClick={() => handleScroll("home")}
            className="font-semibold text-xl md:text-2xl tracking-wide hover:text-white transition-all duration-300"
          >
            Saraswati
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-10 font-medium text-base">
            {links.map((item) => (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item)}
                className="relative hover:text-white transition-all duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] md:hidden backdrop-blur-2xl bg-[#0e275e]/20 flex flex-col items-center justify-center text-white"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6"
            >
              <X size={30} />
            </button>

            {/* Mobile Links */}
            <div className="flex flex-col gap-10 text-2xl font-medium text-center">
              {links.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item)}
                  className="hover:text-white/70 transition"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}