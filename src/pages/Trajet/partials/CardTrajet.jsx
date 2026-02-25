import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Icons from "../../../constants/Icons";
import { Star, ArrowRight, Heart } from "lucide-react";

function CardDestinations({ route }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-(--bg-main) rounded-[2.5rem] overflow-hidden shadow-(--card-shadow) hover:shadow-2xl transition-all duration-500 border-none"
    >
      <div className="relative overflow-hidden aspect-16/10">
        <img
          src={route.image}
          alt={route.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-logo-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1.5 rounded-xl bg-logo-sky text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
            {route.category}
          </span>
        </div>

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-2xl bg-(--bg-main)/30 backdrop-blur-md text-white hover:bg-red-500 transition-all duration-300 active:scale-90 shadow-xl"
        >
          <Heart
            size={22}
            className={`${liked ? "fill-current text-white" : "text-white"}`}
          />
        </button>
      </div>

      <div className="p-7">
        <h3 className="font-black text-xl text-(--text-primary) tracking-tight">
          {route.title}
        </h3>

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-yellow-400/10 text-yellow-500">
            <Star size={14} className="fill-current" />
            <span className="text-xs font-black">{route.rating}</span>
          </div>
          <span className="text-(--text-tertiary) text-sm">•</span>
          <span className="text-xs font-bold text-(--text-secondary) uppercase tracking-wider">
            {route.location}
          </span>
        </div>

        <div className="mt-8 pt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-(--text-tertiary) text-[10px] font-black uppercase tracking-[0.2em]">
              Start From
            </span>
            <span className="text-logo-sky font-black text-2xl tracking-tight">
              ${route.price}
            </span>
          </div>

          <button
            onClick={() => navigate(`/destinations/${route.id}`)}
            className="group/btn flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-logo-sky/5 text-logo-sky font-black text-xs uppercase tracking-widest hover:bg-logo-sky hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-logo-sky/20 active:scale-95"
          >
            Details
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default CardDestinations;
