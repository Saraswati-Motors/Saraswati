import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { mockCars } from "./mockData";
import { Link } from "react-router-dom";
import TrueValueTestimonials from "./TrueValueTestimonials";
import {
  ShieldCheck,
  Award,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Settings,
  MapPin,
  Phone,
  Clock
} from "lucide-react";

export default function TrueValueHome() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    async function loadFeaturedCars() {
      if (!supabase) {
        setFeaturedCars(mockCars.filter(car => car.is_featured));
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("is_featured", true);

        if (error || !data || data.length === 0) {
          setFeaturedCars(mockCars.filter(car => car.is_featured));
        } else {
          setFeaturedCars(data);
        }
      } catch (err) {
        console.error("Error fetching from Supabase, using mock fallback:", err);
        setFeaturedCars(mockCars.filter(car => car.is_featured));
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedCars();
  }, []);

  const scrollStock = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 424; // Card width + gap
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-gray-100">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="Premium Maruti Suzuki Grand Vitara"
            src="/truevalue/cover.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131b2e]/90 via-[#131b2e]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block bg-[#2b33a2] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
              True Value Certified
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Find Your Perfect <br />
              <span className="text-[#a1a8ff]">Pre-Owned Car.</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Experience the trust of Maruti Suzuki True Value with Saraswati Motors. Every car undergoes a 376-point quality check for a premium driving experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/truevalue/inventory"
                className="bg-[#0e158d] text-white px-8 py-4 font-bold rounded-lg shadow-xl hover:bg-[#2b33a2] transition-all transform hover:-translate-y-0.5 text-center"
              >
                Explore Inventory
              </Link>
              <Link
                to="/truevalue/about"
                className="bg-transparent border-2 border-white text-white px-8 py-4 font-bold rounded-lg hover:bg-white/10 transition-all text-center"
              >
                Learn Our Legacy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Bento Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <div className="h-1.5 w-24 bg-[#0e158d] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#e0e0ff] text-[#0e158d] flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#131b2e]">Unmatched Trust</h3>
            <p className="text-gray-600">
              Backed by Maruti Suzuki's legacy, we provide complete transparency in documentation and car history for absolute peace of mind.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#e0e0ff] text-[#0e158d] flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#131b2e]">Certified Quality</h3>
            <p className="text-gray-600">
              Each vehicle undergoes a rigorous 376-point digital evaluation covering engine, suspension, electricals, and body structure.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#e0e0ff] text-[#0e158d] flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Tag size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#131b2e]">Exceptional Value</h3>
            <p className="text-gray-600">
              Get the best prices on pre-owned cars and competitive exchange bonuses. High value, low depreciation, and easy financing options.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Stock Carousel */}
      <section className="py-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Inventory</h2>
            <div className="flex gap-4">
              <button
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#0e158d] hover:text-white transition-colors"
                onClick={() => scrollStock(-1)}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#0e158d] hover:text-white transition-colors"
                onClick={() => scrollStock(1)}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading ? (
              <div className="w-full text-center py-12 font-bold text-gray-500">
                Loading Featured Vehicles...
              </div>
            ) : (
              featuredCars.map((car) => (
                <div key={car.id} className="min-w-[320px] md:min-w-[400px] snap-start group">
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={`${car.make} ${car.model}`}
                        src={car.image_url}
                      />
                      <span className="absolute top-4 left-4 bg-[#0e158d] text-white px-3 py-1 text-xs font-bold rounded">
                        {car.badge || "CERTIFIED"}
                      </span>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-[#131b2e]">{car.model}</h4>
                          <p className="text-gray-500 text-sm">{car.year} • {car.fuel_type} • {car.mileage_km.toLocaleString()} km</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#0e158d] font-bold text-xl">₹{car.price_lakh} Lakh</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Gauge size={16} />
                          <span>{car.details?.mileage || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Settings size={16} />
                          <span>{car.transmission}</span>
                        </div>
                      </div>
                      <Link
                        to={`/truevalue/vehicle/${car.id}`}
                        className="block w-full bg-[#0e158d] text-white py-3 font-bold rounded-lg text-center hover:bg-[#2b33a2] transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TrueValueTestimonials />

      {/* Google Map Section */}
      <section className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block bg-[#e0e0ff] text-[#0e158d] px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
              Location Details
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#131b2e] tracking-tight">
              Visit Saraswati Motors <br />
              <span className="text-[#0e158d]">True Value Showroom</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Drop by our showroom in Prayagraj to check out our collection of certified pre-owned vehicles. Our experts are ready to guide you through inspection reports, paper transfers, and easy financing options.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-gray-100 text-sm text-gray-700">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#0e158d] mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-[#131b2e]">Address</h4>
                  <p className="text-gray-500 mt-1">Jhunsi, Prayagraj, Uttar Pradesh - 211019</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-[#0e158d] mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-[#131b2e]">Contact Phone</h4>
                  <p className="text-gray-500 mt-1">+91 - 9151041530</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-[#0e158d] mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-[#131b2e]">Operating Hours</h4>
                  <p className="text-gray-500 mt-1">Monday - Sunday: 10:00 AM - 07:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Embed Container */}
          <div className="lg:col-span-7 h-[400px] w-full rounded-2xl overflow-hidden border border-gray-200 shadow-xl relative bg-gray-50">
            <iframe
              title="Saraswati Motors True Value Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230553.11187347336!2d81.54165568671873!3d25.458570400000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39854dcecaf25eb5%3A0xa9e813fbc2fba488!2sMaruti%20Suzuki%20True%20Value%20(Saraswati%20Motors%2C%20Prayagraj%2C%20Jhunsi)!5e0!3m2!1sen!2sin!4v1781884056307!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
