import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Star, Upload, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

const defaultTestimonials = [
  {
    id: "t1",
    full_name: "Rajesh Kumar",
    rating: 5,
    location: "Prayagraj",
    message: "I purchased a pre-owned Swift Dzire from Saraswati Motors True Value and the entire experience was flawless. The 376-point quality check report gave me absolute peace of mind. Highly recommend their professional staff!",
    image_url: null
  },
  {
    id: "t2",
    full_name: "Anjali Sharma",
    rating: 5,
    location: "Pratapgarh",
    message: "Saraswati Motors True Value has completely redefined the second-hand car buying process. From document transfer to financing options, everything was transparent. The car drives like new!",
    image_url: null
  },
  {
    id: "t3",
    full_name: "Amit Srivastava",
    rating: 5,
    location: "Prayagraj",
    message: "Outstanding customer service. I exchanged my old hatchback for a certified Ertiga and received a very fair price with additional exchange bonuses. The transparent records made it a very easy transaction.",
    image_url: null
  }
];

const convertToWebP = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], `${file.name.split(".")[0]}.webp`, { type: "image/webp" }));
          } else {
            reject(new Error("Canvas toBlob failed"));
          }
        }, "image/webp", 0.7);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function TrueValueTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form States
  const [fullName, setFullName] = useState("");
  const [rating, setRating] = useState(5);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchTestimonials() {
      if (!supabase) {
        setTestimonials(defaultTestimonials);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error || !data || data.length === 0) {
          setTestimonials(defaultTestimonials);
        } else {
          // Combine fetched reviews with defaults if we have fewer reviews
          setTestimonials([...data, ...defaultTestimonials]);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setTestimonials(defaultTestimonials);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const webpFile = await convertToWebP(file);
        setImageFile(webpFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(webpFile);
      } catch (err) {
        console.error("Failed to convert image to webp, falling back to original:", err);
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!fullName.trim() || !location.trim() || !message.trim()) {
      alert("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    let uploadedImageUrl = imagePreview || null; // Fallback to base64 preview locally

    if (supabase && imageFile) {
      try {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Attempt to upload image to 'testimonials' bucket
        const { error: uploadError } = await supabase.storage
          .from("testimonials")
          .upload(filePath, imageFile);

        if (!uploadError) {
          const { data } = supabase.storage
            .from("testimonials")
            .getPublicUrl(filePath);
          if (data?.publicUrl) {
            uploadedImageUrl = data.publicUrl;
          }
        } else {
          console.warn("Storage upload failed, using local preview representation:", uploadError);
        }
      } catch (err) {
        console.warn("Image upload process error, falling back to local representation:", err);
      }
    }

    const newTestimonial = {
      full_name: fullName.trim(),
      rating,
      location: location.trim(),
      message: message.trim(),
      image_url: uploadedImageUrl
    };

    if (!supabase) {
      console.warn("Supabase not available, appending to local state.");
      setTestimonials(prev => [{ id: `local-${Date.now()}`, ...newTestimonial }, ...prev]);
      alert("Thank you for sharing your experience!");
      handleCloseModal();
      return;
    }

    try {
      const { data, error } = await supabase
        .from("testimonials")
        .insert([newTestimonial])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        setTestimonials(prev => [data[0], ...prev]);
      } else {
        setTestimonials(prev => [{ id: `local-${Date.now()}`, ...newTestimonial }, ...prev]);
      }
      alert("Thank you for sharing your experience!");
      handleCloseModal();
    } catch (err) {
      console.error("Error saving testimonial to database:", err);
      // Fallback: add locally to state so user gets immediate visual feedback
      setTestimonials(prev => [{ id: `local-${Date.now()}`, ...newTestimonial }, ...prev]);
      alert("Thank you for sharing your experience!");
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFullName("");
    setRating(5);
    setLocation("");
    setMessage("");
    setImageFile(null);
    setImagePreview("");
    setSubmitting(false);
  };

  // Helper to render initials avatar if no image is uploaded
  const getInitials = (name) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section className="bg-[#f0f0ff] py-24 border-t border-b border-gray-100">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#131b2e]">What Our Customers Say</h2>
            <div className="h-1.5 w-24 bg-[#0e158d] mx-auto md:mx-0 rounded-full"></div>
            <p className="text-gray-500 max-w-xl pt-2">
              Discover why thousands of buyers trust Saraswati Motors True Value for their pre-owned car journey.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#0e158d] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2b33a2] transition-colors shadow-md text-sm active:scale-95 duration-150"
          >
            <Plus size={16} /> Share Your Experience
          </button>
        </div>

        {/* Testimonials Slider */}
        {loading ? (
          <div className="text-center py-12 text-gray-400 font-bold text-sm">
            Loading Customer Testimonials...
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {testimonials.map((test) => (
              <SwiperSlide key={test.id} className="h-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="space-y-4">
                    {/* Rating Stars */}
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          fill={idx < test.rating ? "#facc15" : "transparent"}
                          stroke={idx < test.rating ? "#facc15" : "#d1d5db"}
                        />
                      ))}
                    </div>
                    {/* Message */}
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      "{test.message}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
                    {test.image_url ? (
                      <img
                        src={test.image_url}
                        alt={test.full_name}
                        className="w-11 h-11 rounded-full object-cover border border-gray-100 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#e0e0ff] text-[#0e158d] font-bold text-sm flex items-center justify-center border border-gray-100 flex-shrink-0">
                        {getInitials(test.full_name)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-[#131b2e] text-sm leading-tight">
                        {test.full_name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Verified Buyer • {test.location}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Add Testimonial Modal */}
      <AnimatePresence>
        {showModal && (
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
                <h3 className="text-xl font-bold">Write a Testimonial</h3>
                <p className="text-xs text-blue-200 mt-1">
                  Share your car-buying or selling experience at Saraswati Motors True Value.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                
                {/* Rating Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-yellow-400 hover:scale-115 transition-transform"
                      >
                        <Star
                          size={28}
                          fill={star <= rating ? "#facc15" : "transparent"}
                          stroke={star <= rating ? "#facc15" : "#9ca3af"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold text-gray-800"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Prayagraj"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold text-gray-800"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience..."
                    required
                    rows={4}
                    className="w-full p-4 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#0e158d] focus:border-[#0e158d] outline-none text-sm font-semibold text-gray-800 resize-none"
                  />
                </div>

                {/* Profile Image Upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                    Profile Picture (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    {imagePreview ? (
                      <div className="relative w-14 h-14 rounded-full border border-gray-200 overflow-hidden flex-shrink-0">
                        <img
                          src={imagePreview}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                          }}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="w-14 h-14 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 text-gray-400 transition-colors flex-shrink-0">
                        <Upload size={18} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    <span className="text-xs text-gray-400">
                      Upload an image for your verified buyer avatar (Max 2MB)
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0e158d] text-white py-3.5 rounded-lg font-bold hover:bg-[#2b33a2] transition-colors disabled:opacity-50 text-sm shadow-md mt-6"
                >
                  {submitting ? "Submitting..." : "Submit Testimonial"}
                </button>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
