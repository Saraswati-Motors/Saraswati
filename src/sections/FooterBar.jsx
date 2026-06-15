import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
  IconPhone
} from "@tabler/icons-react";

export default function FooterBar() {

  const socials = [
    {
      icon: <IconBrandInstagram size={20} />,
      href: "https://www.instagram.com/saraswatimotorsgroup?igsh=MThsemNtdWE5cDVxcg=="
    },
    {
      icon: <IconMail size={20} />,
      href: "mailto:contact@smlindia.in"
    },
    {
      icon: <IconPhone size={20} />,
      href: "tel:+9180908254001"
    },
    {
      icon: <IconBrandFacebook size={20} />,
      href: "https://www.facebook.com/share/1CK1HRrjf4/?mibextid=wwXIfr"
    }
  ];

  return (
    <div className="w-full bg-black text-white py-8 px-6 md:px-10">

      {/* TOP ROW */}
      <div className="
        flex flex-col md:flex-row
        items-center md:items-center
        justify-between
        gap-6
      ">

        {/* LEFT - LOGO */}
        <div className="flex items-center gap-3">
          <img src="/saraswati1.png" className="h-16" />
        </div>

        {/* RIGHT - DOCK */}
        <div className="bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 flex items-center gap-6">

          {socials.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full
                text-white
                hover:bg-white/20
                hover:scale-110
                transition duration-300
              "
            >
              {item.icon}
            </a>
          ))}

        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10 my-6"></div>

      {/* BOTTOM */}
      <div className="
        flex flex-col md:flex-row
        items-center
        justify-center 
        text-sm text-white/60
        gap-3
        text-center
      ">
        <p>© 2024 Saraswati. All rights reserved.</p>
      </div>

    </div>
  );
}