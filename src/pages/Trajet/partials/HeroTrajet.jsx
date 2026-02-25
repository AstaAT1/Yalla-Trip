import React, { useState } from "react";
import { motion } from "motion/react";
import { Images } from "../../../constants/Images";
import AboutMasonryGallery from "../../../components/AboutMasonryGallery";
import { Sparkles, ArrowRight, Image as ImageIcon } from "lucide-react";

function HeroDestinations({ onExploreClick }) {
  const [openGallery, setOpenGallery] = useState(false);

  return (
    <>
      <div className="rounded-4xl overflow-hidden bg-(--bg-main) shadow-(--card-shadow) grid md:grid-cols-2 gap-8 md:gap-12 items-center p-8 md:p-14 relative group">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-logo-sky/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

        <div className="relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-logo-sky/10 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-logo-sky" />
            <span className="text-logo-sky text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              Premium Travel Experience
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-(--text-primary) leading-[1.1] mb-6 tracking-tight">
            Discover the Magic of{" "}
            <span className="bg-linear-to-r from-logo-sky to-logo-dark bg-clip-text text-transparent">
              Morocco
            </span>
          </h1>

          <p className="mt-4 text-lg text-(--text-secondary) font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
            Experience vibrant culture, golden deserts, and ancient medinas.
            Your gateway to unforgettable trips starts here.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={onExploreClick}
              className="group/btn flex items-center gap-3 px-8 py-4 rounded-2xl bg-logo-sky text-white font-bold text-lg shadow-2xl shadow-logo-sky/20 transition-all duration-300 hover:shadow-logo-sky/40 hover:-translate-y-1 active:scale-95"
            >
              Explore Trips
              <ArrowRight
                size={20}
                className="transition-transform group-hover/btn:translate-x-1"
              />
            </button>

            <button
              onClick={() => setOpenGallery(true)}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-(--bg-main) text-(--text-main) font-black text-lg hover:text-logo-sky transition-all duration-300 active:scale-95 shadow-sm"
            >
              <ImageIcon size={20} />
              View Gallery
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl z-10"
        >
          <div className="absolute inset-0 bg-linear-to-t from-logo-dark/40 via-transparent to-transparent z-10" />
          <img
            src={Images.trajet0}
            alt="Explore Morocco"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute bottom-6 left-6 z-20">
            <div className="px-4 py-2 rounded-xl bg-(--bg-main)/30 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest shadow-sm">
              Let's Go!
            </div>
          </div>
        </motion.div>
      </div>

      {openGallery && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 mb-20 lg:mb-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setOpenGallery(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative z-10 w-full max-w-6xl max-h-[85vh] overflow-y-auto rounded-[2.5rem] bg-(--bg-main) p-8 shadow-2xl custom-scrollbar"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between mb-8 bg-(--bg-primary)/80 backdrop-blur-xl p-2 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-logo-sky/10 text-logo-sky">
                  <ImageIcon size={24} />
                </div>
                <h3 className="text-3xl font-black text-(--text-primary) tracking-tight">
                  Travel Memories
                </h3>
              </div>
              <button
                onClick={() => setOpenGallery(false)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-(--bg-main) text-(--text-main) opacity-60 hover:opacity-100 hover:bg-red-500 hover:text-white transition-all active:scale-90 shadow-sm"
              >
                ✕
              </button>
            </div>

            <AboutMasonryGallery />
          </motion.div>
        </div>
      )}
    </>
  );
}

export default HeroDestinations;
