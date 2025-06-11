import React from "react";
import { motion } from "motion/react";
// Example partners array (you can replace this with real data)
const partners = [
  {
    id: 2,
    name: "Vercel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
  },
  {
    id: 3,
    name: "GitHub",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
  {
    id: 4,
    name: "Figma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
  {
    id: 5,
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    id: 6,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
];

// Duplicate the partners array to create a seamless loop
const duplicatedPartners = [...partners, ...partners];

const MeetOurPartner = () => {
  return (
    <section className="py-10 overflow-hidden bg-base-200" id="partners">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl font-bold text-primary mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Partners
        </motion.h2>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden py-8">
          {/* Gradient fade effects on sides (optional) */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`} // Better key than Math.random()
                className="flex-shrink-0 mx-8 flex flex-col items-center"
                style={{ width: "200px" }}
              >
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-32 h-32 object-contain"
                  />
                  <h3 className="text-lg font-semibold text-primary mt-4">
                    {partner.name}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurPartner;
