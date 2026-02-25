import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import HeroDestinations from "../Trajet/partials/HeroTrajet";
import CardDestinations from "../Trajet/partials/CardTrajet";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { destinationsData } from "../../json/trajetsData";

const categories = [
  "All",
  "City Tours",
  "Desert Safari",
  "Beach Escapes",
  "Adventure",
];

function Destinations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const cardsRef = useRef(null);

  const filteredDestinations =
    activeCategory === "All"
      ? destinationsData
      : destinationsData.filter((t) => t.category === activeCategory);

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Navbar />

      <div className="bg-(--bg-main) min-h-screen transition-colors duration-500">
        <div
          className="absolute inset-0 opacity-20 dark:opacity-100 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--logo-sky, #31A8D0) 0%, transparent 45%), radial-gradient(circle at 80% 70%, var(--logo-soft, #85B0BF) 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto space-y-10 container py-10">
          <HeroDestinations onExploreClick={scrollToCards} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-sm font-black transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-logo-sky text-white shadow-xl shadow-logo-sky/30"
                    : "bg-(--bg-main) text-(--text-main) opacity-60 hover:opacity-100 hover:text-logo-sky shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDestinations.map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <CardDestinations route={route} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Destinations;
