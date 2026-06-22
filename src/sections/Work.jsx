"use client";

import React from "react";
import { Carousel, Card } from "../components/apple-cards-carousel";

const data = [
  {
    category: "Automobile",
    title: "Hero MotoCorp",
    src: "/work/hero1.webp",
    link: "https://www.hero.com/",
    content: <p>Hero MotoCorp stands as a global leader in the two-wheeler industry, recognized for its quality engineering, innovation, and customer trust. Its vehicles are designed to deliver performance, efficiency, and durability for everyday riders.
      Our branches in Rajapur and Old Prayagraj extend this legacy by providing complete sales and service solutions. Whether it’s purchasing a new vehicle or maintaining it over time, our team ensures a seamless, reliable, and customer-focused experience at every step.</p>,
  },
  {
    category: "Automobile",
    title: "Vida ",
    src: "/work/vida1.webp",
    link: "https://www.vidamotors.com/",
    content: <p>VIDA, the electric vehicle brand by Hero MotoCorp, focuses on delivering smart, eco-friendly, and efficient mobility solutions. With a vision for a greener future, it offers a new way of riding that blends performance with sustainability.

      At our Rajapur and Old Prayagraj branches, we provide both sales and service for VIDA, making it convenient for customers to adopt and maintain electric vehicles with confidence and ease.</p>,
  },
  /*{
    category: "Automobile",
    title: "Harley Davidson",
    src: "/work/harley.webp", //x440
    link: "https://www.heromotocorp.com/en-in/hd/x440-launch.html",
    content: <p>The Harley-Davidson X440 is a result of the partnership between Hero MotoCorp and Harley-Davidson, bringing together global design and trusted engineering. Launched in 2023, it offers a strong road presence along with practical performance for Indian riders.
      You can explore it at our Rajapur branch.
    </p>,
  }*/
  {
    category: "Automobile",
    title: "Maruti Suzuki Arena",
    src: "/work/arena.webp",
    link: "https://www.marutisuzuki.com/",
    content: <p>Maruti Suzuki Arena represents trust, efficiency, and everyday practicality, offering a wide range of cars designed for Indian customers. It is known for delivering a seamless and customer-friendly buying experience.

      We operate our Arena sales network through a Main Outlet in Prayagraj, an E-Outlet in Manjhanpur, and Rural Outlets at Lalganj, Koraon, Kunda , Meja, Chayal , and Muratganj, making vehicle purchases convenient and accessible.</p>,
  },
  {
    category: "Premium Auto",
    title: "Nexa Experience",
    src: "/work/nexa.webp",
    link: "https://www.nexaexperience.com/",
    content: <p>NEXA, the premium retail channel of Maruti Suzuki, is known for its sophisticated experience, advanced technology, and high-quality vehicles. It reflects a more refined and customer-centric approach to automotive ownership.

      Our NEXA service network operates through the Andhawa Showroom and Manjhanpur, where we provide dedicated service support, ensuring quality maintenance and a seamless ownership experience for every customer.</p>,
  },
  {
    category: "Training",
    title: "Driving School",
    src: "/work/msds2.webp",
    link: "https://www.msdsindia.com/",
    content: <p>Maruti Suzuki Driving School is designed to promote safe and confident driving through structured training programs and modern learning techniques. It focuses on building responsible drivers with practical skills and road awareness.

      Our Driving School at Lohia Marg, Prayagraj offers professional training with certified instructors, ensuring a safe, guided, and confidence-building learning experience for every learner.</p>,
  },
  {
    category: "Pre-Owned",
    title: "TrueValue",
    src: "/work/tv.webp",
    link: "https://www.truevalue.com/",
    content: <p>Maruti Suzuki True Value is the certified pre-owned car platform by Maruti Suzuki, known for offering quality-checked and reliable used vehicles. It ensures transparency, trust, and a hassle-free buying experience for customers looking for pre-owned cars.

      Saraswati Motors, Jhunsi, Prayagraj operates as a True Value outlet, offering a wide range of pre-owned Maruti Suzuki vehicles, including hatchbacks, sedans, SUVs, and vans, with assured quality and dependable support.</p>,
  },
  {
    category: "Commercial",
    title: "Maruti Suzuki Commercial",
    src: "/work/commercial.webp",
    link: "https://www.marutisuzuki.com/commercial-vehicles",
    content: <p>Maruti Suzuki Commercial offers a wide range of reliable and efficient commercial vehicles, including the Super Carry, EECO Cargo, and the Tour series (H1, H3, M, S, V) in both petrol and CNG variants. Designed for performance, durability, and cost-effectiveness, these vehicles cater to diverse business needs.

      Our Maruti Suzuki Commercial sales outlet in Naini, Prayagraj, Uttar Pradesh provides dedicated support to help customers choose the right vehicle, ensuring a smooth and efficient buying experience.</p>,
  },
  {
    category: "Service Centers",
    title: "Service Centers for All Brands",
    src: "/work/service1.webp",
    link: "#",
    content: <p>Maruti Suzuki is known for its strong and reliable service network, ensuring quality maintenance and consistent customer support.

      Our Maruti Service Points are located at Teliyarganj, Sarpatipur, Manjhanpur, Chayal, Kunda, Meja, Koraon, Mooratganj, and Lalganj, providing convenient and efficient service access.

      For premium vehicles, NEXA Service at Andhawa and Manjhanpur offers specialized care aligned with high service standards.

      Additionally, our Hero service centers at Rajapur and Old Prayagraj provide dependable two-wheeler servicing and maintenance.
    </p>,
  },
  {
    category: "Hospitality",
    title: "Holiday Inn (Upcoming)",
    src: "/work/inn.webp",
    link: "https://www.holidayinn.com/",
    content: <p>Our upcoming Holiday Inn project reflects a step towards premium hospitality, bringing globally recognized standards of comfort, service, and modern infrastructure. Known for its quality experience and customer-focused approach, Holiday Inn represents reliability and excellence in the hospitality industry.

      Located in Prayagraj, this project is designed to offer a refined stay experience with well-planned amenities and high service standards, catering to both business and leisure travelers.</p>,
  },
];

export default function Work() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="w-full py-24">

      <h2 className="max-w-7xl mx-auto text-center text-5xl md:text-6xl font-bold mb-6">
        WHAT WE DO
      </h2>

      <p className="text-center text-xl max-w-6xl mx-auto mb-16 text-gray-700">
        We bring together trusted brands and industries into one unified ecosystem,
        delivering value that moves people, businesses, and possibilities forward.
      </p>

      <Carousel items={cards} />

    </section>
  );
}