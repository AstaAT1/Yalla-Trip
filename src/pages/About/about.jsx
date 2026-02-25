import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Compass,
  Heart,
} from "lucide-react";
import images from "../../constants/Images";
import AboutMemoriesGallery from "../../components/AboutMemoriesGallery";
import AboutServicesTabs from "../../components/AboutServicesTabs.jsx";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ChatBot } from "../../components/chatBot.jsx";

function About() {
  return (
    <div className="min-h-screen bg-(--bg-main) selection:bg-logo-sky/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-20 md:space-y-32">
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-4xl bg-(--bg-main) shadow-2xl"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={images.aboutrip}
              alt="About Yalla Trip"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-logo-dark/90 via-logo-dark/40 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-20 text-center flex flex-col items-center min-h-[450px] justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-logo-sky/20 backdrop-blur-xl border border-logo-sky/30 text-white text-xs font-black uppercase tracking-[0.2em]"
            >
              <Sparkles size={14} />
              Our Story & Mission
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter drop-shadow-2xl"
            >
              Redefining{" "}
              <span className="bg-linear-to-r from-logo-sky to-blue-400 bg-clip-text text-transparent">
                Adventure
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium mb-10"
            >
              Connecting you to cultures and unforgettable adventures. Join a
              community of 50k+ travelers exploring the magic of Morocco.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                to="/destinations"
                className="group flex items-center gap-3 rounded-2xl bg-logo-sky px-8 py-5 font-black text-white shadow-2xl shadow-logo-sky/30 transition-all duration-300 hover:shadow-logo-sky/50 hover:-translate-y-1 active:scale-95 text-lg"
              >
                Explore Destinations
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* STATS SECTION */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Destinations", value: "50+", icon: Compass },
            { label: "Travelers", value: "12k+", icon: Heart },
            { label: "Experiences", value: "200+", icon: Sparkles },
            { label: "Community", value: "100%", icon: MessageSquare },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-(--bg-main) text-center group hover:bg-(--color-accent)/5 transition-all shadow-(--card-shadow)"
            >
              <div className="w-12 h-12 rounded-2xl bg-logo-sky/10 text-logo-sky flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-black text-(--text-primary) mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-(--text-tertiary)">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </section>

        {/* SERVICES SECTION */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-logo-sky/10 text-logo-sky text-[10px] font-black uppercase tracking-widest mb-4">
                Our Expertise
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-(--text-primary) tracking-tight">
                Crafting Your <br /> Perfect Experience
              </h2>
            </div>
            <p className="text-lg text-(--text-secondary) font-medium max-w-sm">
              Everything you need to travel smarter, safer, and more connected.
              Our platform is built by travelers, for travelers.
            </p>
          </div>
          <AboutServicesTabs />
        </section>

        {/* GALLERY SECTION */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl font-black text-(--text-primary) tracking-tight">
                Travel Memories
              </h2>
              <p className="mt-4 text-(--text-secondary) font-medium text-lg">
                Snapshots from our community around Morocco.
              </p>
            </div>
            <Link
              to="/destinations"
              className="text-logo-sky font-black hover:underline underline-offset-8 decoration-2 flex items-center gap-2 group"
            >
              Join the adventure{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-4xl overflow-hidden bg-(--bg-main) p-6 md:p-10 shadow-inner"
          >
            <AboutMemoriesGallery />
          </motion.div>
        </section>

        {/* FINAL CTA */}
        <motion.section
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.98 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-4xl bg-linear-to-br from-logo-sky to-logo-dark p-12 md:p-24 text-center text-white shadow-2xl"
        >
          {/* Decorative icons */}
          <Sparkles
            className="absolute top-10 left-10 text-white/20 animate-pulse"
            size={40}
          />
          <Compass
            className="absolute bottom-10 right-10 text-white/20"
            size={60}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-tight drop-shadow-lg">
              Ready to Write <br /> Your Next Chapter?
            </h3>
            <p className="text-xl text-white/80 font-medium mb-12 max-w-xl mx-auto">
              Join thousands of travelers who have discovered the true spirit of
              Morocco. Your journey begins with a single click.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link
                to="/destinations"
                className="bg-white text-logo-dark px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-white/90 hover:-translate-y-1 transition-all active:scale-95"
              >
                Browse Trips
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all active:scale-95"
              >
                Talk to Experts
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default About;
