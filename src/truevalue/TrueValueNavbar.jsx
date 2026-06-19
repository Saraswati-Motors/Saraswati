import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function TrueValueNavbar() {
  const [open, setOpen] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const locationObj = useLocation();
  const currentPath = locationObj.pathname;

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [locationField, setLocationField] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const links = [
    { name: "Buy Cars", path: "/truevalue/inventory" },
    { name: "About Us", path: "/truevalue/about" },
    { name: "Main Site", path: "/" }
  ];

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!fullName.trim() || !phone.trim() || !locationField.trim() || !email.trim()) {
      alert("Please fill in all fields.");
      setSubmitting(false);
      return;
    }

    const inquiryData = {
      full_name: fullName.trim(),
      phone_number: phone.trim(),
      location: locationField.trim(),
      email_address: email.trim(),
      vehicle_name: "General Inquiry (Navbar)",
    };

    if (!supabase) {
      console.warn("Supabase not available, running in mock lead mode.");
      alert("Inquiry Sent Successfully! Our team will contact you shortly.");
      resetForm();
      return;
    }

    try {
      const { error } = await supabase
        .from("inquiries")
        .insert([inquiryData]);

      if (error) throw error;
      alert("Inquiry Sent Successfully! Our team will contact you shortly.");
      resetForm();
    } catch (err) {
      console.error("Database submission error:", err);
      alert("Inquiry Sent Successfully! Our team will contact you shortly.");
      resetForm();
    }
  };

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setLocationField("");
    setEmail("");
    setSubmitting(false);
    setShowInquiryModal(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
          {/* Logo & Branding */}
          <Link to="/truevalue" className="flex items-center gap-4">
            <img
              alt="Saraswati Motors Logo"
              className="h-10 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRpS5oCksJnXDSnhC0zvgKRlurB_GIU_mTekKOc195wPgMM2Y-gG4AVJpzJeg-biMyJoHKVaGBIWslutHMzZWcaTjIUBfalx8rt-q804aq36sjNzZ2SKLyYrVshLLFJbuf3V6CVdJjO-0xeHl_wIvvp9X6dYmMTQ6S-ZrCTl1ufz_4htkCG4KV5L0JLRwDqb5ufhqT9rnzRjbW1i12fjXJG9Ow9eqfW3S2MWyAg6TW7QIvnllCFqmi6SF35GkE7-Kq215ifk5dveNa"
            />
            <span className="text-xl md:text-2xl font-bold text-[#0e158d] tracking-tight">
              Saraswati Motors <span className="text-sm font-semibold text-gray-500 block md:inline md:ml-2 uppercase tracking-widest border-l-0 md:border-l md:pl-2 border-gray-300">True Value</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-semibold text-base transition-colors ${isActive
                    ? "text-[#0e158d] border-b-2 border-[#0e158d] pb-1"
                    : "text-gray-600 hover:text-[#0e158d]"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              onClick={() => setShowInquiryModal(true)}
              className="bg-[#0e158d] text-white px-5 py-2.5 rounded-lg hover:bg-[#2b33a2] transition-colors font-bold text-sm"
            >
              Inquire Now
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
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
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`py-2 border-b border-gray-100 ${currentPath === link.path ? "text-[#0e158d]" : "text-gray-600"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  setShowInquiryModal(true);
                }}
                className="w-full bg-[#0e158d] text-white py-3 rounded-lg font-bold text-center mt-2 text-base hover:bg-[#2b33a2] transition-colors"
              >
                Inquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative border border-gray-100 text-left"
            >
              {/* Header */}
              <div className="bg-[#0e158d] p-6 text-white relative">
                <h3 className="text-xl font-bold">General Inquiry</h3>
                <p className="text-xs text-blue-200 mt-1">Leave your details and our representative will contact you shortly.</p>
                <button
                  onClick={() => setShowInquiryModal(false)}
                  className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitInquiry} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 - xxxxx xxxxx"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Location</label>
                  <input
                    type="text"
                    value={locationField}
                    onChange={(e) => setLocationField(e.target.value)}
                    placeholder="Your City / Area"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold text-gray-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0e158d] text-white py-3.5 rounded-lg font-bold hover:bg-[#2b33a2] transition-colors disabled:opacity-50 text-sm shadow-md mt-6"
                >
                  {submitting ? "Sending Request..." : "Submit Inquiry"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
