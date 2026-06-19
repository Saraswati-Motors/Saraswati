import { motion } from "framer-motion";
import SmartImage from "../components/SmartImage";

export default function AboutUs() {

  const cards = [
    {
      title: "Legacy Since 1992",
      image: "/about/1.webp",
      long:
        "Founded in 1992, Saraswati Group began with Hero and grew into one of Prayagraj’s most respected business houses. Built on integrity and long-term relationships, our foundation continues to guide every milestone."
    },
    {
      title: "Trusted Global Names",
      image: "/about/2.webp",
      long:
        "What began with Hero evolved into partnerships with iconic brands like Maruti Suzuki and Nexa and soon, Holiday Inn. Each step reflects our commitment to aligning with globally trusted names."
    },
    {
      title: "Customer First. Always.",
      image: "/about/3.webp",
      long:
        "At Saraswati Group, every interaction is guided by transparency, service quality, and long-term value. From first inquiry to ongoing support, we focus on delivering seamless experiences that build lasting confidence."
    },
    {
      title: "Growth with Responsibility",
      image: "/about/4.webp",
      long:
        "Beyond business growth, we invest in community nourishment initiatives and meaningful social responsibility programs. As we expand into future ventures, our values remain rooted in integrity and purpose."
    }
  ];

  return (
    <section className="relative bg-[#fff7e1] py-24 px-6 text-center overflow-hidden">

      {/* Heading */}
      <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
        WHO WE ARE
      </h2>

      <p className="text-xl max-w-6xl mx-auto text-gray-700 mb-20">
        Delivering quality, reliability, and service across every industry we serve.
      </p>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">

        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="relative rounded-xl overflow-hidden shadow-xl group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            {/* Background Image */}
            <SmartImage
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30" />

            {/* Content */}
            <div className="relative z-10 p-8 text-left text-white flex flex-col justify-end min-h-[350px]">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {card.title}
              </h3>

              <p className="text-base md:text-lg leading-relaxed opacity-95">
                {card.long}
              </p>
            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}