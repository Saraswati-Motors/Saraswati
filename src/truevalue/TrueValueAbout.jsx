import { ShieldCheck, History, Award, CheckCircle2, Facebook, Instagram } from "lucide-react";

export default function TrueValueAbout() {
  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Saraswati Motors Maruti Suzuki True Value Showroom"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB50AJiT71Q3OlbFvjq3QXQ40KtUHguqgW0Qn-FXbx_3918keBVuNQ5MUKvYKsaFB7zhVcsQ70FR0fuHcODDKT4_vEP7wv7y1KT2tK5iD8yNGfX7Soau61X-Cg_lhW-AF_--HoLqxZW4Q9yPJ86i9jEN2cWrvuYfGCIDnfd3tJ1WlLr4OgKZSfG-Y4hd-YyyHQxeubKXmkOh4kTjyY4rKcwv_KzGz2EEqH-V0nUcWW1mbi6q86GlWrGmK6rHYVZAZUNiehwhelrmp5t"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#131b2e]/40 to-[#131b2e]/80"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              A Heritage of Trust
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Saraswati Motors has been a cornerstone of automotive excellence for decades. We don't just sell cars; we provide a legacy of reliability and a partnership built on transparency.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e0e0ff] text-[#0e158d]">
                <ShieldCheck size={36} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0e158d]">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To redefine the car-buying experience through unwavering transparency, absolute integrity, and a journey built on honesty. At Saraswati Motors, we believe that every customer deserves a seamless transition into their next vehicle, backed by the assurance of expert quality and verified heritage.
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                  <CheckCircle2 className="text-[#0e158d]" size={20} />
                  <span className="font-semibold text-sm text-gray-700">Upholding Maruti Suzuki's standards of excellence</span>
                </div>
                <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                  <CheckCircle2 className="text-[#0e158d]" size={20} />
                  <span className="font-semibold text-sm text-gray-700">Empowering customers with data-driven history</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover border border-gray-100"
                alt="Executive Handshake - Customer trust and dealership transparency"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9U2cPy3XStJWq6to0jodIHZ3vEpCo6vv-0gDB0SnvOlWRcqItz8XlHbEMtRsO9rQGhM6TccGdbK4369Pz4kfq4-UgR5q0Zh2XbnUJUV6h6sM3zke4WWk1hpsrX_ET6oR9QbWrmBfiiR-iJSIdYcdZQZZ2OyhoZsBl2LkG__jd8LszfpObh9tRqOsz8Od6ShXGP6De5jgFwikMJ0l9KBzlZYKXYzd4bQA95Bgw7CfMDINQ7OWqhp8hjLgwuz_NtI6b4i9J68pdHkrV"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white border-t border-gray-100 py-24">
          <div className="px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                The Saraswati Motors advantage is built on three core pillars that guarantee peace of mind for every buyer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-[#faf8ff] p-10 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="mb-6 text-[#0e158d] group-hover:scale-110 transition-transform duration-300">
                  <Award size={48} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#131b2e]">Quality Checks</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every vehicle undergoes a rigorous 376-point inspection by certified engineers to ensure mechanical and aesthetic perfection.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#faf8ff] p-10 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="mb-6 text-[#0e158d] group-hover:scale-110 transition-transform duration-300">
                  <History size={48} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#131b2e]">Verified History</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Full transparency with comprehensive service records and ownership verification for every single car in our inventory.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#faf8ff] p-10 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="mb-6 text-[#0e158d] group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck size={48} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#131b2e]">Customer Trust</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Over 25 years of serving the community as an authorized Maruti Suzuki True Value dealer with thousands of happy families.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
