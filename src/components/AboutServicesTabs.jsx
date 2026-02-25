import { useMemo, useState } from "react";
import { motion } from "motion/react";
import TiltedAboutCard from "./TiltedAboutCard.jsx";
import Images from "../constants/Images.jsx";

export default function AboutServicesTabs() {
  const tabs = useMemo(
    () => [
      {
        key: "all",
        label: "All Communities",
        image: Images.about2_2,
        title: "Our Core Objectives",
        subtitle: "Everything you need to travel smarter — and together.",
        body: [
          "Yalla Trip launched with a simple goal: make travel accessible, authentic, and enriching.",
          "From Casablanca to the world, we help travelers discover not only landmarks, but hidden wonders and real stories.",
        ],
      },
      {
        key: "market",
        label: "Trip Marketplace",
        image: Images.Trip_Marketplace,
        title: "Trip Marketplace",
        subtitle: "Find trips, deals, and ready-to-go experiences.",
        body: [
          "Browse curated destinations, compare options, and book with confidence.",
          "From weekend getaways to long adventures — discover offers that match your vibe.",
        ],
      },
      {
        key: "community",
        label: "Community Trips",
        image: Images.Community_Trips,
        title: "Community Trips",
        subtitle: "Travel with people who share your energy.",
        body: [
          "Join trips hosted by travelers and communities.",
          "Meet new friends, share costs, and build memories together.",
        ],
      },
      {
        key: "planning",
        label: "Trip Planning",
        image: Images.Trip_Planning,
        title: "Trip Planning",
        subtitle: "Plan itineraries, organize days, and keep it simple.",
        body: [
          "Create an itinerary, manage your stops, and keep everything in one place.",
          "Less stress, more exploring — your plan stays clear and flexible.",
        ],
      },
      {
        key: "guides",
        label: "Local Guides",
        image: Images.Local_Guides,
        title: "Local Guides",
        subtitle: "Explore like a local with trusted guides.",
        body: [
          "Connect with local guides for authentic experiences.",
          "Get insider tips, hidden places, and cultural moments you won't find on maps.",
        ],
      },
      {
        key: "support",
        label: "Support & Tips",
        image: Images.Support_Tips,
        title: "Support & Tips",
        subtitle: "Help, safety, and advice for every step.",
        body: [
          "Get travel tips, packing lists, and destination guides.",
          "Need help? Our community and support are here so you never travel alone.",
        ],
      },
    ],
    [],
  );

  const [activeKey, setActiveKey] = useState("all");

  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  return (
    <div>
      {/* TABS */}
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((t, i) => {
          const isActive = t.key === activeKey;

          return (
            <motion.button
              key={t.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onClick={() => setActiveKey(t.key)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={[
                "rounded-xl cursor-pointer px-6 py-3 text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-linear-to-r from-logo-sky to-logo-dark text-white rounded-2xl shadow-xl shadow-logo-sky/20"
                  : "bg-(--bg-main) text-(--text-main) opacity-60 hover:opacity-100 hover:text-logo-sky rounded-2xl shadow-sm",
              ].join(" ")}
            >
              {t.label}
            </motion.button>
          );
        })}
      </div>

      {/* CONTENT */}
      <motion.section
        key={activeKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 grid items-center gap-10 lg:grid-cols-2"
      >
        <div className="rounded-[2.5rem] bg-(--bg-main) p-8 sm:p-12 shadow-(--card-shadow)">
          <h2 className="text-3xl sm:text-4xl font-black text-(--text-main) tracking-tight">
            {active.title}
          </h2>

          <p className="mt-4 text-lg text-(--text-main) font-bold opacity-80">
            {active.subtitle}
          </p>
          <div className="mt-8 space-y-5 text-(--text-main) font-medium opacity-70 leading-relaxed italic">
            {active.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <TiltedAboutCard imageSrc={active.image} height={380} />
        </motion.div>
      </motion.section>
    </div>
  );
}
