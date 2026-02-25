import React from "react";
import { Images } from "../../constants/Images";
import { Link } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

function Welcome() {
  return (
    <section className="relative h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center text-center">
      {/* BACKGROUND */}
      <img
        src={Images.were}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10 brightness-[0.7]"
      />

      {/* OVERLAY & GLOWS */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/90 -z-10" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-logo-sky/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-logo-dark/30 rounded-full blur-[150px] -z-10" />

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 w-full z-20 px-6 py-6 flex items-center justify-between">
        <img
          src={Images.logoBlack}
          alt="Logo"
          className="w-24 transition-transform duration-500 hover:scale-105"
        />
        <div className="flex items-center gap-4">
          <Link
            to="/signUp"
            className="inline-block px-5 py-1.5 rounded-full border border-white/60 text-white text-sm transition-all duration-300 hover:bg-white hover:text-black"
          >
            Login
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 tracking-tighter"
        >
          Don't just travel.
          <br />
          <span className="bg-linear-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
            Live the journey.
          </span>
        </motion.h1>

        <p className="text-sm md:text-base text-white/50 max-w-lg mx-auto leading-relaxed font-medium mb-6">
          Yalla Trip connects travelers, trips, and stories. Share your journey
          and discover new destinations together.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/signUp"
            className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-white text-black font-black text-sm shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 active:scale-95"
          >
            Start your trip
            <div className="absolute inset-0 rounded-2xl bg-white blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl px-4">
          <Feature title="Trips & Destinations" delay={0.6} />
          <Feature title="Trip Community" delay={0.7} />
          <Feature title="AI Travel Assistant" delay={0.8} />
        </div>
      </div>
    </section>
  );
}

function Feature({ title, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-5 text-left
                 transition-all duration-500 group
                 hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-logo-sky/20"
    >
      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-3 group-hover:bg-logo-sky/20 transition-colors">
        <Sparkles
          size={16}
          className="text-white group-hover:text-logo-sky transition-colors"
        />
      </div>
      <h3 className="text-base font-black tracking-tight">{title}</h3>
      <p className="mt-1.5 text-white/40 text-[11px] leading-relaxed font-medium">
        Discover bespoke experiences designed for travelers who seek the
        extraordinary.
      </p>
    </motion.div>
  );
}

export default Welcome;
