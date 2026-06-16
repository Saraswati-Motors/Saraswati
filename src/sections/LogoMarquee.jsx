export default function LogoMarquee() {
  const logos = [
    "/hero.png",
    "/vida.png",
    "/harley.png",
    "/Maruti suzuki.png",
    "/arena.png",
    "/nexa-bg.png",
    "/commercial.png",
    "/msds.png",
    "/truevalue.png",
    "/holidayinn.png",
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
                src={logo}
                alt="brand logo"
                className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition"
                
                />
            ))
         )}
        </div>

      </div>
    </section>
  );
}