import React from "react";

export default function Leader() {
  return (
    <section className="leader">
      
      {/* IMAGE */}
      <div className="leader__imageWrapper">
        <img
          src="/nana.webp"
          alt="Mr. G.P Srivastava - Founder and Chairman, Saraswati Group"
          className="leader__image"
        />
      </div>

      {/* CONTENT */}
      <div className="leader__content">

        {/* opening quote */}
        <span className="leader__quote leader__quote--start">“</span>

        <h1 className="leader__heading">
          श्रेष्ठ कर्म, श्रेष्ठ जीवन। जैसा हमारा प्रयास, वैसा ही हमारा परिणाम।
        </h1>

        {/* closing quote */}
        <span className="leader__quote leader__quote--end">”</span>

        <p className="leader__sub">
          Mr. G.P Srivastava | 1st September 1954 – Forever | Founder and Chairman
        </p>
      </div>

    </section>
  );
}