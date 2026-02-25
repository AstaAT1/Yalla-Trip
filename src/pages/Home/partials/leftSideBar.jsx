import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, TrendingUp, Users, MapPin } from "lucide-react";
import Images from "../../../constants/Images";

export default function LeftSideBar() {
  const menuItems = [
    { icon: Sparkles, label: "For You", active: true, to: "/home" },
    { icon: TrendingUp, label: "Trending", active: false, to: "/destinations" },
    { icon: Users, label: "Community", active: false, to: "/community" },
  ];

  return (
    <div className="flex flex-col gap-6 sticky top-24">
      {/* Discover Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -2 }}
        className="rounded-[2.5rem] bg-(--bg-main) p-8 shadow-(--card-shadow) hover:shadow-2xl transition-all duration-300"
      >
        <h2 className="text-lg font-bold text-(--text-primary) mb-5">
          Discover
        </h2>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all font-semibold text-sm ${
                item.active
                  ? "bg-logo-sky/15 text-logo-sky"
                  : "text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Trips Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{ y: -2 }}
        className="rounded-[2.5rem] bg-(--bg-main) p-8 shadow-(--card-shadow) hover:shadow-2xl transition-all duration-300"
      >
        <h2 className="text-lg font-bold text-(--text-primary) mb-5">
          Your Recent Trips
        </h2>
        <div className="space-y-5">
          <Link to="/destinations" className="block group">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={Images.trajet10 || Images.trajet0}
                alt="Recent trip"
                className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A3644]/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-bold text-white text-sm">
                  Akchour Waterfalls
                </h3>
                <p className="text-white/80 text-xs mt-0.5">5 Days Ago</p>
              </div>
            </div>
          </Link>
          <Link
            to="/destinations"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-(--bg-secondary) text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary) font-black text-sm shadow-sm transition-all"
          >
            <MapPin size={18} />
            View Your Destinations
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
