import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function ProductCard({
  title,
  price,
  rating,
  image,
  category,
  onViewDetails,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover="hover"
      className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-3/4 bg-gray-100"
      onClick={onViewDetails}
    >
      {/* Full-bleed Image */}
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        variants={{ hover: { scale: 1.07 } }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* Permanent dark bottom scrim */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category + Heart — top row */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10px] font-black uppercase tracking-widest">
          {category}
        </span>
      </div>

      {/* Bottom info panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-white font-black text-lg leading-tight tracking-tight drop-shadow-md line-clamp-2">
          {title}
        </h3>

        {/* Price row + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">
              Price
            </p>
            <p className="text-white text-2xl font-black leading-none">
              ${price}
            </p>
          </div>

          <motion.div
            variants={{ hover: { scale: 1.06, x: -2 } }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-logo-sky text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-logo-sky/40"
          >
            <span>View</span>
            <ArrowUpRight size={13} />
          </motion.div>
        </div>
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-logo-sky/0 pointer-events-none"
        variants={{ hover: { borderColor: "rgba(49,168,208,0.5)" } }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
