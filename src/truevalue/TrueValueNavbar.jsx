import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function TrueValueNavbar({ currentPath }) {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Buy Cars", path: "/truevalue/inventory" },
    { name: "About Us", path: "/truevalue/about" },
    { name: "Main Site", path: "/" }
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
          {/* Logo & Branding */}
          <a href="/truevalue" className="flex items-center gap-4">
            <img
              alt="Saraswati Motors Logo"
              className="h-10 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRpS5oCksJnXDSnhC0zvgKRlurB_GIU_mTekKOc195wPgMM2Y-gG4AVJpzJeg-biMyJoHKVaGBIWslutHMzZWcaTjIUBfalx8rt-q804aq36sjNzZ2SKLyYrVshLLFJbuf3V6CVdJjO-0xeHl_wIvvp9X6dYmMTQ6S-ZrCTl1ufz_4htkCG4KV5L0JLRwDqb5ufhqT9rnzRjbW1i12fjXJG9Ow9eqfW3S2MWyAg6TW7QIvnllCFqmi6SF35GkE7-Kq215ifk5dveNa"
            />
            <span className="text-xl md:text-2xl font-bold text-[#0e158d] tracking-tight">
              Saraswati Motors <span className="text-sm font-semibold text-gray-500 block md:inline md:ml-2 uppercase tracking-widest border-l-0 md:border-l md:pl-2 border-gray-300">True Value</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className={`font-semibold text-base transition-colors ${isActive
                    ? "text-[#0e158d] border-b-2 border-[#0e158d] pb-1"
                    : "text-gray-600 hover:text-[#0e158d]"
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 bg-white border-b border-gray-200 z-[49] shadow-lg md:hidden py-6 px-6"
          >
            <div className="flex flex-col gap-6 text-lg font-semibold">
              {links.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`py-2 border-b border-gray-100 ${currentPath === link.path ? "text-[#0e158d]" : "text-gray-600"
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
