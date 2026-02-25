import React from "react";
import { X, MessageCircle, Phone, User, Tag, ShieldCheck } from "lucide-react";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-(--bg-main) rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Image Section */}
        <div className="md:w-1/2 relative bg-(--bg-main) h-64 md:h-auto">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 bg-(--bg-main)/30 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-sm">
            {product.category}
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-black text-(--text-main) leading-tight mb-2 tracking-tight">
                {product.title}
              </h2>
              <div className="flex items-center gap-2 text-logo-sky font-black text-2xl tracking-tight">
                <span>${product.price}</span>
                <span className="text-sm font-bold text-(--text-main) opacity-40 pl-2">
                  {product.condition}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-(--bg-main) hover:bg-red-500 hover:text-white rounded-2xl transition-all active:scale-90 text-(--text-main) opacity-60 hover:opacity-100 shadow-sm"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6 flex-1">
            {/* Description */}
            <div>
              <h3 className="text-[10px] font-black text-(--text-main) uppercase tracking-[0.2em] mb-3 opacity-40">
                Description
              </h3>
              <p className="text-(--text-main) opacity-70 leading-relaxed font-medium">
                {product.description ||
                  "This high-quality adventure gear is perfect for your next trip. Well-maintained and ready for a new owner."}
              </p>
            </div>

            {/* Seller Info */}
            <div className="bg-logo-sky/5 rounded-2xl p-6">
              <h3 className="text-[10px] font-black text-logo-sky uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <User size={14} /> Seller Information
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-logo-sky text-white shadow-lg flex items-center justify-center font-black text-lg">
                  {product.seller?.charAt(0) || "S"}
                </div>
                <div>
                  <div className="font-black text-(--text-main)">
                    {product.seller || "Yalla Traveler"}
                  </div>
                  <div className="text-[10px] font-bold text-(--text-main) opacity-40 flex items-center gap-1 uppercase tracking-wider">
                    <ShieldCheck size={12} className="text-green-500" /> Member
                    since 2023
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-[#25D366] text-white py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-all shadow-xl shadow-green-500/10 active:scale-[0.98]">
              <MessageCircle size={18} />
              WhatsApp Seller
            </button>
            <button className="flex-1 bg-logo-sky text-white py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-logo-sky/90 transition-all shadow-xl shadow-logo-sky/10 active:scale-[0.98]">
              <Phone size={18} />
              Call Seller
            </button>
          </div>

          <p className="text-center text-[10px] text-(--text-main) opacity-30 mt-6 font-black uppercase tracking-widest italic">
            Always meet in public places and never send money in advance.
          </p>
        </div>
      </div>
    </div>
  );
}
