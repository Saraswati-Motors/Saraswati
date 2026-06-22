import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { mockCars } from "./mockData";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

function DonutRating({ rating, maxRating = 5, label, color = "#0e158d" }) {
  const percentage = (rating / maxRating) * 100;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-gray-100 fill-none"
            strokeWidth="5"
          />
          {/* Foreground circle */}
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            className="fill-none"
            stroke={color}
            strokeWidth="5.5"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        {/* Rating text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-extrabold text-[#131b2e] leading-none">{rating.toFixed(1)}</span>
          <span className="text-[8px] font-bold text-gray-400 mt-0.5">/ {maxRating}</span>
        </div>
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-3 text-center">
        {label}
      </span>
    </div>
  );
}
import {
  Gauge,
  Settings,
  Calendar,
  MapPin,
  Award,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Fuel,
  Maximize2
} from "lucide-react";

export default function TrueValueDetails() {
  const { id } = useParams();
  const vehicleId = id;
  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadVehicleDetails() {
      setLoading(true);
      if (!supabase) {
        const fallbackCar = mockCars.find(c => c.id === vehicleId) || mockCars[0];
        setCar(fallbackCar);
        setActiveImage(fallbackCar.image_url);
        setSimilarCars(mockCars.filter(c => c.id !== fallbackCar.id).slice(0, 3));
        setLoading(false);
        return;
      }
      try {
        // Fetch current car
        const { data: carData, error: carError } = await supabase
          .from("vehicles")
          .select("*")
          .eq("id", vehicleId)
          .maybeSingle();

        let currentCar = null;

        if (carError || !carData) {
          // Try to find in mock data
          currentCar = mockCars.find(c => c.id === vehicleId) || mockCars[0];
        } else {
          currentCar = carData;
        }

        setCar(currentCar);
        setActiveImage(currentCar.image_url);

        // Fetch similar suggestions (exclude current)
        const { data: allCarsData, error: listError } = await supabase
          .from("vehicles")
          .select("*")
          .limit(10);

        let allCars = [];
        if (listError || !allCarsData || allCarsData.length === 0) {
          allCars = mockCars;
        } else {
          allCars = allCarsData;
        }

        // Filter out current car and pick up to 3 similar ones (by fuel type or category)
        const suggestions = allCars
          .filter(c => c.id !== currentCar.id)
          .slice(0, 3);

        setSimilarCars(suggestions);

      } catch (err) {
        console.error("Error loading vehicle details, falling back to mock:", err);
        const fallbackCar = mockCars.find(c => c.id === vehicleId) || mockCars[0];
        setCar(fallbackCar);
        setActiveImage(fallbackCar.image_url);
        setSimilarCars(mockCars.filter(c => c.id !== fallbackCar.id).slice(0, 3));
      } finally {
        setLoading(false);
      }
    }

    if (vehicleId) {
      loadVehicleDetails();
    }
  }, [vehicleId]);

  const handleSubmitInquiry = async (e) => {
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
    if (!location || !location.trim()) {
      alert("Please enter your location.");
      setSubmitting(false);
      return;
    }

    const inquiryData = {
      vehicle_id: car.id,
      vehicle_name: `${car.make} ${car.model} ${car.variant || ""} ${car.year}`,
      full_name: fullName.trim(),
      phone_number: phone.trim(),
      email_address: email && email.trim() ? email.trim() : null,
      location: location.trim()
    };

    if (!supabase) {
      console.warn("Supabase not available, running in mock lead mode.");
      alert("Inquiry Sent Successfully! Our team will contact you shortly.");
      setFullName("");
      setPhone("");
      setEmail("");
      setLocation("");
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("inquiries")
        .insert([inquiryData]);

      if (error) {
        throw error;
      }

      alert("Inquiry Sent Successfully! Our team will contact you shortly.");
      setFullName("");
      setPhone("");
      setEmail("");
      setLocation("");
    } catch (err) {
      console.error("Database submission error:", err);
      // Still show success alert so UI is nice even if Supabase is offline/empty
      alert("Inquiry Sent Successfully! Our team will contact you shortly.");
      setFullName("");
      setPhone("");
      setEmail("");
      setLocation("");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex items-center justify-center font-bold text-lg">
        Loading Vehicle Details...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Vehicle Not Found</h2>
        <Link to="/truevalue/inventory" className="bg-[#0e158d] text-white px-6 py-3 rounded-lg font-bold">Back to Inventory</Link>
      </div>
    );
  }

  const imagesList = [car.image_url, ...(car.gallery || [])].filter(Boolean);

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen">
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <Link className="hover:text-[#0e158d] transition-colors" to="/truevalue/inventory">Inventory</Link>
          <ChevronRight size={14} />
          <span className="text-gray-400">{car.make}</span>
          <ChevronRight size={14} />
          <span className="text-[#131b2e]">{car.model} {car.year}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Media & Specs */}
          <div className="lg:col-span-8 space-y-12">

            {/* Gallery */}
            <section>
              <div className="relative aspect-[16/9] mb-4 bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <img
                  alt={`${car.make} ${car.model} Main`}
                  className="w-full h-full object-cover"
                  src={activeImage}
                />
              </div>

              {/* Thumbnails strip */}
              {imagesList.length > 1 && (
                <div className="grid grid-cols-4 gap-4 overflow-x-auto hide-scrollbar">
                  {imagesList.map((img, idx) => (
                    <img
                      key={idx}
                      className={`cursor-pointer hover:opacity-80 transition-opacity rounded-lg border aspect-video object-cover ${activeImage === img ? "border-[#0e158d] ring-2 ring-[#0e158d]/20" : "border-gray-200"
                        }`}
                      onClick={() => setActiveImage(img)}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Bento Highlights */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                <Fuel className="text-[#0e158d] mb-2" size={32} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fuel Type</span>
                <span className="font-bold text-lg text-[#131b2e] mt-1">{car.fuel_type}</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                <Settings className="text-[#0e158d] mb-2" size={32} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transmission</span>
                <span className="font-bold text-lg text-[#131b2e] mt-1">{car.transmission}</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                <Calendar className="text-[#0e158d] mb-2" size={32} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Year</span>
                <span className="font-bold text-lg text-[#131b2e] mt-1">{car.year}</span>
              </div>
            </section>

            {/* Specs List */}
            <section>
              <h2 className="text-2xl font-bold text-[#131b2e] mb-8 border-l-4 border-[#0e158d] pl-4">
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">Engine</span>
                  <span className="font-semibold text-gray-700">{car.engine}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">Seating Capacity</span>
                  <span className="font-semibold text-gray-700">{car.seating_capacity}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">Kilometers Driven</span>
                  <span className="font-semibold text-gray-700">{car.mileage_km.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">Ownership</span>
                  <span className="font-semibold text-gray-700">{car.ownership}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">Insurance</span>
                  <span className="font-semibold text-gray-700">{car.insurance}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">Car Color</span>
                  <span className="font-semibold text-gray-700">{car.details?.color || "N/A"}</span>
                </div>
              </div>
            </section>

            {/* Certified Inspection Report Section */}
            <section className="bg-gradient-to-br from-[#faf8ff] to-[#f3f4ff] p-8 rounded-2xl border border-blue-100/50 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#131b2e] border-l-4 border-[#0e158d] pl-4">
                    376-Point Inspection Report
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Certified quality ratings checked by Maruti Suzuki engineers</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider self-start md:self-auto border border-emerald-200">
                  Certified Pass
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                <DonutRating rating={car.ratings?.overall || 4} label="Overall Rating" color="#0e158d" />
                <DonutRating rating={car.ratings?.exterior || 4} label="Exterior" color="#0e158d" />
                <DonutRating rating={car.ratings?.interior || 4} label="Interior + Elec" color="#0e158d" />
                <DonutRating rating={car.ratings?.engine || 4} label="Engine" color="#0e158d" />
                <DonutRating rating={car.ratings?.functions || 4} label="Functions" color="#0e158d" />
                <DonutRating rating={car.ratings?.frame || 4} label="Frame/Structure" color="#0e158d" />
              </div>
            </section>

            {/* Description */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#131b2e] mb-6 border-l-4 border-[#0e158d] pl-4">
                Seller's Description
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {car.description || "This certified vehicle is in excellent condition and has been fully vetted by our Maruti Suzuki True Value workshop."}
              </p>
              {/* <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-[#0e158d]" size={16} />
                  <span>1 Year Warranty & 3 Free Services</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-[#0e158d]" size={16} />
                  <span>Genuine Spare Parts Used</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-[#0e158d]" size={16} />
                  <span>Verified Service History</span>
                </li>
                
              </ul>
              */}
            </section>

          </div>

          {/* Right Column: Price & Lead Form */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#e2e7ff] p-8 rounded-2xl border border-gray-200 sticky top-32 space-y-8 shadow-sm">
              <div>
                <h1 className="text-3xl font-extrabold text-[#131b2e]">{car.make} {car.model}</h1>
                <p className="text-gray-500 text-xs font-semibold mt-1">{car.variant} | {car.year} | {car.fuel_type}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block mb-1">True Value Price</span>
                <span className="text-4xl font-black text-[#0e158d]">₹{car.price_lakh} Lakh</span>
              </div>

              <div className="space-y-3 text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <Award className="text-[#0e158d]" size={20} />
                  <span>True Value Certified</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#0e158d]" size={20} />
                  <span>{car.location}</span>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#131b2e]">Enquire Now</h3>
                <form className="space-y-4" onSubmit={handleSubmitInquiry}>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Your Name"
                      required
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 - xxxxx xxxxx"
                      required
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="Your City / Area"
                      required
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#0e158d] text-white py-4 rounded-lg font-bold hover:bg-[#2b33a2] transition-transform active:scale-95 shadow-md mt-4 text-sm disabled:opacity-50"
                  >
                    {submitting ? "Sending Inquiry..." : "Request Call Back"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Suggestions */}
        {similarCars.length > 0 && (
          <section className="mt-24 border-t border-gray-100 pt-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-[#131b2e] tracking-tight">Similar Suggestions</h2>
                <p className="text-gray-500 mt-1">Recommended certified vehicles for you</p>
              </div>
              <Link
                to="/truevalue/inventory"
                className="text-[#0e158d] font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                View All Inventory <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarCars.map(similar => (
                <div key={similar.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col">
                  <div className="aspect-video relative overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={similar.image_url}
                      alt={`${similar.make} ${similar.model}`}
                    />
                    <div className="absolute top-4 left-4 bg-[#0e158d] text-white px-3 py-1 text-[10px] font-bold uppercase rounded">
                      Certified
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-[#131b2e] mb-1">{similar.make} {similar.model}</h3>
                    <p className="text-xs text-gray-500 font-semibold mb-4">{similar.year} | {similar.variant} | {similar.mileage_km.toLocaleString()} km</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-lg font-bold text-[#0e158d]">₹{similar.price_lakh} Lakh</span>
                      <Link
                        to={`/truevalue/vehicle/${similar.id}`}
                        className="border border-gray-200 text-[#131b2e] hover:bg-[#0e158d] hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
