import React from "react";
import { Filter, ChevronRight } from "lucide-react";

const categories = [
  "All Items",
  "Camping Gear",
  "Hiking Equipment",
  "Travel Accessories",
  "Outdoor Clothing",
  "Navigation & Electronics",
  "Backpacks & Bags",
];

export default function FilterSidebar({ filters, setFilters }) {
  const handleCategoryChange = (val) => {
    setFilters((prev) => ({ ...prev, category: val }));
  };

  const handlePriceChange = (val) => {
    setFilters((prev) => ({ ...prev, priceRange: parseInt(val) }));
  };

  const handleConditionChange = (condition) => {
    setFilters((prev) => {
      const newConditions = prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition];
      return { ...prev, conditions: newConditions };
    });
  };

  return (
    <div className="bg-(--bg-main) shadow-(--card-shadow) rounded-4xl p-8 sticky top-32">
      <div className="flex items-center gap-3 mb-8 border-b pb-4 border-(--border-color)">
        <Filter className="text-logo-sky" size={20} />
        <h2 className="text-xl font-black text-(--text-primary)">Filters</h2>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-xs font-black text-(--text-secondary) uppercase tracking-widest mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={`flex items-center justify-between w-full p-2.5 rounded-xl text-sm font-bold transition-all ${
                filters.category === category
                  ? "bg-logo-sky/15 text-logo-sky"
                  : "text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)"
              }`}
            >
              {category}
              <ChevronRight
                size={14}
                className={
                  filters.category === category ? "opacity-100" : "opacity-0"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-xs font-black text-(--text-secondary) uppercase tracking-widest mb-4">
          Price Range: Up to ${filters.priceRange}
        </h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="500"
            value={filters.priceRange}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="w-full h-1.5 bg-(--bg-secondary) rounded-lg appearance-none cursor-pointer accent-logo-sky"
          />
          <div className="flex justify-between text-xs text-(--text-secondary) font-bold">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="text-xs font-black text-(--text-secondary) uppercase tracking-widest mb-4">
          Condition
        </h3>
        <div className="space-y-2 text-sm text-(--text-primary)">
          {["New", "Used - Like New", "Used - Good"].map((cond) => (
            <label
              key={cond}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.conditions.includes(cond)}
                onChange={() => handleConditionChange(cond)}
                className="w-5 h-5 rounded border-(--border-color) text-logo-sky accent-logo-sky focus:ring-logo-sky"
              />
              {cond}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
