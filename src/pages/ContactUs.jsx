import React from "react";

export default function ContactUs() {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">Get in Touch</h2>
          <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
            Have questions or need help? Fill out the form below, and we’ll get
            back to you as soon as possible.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Contact Info */}
          <div className="bg-base-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-secondary mb-6">
              Contact Information
            </h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <span className="bg-primary text-primary-content p-3 rounded-full">
                  📍
                </span>
                <p>123 Main Street, Dhaka, Bangladesh</p>
              </li>
              <li className="flex items-center gap-4">
                <span className="bg-primary text-primary-content p-3 rounded-full">
                  📞
                </span>
                <p>+880 123 456 789</p>
              </li>
              <li className="flex items-center gap-4">
                <span className="bg-primary text-primary-content p-3 rounded-full">
                  ✉️
                </span>
                <p>contact@example.com</p>
              </li>
            </ul>
          </div>

          {/* Right: Contact Form */}
          <form className="bg-base-200 rounded-2xl p-8 shadow-lg space-y-5">
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Write your message..."
                rows={4}
              ></textarea>
            </div>
            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
