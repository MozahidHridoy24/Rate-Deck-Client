import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Ava Thompson",
    title: "Freelance Designer",
    message:
      "RateDeck helped me find reliable developers for my portfolio projects. The reviews made it easy to choose the right person!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Daniel Carter",
    title: "Startup Founder",
    message:
      "Thanks to RateDeck, we’ve built long-term partnerships with top-rated freelancers in marketing and web development.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Reyes",
    title: "Photographer",
    message:
      "I found my dream clients through RateDeck. It’s now the only place I use for promoting my services!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-10 bg-base-200 mt-1">
      <div className="w-11/12 mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-10">
          Success Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-base-100 shadow-xl rounded-xl p-6 relative text-left"
            >
              <FaQuoteLeft className="text-3xl text-primary mb-4" />
              <p className="text-gray-700 mb-6">{t.message}</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-base-content">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
