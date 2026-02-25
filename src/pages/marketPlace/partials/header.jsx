import React from "react";
import { Search } from "lucide-react";
import Images from "../../../constants/Images";

export default function Header({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative h-64 w-full rounded-3xl overflow-hidden mb-8 shadow-2xl">
      <img
        src={Images.marketheader}
        alt="Marketplace Header"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-logo-dark/80 to-transparent flex flex-col justify-center px-12">
        <h1 className="text-4xl font-black text-white mb-2">
          Explore the Marketplace
        </h1>
        <p className="text-white/70 text-lg mb-6 max-w-md">
          Find the best gears and experiences for your next adventure.
        </p>

        <div className="relative max-w-lg w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for gear, trips, or guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/15 backdrop-blur-md border border-white/20 py-3 pl-12 pr-4 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40 transition-all text-white placeholder-white/50 font-bold"
          />
        </div>
      </div>
    </div>
  );
}
