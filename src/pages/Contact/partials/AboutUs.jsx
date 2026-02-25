import { useState } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_ewgj6b3",
        "template_r1yzf6x",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        "PABmfc4CanT8Q0_x2",
      )
      .then(() => {
        alert("Message sent successfully ");
        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong ");
        setLoading(false);
      });
  };

  const infoCards = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "hello@yallatrip.com",
      sub: "We reply within 24h",
    },
    {
      icon: FaPhoneAlt,
      title: "Phone",
      value: "+212 5 00 00 00 00",
      sub: "Mon - Fri, 9am - 6pm",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Office",
      value: "123 Travel Lane, Tourism District",
      sub: "Casablanca, Morocco",
    },
    {
      icon: FaClock,
      title: "Hours",
      value: "Mon - Fri: 9am - 6pm",
      sub: "Sat: 10am - 4pm",
    },
  ];

  return (
    <section className="w-full py-14 md:py-20 px-4 relative">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-2xl bg-(--bg-main) shadow-(--card-shadow) p-6 transition-all duration-300 hover:bg-logo-sky/5 hover:shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-logo-sky/10 flex items-center justify-center text-logo-sky transition-colors duration-300 group-hover:bg-logo-sky/20">
                  <card.icon size={24} />
                </div>
                <div>
                  <h3 className="font-black text-(--text-main) text-lg">
                    {card.title}
                  </h3>
                  <p className="text-sm text-(--text-main) font-bold opacity-80 mt-0.5">
                    {card.value}
                  </p>
                  <p className="text-[10px] text-(--text-main) font-black uppercase tracking-widest opacity-40 mt-1">
                    {card.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2.5rem] bg-(--bg-main) shadow-2xl p-7 sm:p-10"
          >
            <h2 className="text-3xl  text-(--text-main) mb-8 tracking-tight">
              Send a Message
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full rounded-2xl bg-(--bg-main) border-none! px-6 py-4 text-sm text-(--text-main) placeholder-(--text-main)/30 focus:ring-2 focus:ring-logo-sky/40 outline-none transition font-black shadow-sm"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                  className="w-full rounded-2xl bg-(--bg-main) border-none! px-6 py-4 text-sm text-(--text-main) placeholder-(--text-main)/30 focus:ring-2 focus:ring-logo-sky/40 outline-none transition font-black shadow-sm"
                />
              </div>

              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-2xl bg-(--bg-main) px-6 py-4 text-sm text-(--text-main) focus:ring-2 focus:ring-logo-sky/40 outline-none transition font-black shadow-sm cursor-pointer pr-12"
                >
                  <option>General Inquiry</option>
                  <option>Booking</option>
                  <option>Support</option>
                </select>
                {/* Custom chevron */}
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-logo-sky">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you plan your trip?"
                required
                className="w-full rounded-2xl bg-(--bg-main) border-none! px-6 py-5 min-h-[160px] text-sm text-(--text-main) placeholder-(--text-main)/30 focus:ring-2 focus:ring-logo-sky/40 outline-none transition font-black shadow-sm"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-logo-sky to-logo-dark text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-logo-sky/10 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100"
              >
                <FaPaperPlane size={18} />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl bg-(--bg-main)">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.058438495082!2d-7.531276775333607!3d33.6037881733292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cdb2f812837f%3A0xbbcfc74fbc11b2d9!2sLionsGeek!5e0!3m2!1sar!2sma!4v1771409671093!5m2!1sar!2sma"
                className="w-full h-64"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-[2.5rem] bg-(--bg-main) shadow-(--card-shadow) p-8"
            >
              <h4 className="font-black text-(--text-main) text-lg mb-6 uppercase tracking-widest">
                Follow our journeys
              </h4>
              <div className="flex gap-4">
                {[FaFacebookF, FaInstagram, FaYoutube, FaTwitter].map(
                  (Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-(--bg-main) text-(--text-main) opacity-60 hover:opacity-100 hover:text-logo-sky shadow-sm transition-all duration-300 cursor-pointer"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ),
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
