export default function LogoMarquee() {
  const logos = [
    { src: "/hero.webp", name: "Hero MotoCorp" },
    { src: "/vida.webp", name: "Vida Electric Scooter" },
    { src: "/Maruti suzuki.webp", name: "Maruti Suzuki" },
    { src: "/arena.webp", name: "Maruti Suzuki Arena" },
    { src: "/nexa-bg.webp", name: "Maruti Suzuki Nexa" },
    { src: "/commercial.webp", name: "Maruti Suzuki Commercial" },
    { src: "/msds.webp", name: "Maruti Suzuki Driving School" },
    { src: "/truevalue.webp", name: "Maruti Suzuki True Value" },
    { src: "/holidayinn.webp", name: "Holiday Inn" },
  ];

  return (
    <section className="w-full overflow-hidden bg-[#fefdf3] py-6">
      <div className="relative flex">

        {/* scrolling container */}
        <div className="flex animate-marquee gap-20 whitespace-nowrap">
          {Array.from({ length: 10 }, (_, i) =>
            logos.map((logo, j) => (
              <img
                key={`${i}-${j}`}
                src={logo.src}
                alt={`${logo.name} Logo`}
                className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition"

              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}