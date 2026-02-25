import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import {
  trendingDestinations,
  activeCommunities,
} from "../../../data/homeData";

export default function RightSideBar() {
  return (
    <div className="flex flex-col gap-6 sticky top-24">
      {/* Trending Destinations */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -2 }}
        className="rounded-[2.5rem] bg-(--bg-main) p-8 shadow-(--card-shadow) hover:shadow-2xl transition-all duration-300"
      >
        <h3 className="text-lg font-bold text-(--text-primary) mb-5">
          Trending Destinations
        </h3>
        <div className="space-y-5">
          {trendingDestinations.map((dest, i) => (
            <Link key={dest.id} to="/destinations" className="block group">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="space-y-3"
              >
                <div className="h-40 overflow-hidden rounded-2xl relative">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={dest.image}
                    alt={dest.name}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-logo-dark/70 to-transparent" />
                </div>
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-bold text-(--text-primary) text-sm">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm font-semibold text-(--text-primary)">
                      {dest.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Active Communities */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{ y: -2 }}
        className="rounded-[2.5rem] bg-(--bg-main) p-8 shadow-(--card-shadow) hover:shadow-2xl transition-all duration-300"
      >
        <h3 className="text-lg font-bold text-(--text-primary) mb-5">
          Active Communities
        </h3>
        <div className="space-y-4">
          {activeCommunities.map((community) => (
            <div
              key={community.id}
              className="flex justify-between items-center p-3 rounded-xl hover:bg-(--bg-secondary) transition-colors"
            >
              <div className="flex gap-3 items-center">
                <img
                  className="w-11 h-11 rounded-xl object-cover"
                  src={community.image}
                  alt={community.name}
                />
                <div>
                  <h3 className="font-bold text-(--text-primary) text-sm">
                    {community.name}
                  </h3>
                  <p className="text-(--text-secondary) text-xs">
                    {community.members}
                  </p>
                </div>
              </div>
              <Link
                to="/community"
                className="shrink-0 bg-linear-to-r from-logo-sky to-logo-dark text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-95 transition-opacity"
              >
                Join
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
