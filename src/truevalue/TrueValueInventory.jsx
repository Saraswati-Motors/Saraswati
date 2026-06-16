import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import { mockCars } from "./mockData";
import {
  Calendar,
  MapPin,
  CheckCircle,
  Heart,
  RotateCcw,
  SlidersHorizontal,
  Gauge
} from "lucide-react";

export default function TrueValueInventory() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedModel, setSelectedModel] = useState("All");
  const [maxBudget, setMaxBudget] = useState(20); // In Lakhs
  const [minYear, setMinYear] = useState(null);
  const [selectedFuels, setSelectedFuels] = useState({
    Petrol: false,
    CNG: false,
    Diesel: false
  });
  const [sortBy, setSortBy] = useState("Latest Arrivals");
  const [favorites, setFavorites] = useState({});
  const [visibleCount, setVisibleCount] = useState(8);

  // Reset visible items count when filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [selectedModel, maxBudget, minYear, selectedFuels, sortBy]);

  useEffect(() => {
    async function loadCars() {
      if (!supabase) {
        setCars(mockCars);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*");

        if (error || !data || data.length === 0) {
          setCars(mockCars);
        } else {
          setCars(data);
        }
      } catch (err) {
        console.error("Error loading cars, falling back to mock:", err);
        setCars(mockCars);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  // Filter options lists
  const modelsList = useMemo(() => {
    const models = cars.map(c => c.model);
    return ["All", ...new Set(models)];
  }, [cars]);

  // Handle Fuel checkbox change
  const handleFuelChange = (fuel) => {
    setSelectedFuels(prev => ({
      ...prev,
      [fuel]: !prev[fuel]
    }));
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedModel("All");
    setMaxBudget(20);
    setMinYear(null);
    setSelectedFuels({
      Petrol: false,
      CNG: false,
      Diesel: false
    });
    setSortBy("Latest Arrivals");
  };

  // Apply filters and sorting
  const filteredAndSortedCars = useMemo(() => {
    let result = [...cars];

    // Model filter
    if (selectedModel !== "All") {
      result = result.filter(c => c.model === selectedModel);
    }

    // Budget filter (price_lakh <= maxBudget)
    result = result.filter(c => c.price_lakh <= maxBudget);

    // Year filter
    if (minYear) {
      result = result.filter(c => c.year >= minYear);
    }

    // Fuel filter
    const activeFuels = Object.keys(selectedFuels).filter(k => selectedFuels[k]);
    if (activeFuels.length > 0) {
      result = result.filter(c => activeFuels.includes(c.fuel_type));
    }

    // Sorting
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price_lakh - b.price_lakh);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price_lakh - a.price_lakh);
    } else if (sortBy === "Mileage: Lowest") {
      result.sort((a, b) => a.mileage_km - b.mileage_km);
    } // "Latest Arrivals" remains default database sort or mock list order

    return result;
  }, [cars, selectedModel, maxBudget, minYear, selectedFuels, sortBy]);

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen">
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar Filters */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-28 shadow-sm space-y-8">

              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <SlidersHorizontal size={18} />
                  <h2>Filters</h2>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-[#0e158d] hover:text-[#2b33a2] text-xs font-bold flex items-center gap-1 hover:underline"
                >
                  <RotateCcw size={12} /> Clear all
                </button>
              </div>

              {/* Model Search/Select */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle Model</label>
                <select
                  value={selectedModel}
                  onChange={e => setSelectedModel(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg bg-gray-50 focus:border-[#0e158d] focus:ring-1 focus:ring-[#0e158d] outline-none text-sm font-semibold"
                >
                  <option value="All">All Models</option>
                  {modelsList.filter(m => m !== "All").map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* Price Budget Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <label>Max Budget</label>
                  <span className="text-[#0e158d] font-extrabold text-sm">₹{maxBudget}L</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.5"
                  value={maxBudget}
                  onChange={e => setMaxBudget(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0e158d]"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>₹5L</span>
                  <span>₹20L+</span>
                </div>
              </div>

              {/* Year Buttons */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Model Year</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMinYear(minYear === 2020 ? null : 2020)}
                    className={`py-2 text-sm font-semibold border rounded-lg transition-all ${minYear === 2020
                      ? "bg-[#e0e0ff] border-[#0e158d] text-[#0e158d]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    2020+
                  </button>
                  <button
                    onClick={() => setMinYear(minYear === 2022 ? null : 2022)}
                    className={`py-2 text-sm font-semibold border rounded-lg transition-all ${minYear === 2022
                      ? "bg-[#e0e0ff] border-[#0e158d] text-[#0e158d]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    2022+
                  </button>
                  <button
                    onClick={() => setMinYear(minYear === 2023 ? null : 2023)}
                    className={`py-2 text-sm font-semibold border rounded-lg transition-all ${minYear === 2023
                      ? "bg-[#e0e0ff] border-[#0e158d] text-[#0e158d]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    2023+
                  </button>
                  <button
                    onClick={() => setMinYear(null)}
                    className={`py-2 text-sm font-semibold border rounded-lg transition-all ${minYear === null
                      ? "bg-[#e0e0ff] border-[#0e158d] text-[#0e158d]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    Any Year
                  </button>
                </div>
              </div>

              {/* Fuel Types */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Fuel Type</label>
                <div className="space-y-2">
                  {["Petrol", "CNG", "Diesel"].map(fuel => (
                    <label key={fuel} className="flex items-center gap-3 cursor-pointer group text-sm font-semibold text-gray-700">
                      <input
                        type="checkbox"
                        checked={selectedFuels[fuel]}
                        onChange={() => handleFuelChange(fuel)}
                        className="w-5 h-5 rounded border-gray-300 text-[#0e158d] focus:ring-[#0e158d] cursor-pointer"
                      />
                      <span className="group-hover:text-[#0e158d] transition-colors">{fuel}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Catalogue Area */}
          <section className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4 border-b border-gray-100 pb-4">
              <div>
                <h1 className="text-3xl font-extrabold text-[#131b2e] tracking-tight">Available Inventory</h1>
                <p className="text-gray-500 mt-1">
                  {loading
                    ? "Searching certified vehicles..."
                    : `Showing ${filteredAndSortedCars.length} premium pre-owned vehicles`}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto text-sm font-semibold">
                <span className="text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border-none bg-transparent font-bold text-[#0e158d] focus:ring-0 cursor-pointer outline-none"
                >
                  <option>Latest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Mileage: Lowest</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="w-full text-center py-24 text-gray-500 font-bold">
                Loading Saraswati Inventory...
              </div>
            ) : filteredAndSortedCars.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 shadow-sm">
                <SlidersHorizontal className="mx-auto mb-4 text-gray-300" size={48} />
                <h3 className="text-lg font-bold mb-2 text-[#131b2e]">No Matching Vehicles Found</h3>
                <p className="text-sm max-w-md mx-auto mb-6">We couldn't find any certified pre-owned cars matching your search filters. Try clearing some selections.</p>
                <button
                  onClick={resetFilters}
                  className="bg-[#0e158d] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2b33a2]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredAndSortedCars.slice(0, visibleCount).map(car => (
                  <div
                    key={car.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-sm"
                  >
                    {/* Media */}
                    <div className="relative h-60 overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        alt={`${car.make} ${car.model}`}
                        src={car.image_url}
                      />
                      {car.badge && (
                        <span className="absolute top-4 left-4 bg-[#0e158d] text-white px-3 py-1 text-xs font-bold rounded shadow-md">
                          {car.badge}
                        </span>
                      )}
                      <button
                        onClick={() => toggleFavorite(car.id)}
                        className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors text-[#0e158d]"
                      >
                        <Heart size={16} fill={favorites[car.id] ? "#0e158d" : "transparent"} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#131b2e]">{car.make} {car.model}</h3>
                          <p className="text-gray-500 text-xs font-semibold mt-1">{car.variant} | {car.transmission} | {car.fuel_type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#0e158d]">₹{car.price_lakh} Lakh</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 my-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span>{car.year} Model</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gauge size={16} className="text-gray-400" />
                          <span>{car.mileage_km.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="truncate">{car.location.split(",")[0]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-[#0e158d]" />
                          <span className="font-semibold text-[#0e158d]">Certified</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-auto pt-6 border-t border-gray-100">
                        <a
                          href={`/truevalue/vehicle/${car.id}`}
                          className="w-full py-3 bg-[#0e158d] text-white font-bold text-sm rounded-lg hover:bg-[#2b33a2] text-center block"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Option */}
            {!loading && filteredAndSortedCars.length > visibleCount && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="bg-[#0e158d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2b33a2] transition-colors shadow-md text-sm"
                >
                  Load More
                </button>
              </div>
            )}

          </section>

        </div>
      </main>
    </div>
  );
}
