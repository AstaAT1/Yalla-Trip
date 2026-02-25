import { useState, useEffect } from "react";
import { X, DollarSign, Tag, AlertCircle } from "lucide-react";

export default function SellItemModal({ onClose, onPost }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Camping Gear",
    condition: "New",
    phone: "",
    seller: "",
    description: "",
    image: null,
  });

  const categories = [
    "Camping Gear",
    "Hiking Equipment",
    "Travel Accessories",
    "Outdoor Clothing",
    "Navigation & Electronics",
    "Backpacks & Bags",
  ];

  // lock scroll ديال الصفحة ملي المودال مفتوح
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    onPost({
      ...formData,
      id: Date.now(),
      rating: 5.0,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col
          rounded-[2.5rem] shadow-2xl
          bg-white text-slate-900 border border-black/10
          dark:bg-white/5 dark:text-white dark:border-white/10 dark:backdrop-blur-xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-8 border-b border-black/10 dark:border-white/10 flex justify-between items-center bg-gray-50/70 dark:bg-white/5">
          <div>
            <h2 className="text-2xl font-extrabold text-[#004053] dark:text-white">
              Sell an Item
            </h2>
            <p className="text-sm text-gray-500 dark:text-white/70 font-medium">
              Post your gear for the Yalla Trip community
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all text-gray-500 dark:text-white/70"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
          {/* IMAGE UPLOAD */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 dark:text-white/85 ml-1">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: URL.createObjectURL(e.target.files[0]),
                })
              }
              className="
                block w-full text-sm
                text-gray-600 dark:text-white/70
                file:mr-4 file:py-3 file:px-6
                file:rounded-2xl file:border-0
                file:text-sm file:font-bold
                file:bg-blue-50 file:text-[#2ea0c4]
                dark:file:bg-white/10 dark:file:text-[var(--color-logo-sky)]
                hover:file:bg-blue-100 dark:hover:file:bg-white/15
                transition
              "
            />

            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="h-48 w-full object-cover rounded-2xl shadow"
              />
            )}
          </div>

          {/* TITLE + PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-white/85 ml-1">
                Product Title
              </label>
              <div className="relative">
                <Tag
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40"
                  size={18}
                />
                <input
                  required
                  type="text"
                  placeholder="e.g. Mountain Tent"
                  className="
                    w-full rounded-2xl py-3 pl-12 pr-4 outline-none
                    bg-gray-50 border border-gray-200 text-slate-900 placeholder:text-gray-400
                    focus:ring-4 focus:ring-blue-50
                    dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-white/35
                    dark:focus:ring-[var(--color-logo-sky)]/20
                  "
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-white/85 ml-1">
                Price ($)
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40"
                  size={18}
                />
                <input
                  required
                  type="number"
                  placeholder="0.00"
                  className="
                    w-full rounded-2xl py-3 pl-12 pr-4 outline-none
                    bg-gray-50 border border-gray-200 text-slate-900 placeholder:text-gray-400
                    focus:ring-4 focus:ring-blue-50
                    dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-white/35
                    dark:focus:ring-[var(--color-logo-sky)]/20
                  "
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* CATEGORY + CONDITION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              className="
                w-full rounded-2xl py-3 px-4 outline-none
                bg-gray-50 border border-gray-200 text-slate-900
                focus:ring-4 focus:ring-blue-50
                dark:bg-white/5 dark:border-white/10 dark:text-white
                dark:focus:ring-[var(--color-logo-sky)]/20
              "
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className="
                w-full rounded-2xl py-3 px-4 outline-none
                bg-gray-50 border border-gray-200 text-slate-900
                focus:ring-4 focus:ring-blue-50
                dark:bg-white/5 dark:border-white/10 dark:text-white
                dark:focus:ring-[var(--color-logo-sky)]/20
              "
              value={formData.condition}
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
            >
              <option>New</option>
              <option>Used - Like New</option>
              <option>Used - Good</option>
              <option>Used - Fair</option>
            </select>
          </div>

          {/* SELLER + PHONE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              required
              type="text"
              placeholder="Your Name"
              className="
                w-full rounded-2xl py-3 px-4 outline-none
                bg-gray-50 border border-gray-200 text-slate-900 placeholder:text-gray-400
                dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-white/35
              "
              value={formData.seller}
              onChange={(e) =>
                setFormData({ ...formData, seller: e.target.value })
              }
            />

            <input
              required
              type="tel"
              placeholder="+212 6..."
              className="
                w-full rounded-2xl py-3 px-4 outline-none
                bg-gray-50 border border-gray-200 text-slate-900 placeholder:text-gray-400
                dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-white/35
              "
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            required
            rows="4"
            placeholder="Tell travelers about your gear..."
            className="
              w-full rounded-2xl py-3 px-4 outline-none resize-none
              bg-gray-50 border border-gray-200 text-slate-900 placeholder:text-gray-400
              dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-white/35
            "
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* WARNING */}
          <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-2xl border border-orange-100 dark:bg-orange-500/10 dark:border-orange-500/20">
            <AlertCircle className="text-orange-500 shrink-0" size={20} />
            <p className="text-xs text-orange-700 dark:text-orange-200 font-medium">
              Always meet in public places. Yalla Trip is not responsible for
              transactions.
            </p>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              w-full py-4 rounded-2xl font-extrabold text-lg shadow-lg transition-all text-white
              bg-gradient-to-r from-[var(--color-logo-sky)] to-[var(--color-logo-dark)]
              hover:opacity-95
            "
          >
            Post Item Now
          </button>
        </form>
      </div>
    </div>
  );
}