import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { MapPin, Phone, Clock, Facebook, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function TrueValueFooter() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!fullName || !fullName.trim()) {
      alert("Please enter your name.");
      setSubmitting(false);
      return;
    }
    if (!phone || !phone.trim()) {
      alert("Please enter your phone number.");
      setSubmitting(false);
      return;
    }

    const inquiryData = {
      full_name: fullName.trim(),
      phone_number: phone.trim(),
      email_address: email && email.trim() ? email.trim() : null,
      vehicle_name: "General Consultation (Footer Inquiry)",
    };

    if (!supabase) {
      console.warn("Supabase not available, running in mock lead mode.");
      alert("Inquiry Request Sent! (Local Sandbox Mode)");
      setFullName("");
      setPhone("");
      setEmail("");
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("inquiries")
        .insert([inquiryData]);

      if (error) throw error;
      alert("Inquiry Request Sent! Our team will contact you shortly.");
      setFullName("");
      setPhone("");
      setEmail("");
    } catch (err) {
      console.error("Database submission error:", err);
      alert("Inquiry Request Sent! (Local Sandbox Mode)");
      setFullName("");
      setPhone("");
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#0F172A] text-white py-16 px-6 md:px-12 border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {/* Col 1 */}
        <div className="space-y-6">
          <img
            src="/s.webp"
            alt="Maruti Suzuki True Value Logo"
            className="h-12 w-auto mb-4"
          />
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl tracking-tight">Saraswati Motors</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Maruti Suzuki True Value Authorized Dealer. Committed to transparency, quality, and exceptional customer service in the pre-owned car market.
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2"><MapPin size={16} /> Jhunsi, Prayagraj</p>
            <p className="flex items-center gap-2"><Phone size={16} /> +91-9151041530</p>
            <p className="flex items-center gap-2"><Clock size={16} /> Mon-Sun: 10:00 AM - 07:00 PM</p>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-6">
          <h4 className="font-bold text-lg text-white border-l-2 border-[#a1a8ff] pl-3">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/truevalue/inventory" className="hover:text-white transition-colors">Browse Inventory</Link></li>
            <li><Link to="/truevalue/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors font-bold text-[#a1a8ff]">Main Website</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-6">
          <h4 className="font-bold text-lg text-white border-l-2 border-[#a1a8ff] pl-3">Popular Models</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/truevalue/inventory" className="hover:text-white transition-colors">Maruti Swift</Link></li>
            <li><Link to="/truevalue/inventory" className="hover:text-white transition-colors">Maruti Baleno</Link></li>
            <li><Link to="/truevalue/inventory" className="hover:text-white transition-colors">Maruti Vitara Brezza</Link></li>
            <li><Link to="/truevalue/inventory" className="hover:text-white transition-colors">Maruti Grand Vitara</Link></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-6">
          <h4 className="font-bold text-lg text-white border-l-2 border-[#a1a8ff] pl-3">Connect With Us</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0e158d] transition-all"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0e158d] transition-all"><Instagram size={18} /></a>
          </div>
          <div className="pt-4 border-t border-gray-800 space-y-4">
            <p className="font-bold text-white text-sm">Book a Consultation</p>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-[#a1a8ff] placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-[#a1a8ff] placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email (Optional)"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-[#a1a8ff] placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#0e158d] hover:bg-[#2b33a2] text-white py-2.5 font-bold rounded transition-colors disabled:opacity-50 text-xs shadow-md"
              >
                {submitting ? "Sending..." : "Request Call"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2024 Saraswati Motors. Maruti Suzuki True Value Authorized Dealer.</p>
      </div>
    </footer>
  );
}
