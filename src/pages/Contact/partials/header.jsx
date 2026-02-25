import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import images from "../../../constants/Images";

export default function Header() {
  return (
    <header className="relative w-full max-w-7xl mx-auto h-[400px] md:h-[450px] overflow-hidden rounded-4xl border border-(--border-color) bg-(--bg-secondary) shadow-2xl">
      <div className="absolute inset-0 z-0">
        <img
          src={images.contactrip}
          alt="Contact Support"
          className="w-full h-full object-cover opacity-60 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-logo-dark/95 via-logo-dark/60 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center px-8 sm:px-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-logo-sky/20 backdrop-blur-xl border border-logo-sky/30 text-white text-xs font-black uppercase tracking-[0.2em]"
          >
            <MessageCircle size={14} />
            We&apos;re Here to Help
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 drop-shadow-2xl">
            Get in{" "}
            <span className="bg-linear-to-r from-logo-sky to-blue-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
            Have questions or need a custom itinerary? Our travel experts are
            dedicated to planning your perfect Moroccan adventure.
          </p>

          <Link
            to="/destinations"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-logo-sky px-10 py-5 font-black text-lg text-white shadow-2xl shadow-logo-sky/30 transition-all duration-300 hover:shadow-logo-sky/50 hover:-translate-y-1 active:scale-95"
          >
            Explore Options
            <ArrowRight
              size={22}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* Decorative corner element */}
      <div className="absolute bottom-0 right-0 p-8 hidden md:block">
        <div className="flex items-center gap-4 text-white/40 font-black text-[10px] uppercase tracking-[0.3em] rotate-90 origin-right translate-y-full">
          Support Available 24/7 <div className="w-12 h-px bg-white/20" />
        </div>
      </div>
    </header>
  );
}
