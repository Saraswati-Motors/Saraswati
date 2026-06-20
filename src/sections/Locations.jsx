import { useState, useMemo } from "react";

/* LOCATIONS DATA */
const allLocations = [
  {
    city: "Prayagraj",
    name: "Maruti Suzuki Arena (Head Office)",
    type: "Dealership",
    category: "Arena",
    contact: "08071645716",
    address: "13, 11/5C, Dr Lohia Rd, Lohiya Marg, Prayagraj, Uttar Pradesh 211001",
    lat: 25.4599653,
    lng: 81.8297893,
    mapQuery: "Saraswati Motors Maruti Suzuki Arena Lohiya Marg Prayagraj"
  },
  {
    city: "Prayagraj",
    name: "Hero MotoCorp Rajapur",
    type: "Dealership",
    category: "Hero MotoCorp",
    contact: "09289922066",
    address: "No 44, Muir Rd, Om Nagar, Rajapur, Hanumanthpuram, Prayagraj, Uttar Pradesh 211002",
    lat: 25.4665568,
    lng: 81.8325585,
    mapQuery: "Saraswati Motors Hero MotoCorp Rajapur Prayagraj"
  },
  {
    city: "Prayagraj",
    name: "Hero MotoCorp Old Prayagraj",
    type: "Dealership",
    category: "Hero MotoCorp",
    contact: "09415324203",
    address: "Mansarovar Crossing 4, Shiv Charan Lal Rd, Prayagraj, Uttar Pradesh 211003",
    lat: 25.446983145718715,
    lng: 81.84113523182693,
    mapQuery: "Saraswati Motors Shiv charan lal road, gosai tola, south malaka, prayagraj"
  },
  {
    city: "Prayagraj",
    name: "True Value Jhunsi",
    type: "Dealership",
    category: "True Value",
    contact: "08037070503",
    address: "Arazi no. 263, Tehsil-Phulpur, Post, Sarai Inayat, Sarfuddinpur, Phulpur, Uttar Pradesh 221505",
    lat: 25.4257207,
    lng: 81.9792643,
    mapQuery: "Saraswati Motors truevalue jhunsi"
  },
  {
    city: "Prayagraj",
    name: "Nexa Andawa",
    type: "Dealership",
    category: "Nexa",
    contact: "08037892034",
    address: "Khasra No.638, Tehsil Phoolpur, Andawa, Prayagraj, Uttar Pradesh 221505",
    lat: 25.4312599,
    lng: 81.9412614,
    mapQuery: "NEXA (Saraswati Motors, Andawa, Prayagraj) Tehsil Phoolpur Andhawa"
  },
  {
    city: "Prayagraj",
    name: "Driving School",
    type: "Dealership",
    category: "Driving School",
    contact: "08090854003",
    address: "13, 11/5C, Dr Lohia Rd, Lohiya Marg, Prayagraj, Uttar Pradesh 211001",
    lat: 25.4617136,
    lng: 81.8291314,
    mapQuery: "Maruti Driving School Saraswati Motors Lohiya Marg Prayagraj"
  },
  {
    city: "Prayagraj",
    name: "Service Center Teliyarganj",
    type: "Service Center",
    category: "Service Center",
    contact: "08929000277",
    address: "MNIT Industrial Estate No 24, Mehdauri Colony, Teliarganj, Prayagraj, Uttar Pradesh 211004",
    lat: 25.4992149,
    lng: 81.8631204,
    mapQuery: "Saraswati Motors Service Center Teliyarganj Prayagraj"
  },
  {
    city: "Meja",
    name: "Arena Meja",
    type: "Dealership",
    category: "Arena",
    contact: "08037580081",
    address: "Meja Road, Meja Tehsil, Prayagraj, Uttar Pradesh 212303",
    lat: 25.2234473,
    lng: 82.0816769,
    mapQuery: "Maruti Suzuki Arena Saraswati Motors Meja Road Prayagraj"
  },
  {
    city: "Koraon",
    name: "Arena Koraon",
    type: "Dealership",
    category: "Arena",
    contact: "08037150007",
    address: "Khasra No.441, Kala (Kheragarh, Baindavar, Koraon, Uttar Pradesh 212306",
    lat: 24.9925660,
    lng: 82.0801856,
    mapQuery: "Saraswati Motors Maruti Suzuki Arena Koraon Prayagraj"
  },
  {
    city: "Manjhanpur",
    name: "Arena Manjhanpur",
    type: "Dealership",
    category: "Arena",
    contact: "08037267211",
    address: "Manjhanpur - Sirathu Rd, Korron, Manjhanpur, Uttar Pradesh 212207",
    lat: 25.5512994,
    lng: 81.3710436,
    mapQuery: "Saraswati Motors Maruti Suzuki Arena Manjhanpur"
  },
  {
    city: "Lalganj",
    name: "Arena Lalganj",
    type: "Dealership",
    category: "Arena",
    contact: "08037150007",
    address: "Sital Mau, Lalganj Ajhara, Kala Kakkad Road, Lalganj, Sekhpur Mansoor Ali, Uttar Pradesh 222139",
    lat: 26.023961090095366,
    lng: 82.76892807979391,
    mapQuery: "Saraswati Motors Maruti Suzuki Arena Lalganj"
  },
  {
    city: "Kunda",
    name: "Arena Kunda",
    type: "Dealership",
    category: "Arena",
    contact: "08037150007",
    address: "FR5H+CXV, Allahabad Lucknow - Prayagraj Road, Kunda, Uttar Pradesh 211001",
    lat: 25.458802446646914,
    lng: 81.82995906933401,
    mapQuery: "Saraswati Motors Maruti Suzuki Arena Kunda"
  }
];

const cities = [...new Set(allLocations.map(l => l.city))];

/* MAIN COMPONENT */
export default function Locations() {
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState(allLocations[0]);

  /* FILTER LOGIC */
  const filtered = useMemo(() => {
    return allLocations.filter(loc =>
      (city ? loc.city === city : true) &&
      (type ? loc.type === type : true) &&
      (category ? loc.category === category : true)
    );
  }, [city, type, category]);

  // Determine which location is currently active/displayed
  const displayedLocation = useMemo(() => {
    return filtered.includes(selected) ? selected : (filtered[0] || allLocations[0]);
  }, [filtered, selected]);

  return (
    <section className="px-6 py-14">
      {/* HEADER */}
      <h2 className="text-center text-5xl md:text-6xl font-bold mb-6">
        OUR LOCATIONS
      </h2>

      <p className="text-center text-lg md:text-xl max-w-4xl mx-auto mb-12 text-gray-600">
        Locate the nearest branch and experience our services up close.
      </p>

      {/* FILTERS */}
      <div className="flex justify-center mb-12">
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-7xl">
          <select value={city} onChange={e => setCity(e.target.value)}
            className="flex-1 border p-4 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">All Cities</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>

          <select value={type} onChange={e => setType(e.target.value)}
            className="flex-1 border p-4 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Visit Type</option>
            <option>Dealership</option>
            <option>Service Center</option>
            <option>Head Office</option>
          </select>

          <select value={category} onChange={e => setCategory(e.target.value)}
            className="flex-1 border p-4 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Showroom</option>
            <option>Arena</option>
            <option>Nexa</option>
            <option>Commercial</option>
            <option>True Value</option>
            <option>Driving School</option>
            <option>Hero MotoCorp</option>
            <option>Service Center</option>
          </select>
        </div>
      </div>

      {/* RESULTS COUNT */}
      <p className="mb-4 text-gray-500 text-center font-medium">
        {filtered.length} location(s) found
      </p>

      {/* LAYOUT */}
      <div className="grid lg:grid-cols-2 gap-8 mx-auto max-w-7xl">
        {/* LIST */}
        <div className="bg-white rounded-xl shadow h-[450px] overflow-y-auto border border-gray-100">
          {filtered.length === 0 && (
            <p className="p-6 text-center text-gray-500">
              No locations match your filters
            </p>
          )}

          {filtered.map((place, i) => (
            <div key={i}
              onClick={() => setSelected(place)}
              className={`p-6 border-b border-gray-100 cursor-pointer transition duration-200
              ${displayedLocation === place ? "bg-red-50/70 border-l-4 border-l-red-600" : "hover:bg-gray-50"}`}>
              <h3 className="font-semibold text-lg text-gray-900">{place.name}</h3>
              <p className="text-gray-600 mt-1 text-sm leading-relaxed">{place.address}</p>
              <p className="text-gray-500 mt-1 text-sm font-medium">Tel: {place.contact}</p>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-block mt-3 text-red-600 text-sm font-semibold hover:text-red-700 transition">
                Get Directions →
              </a>
            </div>
          ))}
        </div>

        {/* MAP */}
        <div className="rounded-xl overflow-hidden shadow h-[450px] bg-gray-100 border border-gray-200">
          <iframe
            title={displayedLocation.name}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(displayedLocation.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          />
        </div>
      </div>
    </section>
  );
}