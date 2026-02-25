import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  X,
  Image,
  MapPin,
  Smile,
  ChevronDown,
  Globe,
  Tag,
  Sparkles,
} from "lucide-react";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?u=you";

export default function PostModal({ onClose, onPost, userAvatar }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [visibility] = useState("Public");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  // lock body scroll while modal open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !imageUrl) return;

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user: {
          username: "travel_user",
          avatar: userAvatar || DEFAULT_AVATAR,
        },
        location: "Morocco",
        caption: content,
        image: imageUrl,
        upvotes: 0,
        hasUpvoted: false,
        commentsList: [],
        bookmarks: 0,
        visibility,
      };

      if (onPost) onPost(newPost);

      setContent("");
      setImageUrl("");
      setIsUploading(false);
      onClose();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-(--bg-primary) rounded-3xl shadow-2xl overflow-hidden flex flex-col relative scale-in-center"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-logo-sky/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 px-6 py-4 flex items-center bg-transparent border-b border-(--border-color)/50">
          <div className="flex-1 flex justify-center">
            <h2 className="text-xl font-black text-(--text-primary) tracking-tight">
              Create Post
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="absolute right-8 p-2 hover:bg-(--bg-secondary) rounded-xl text-(--text-secondary) hover:text-(--text-primary) transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex flex-col px-6 py-5 space-y-5"
        >
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img
                src={userAvatar || DEFAULT_AVATAR}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm text-(--text-primary)">
                Yalla Traveler
              </span>
              <button
                type="button"
                className="flex items-center gap-1.5 px-2 py-0.5 bg-(--bg-secondary) rounded-lg text-[9px] font-black text-(--text-secondary) mt-0.5 w-fit border border-(--border-color)"
              >
                {visibility}
                <ChevronDown size={8} />
              </button>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            autoFocus
            className="w-full min-h-[80px] text-base text-(--text-main) placeholder-(--text-main)/40 bg-transparent border-none outline-none p-0 focus:ring-0 resize-none leading-relaxed font-medium selection:bg-logo-sky/30"
            placeholder="What's on your mind, Traveller?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Image Upload Area / Preview */}
          {!imageUrl ? (
            <motion.div
              whileHover={{ scale: 1.005 }}
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 p-8 rounded-2xl bg-(--bg-secondary)/40 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border-2 border-dashed border-(--border-color) hover:bg-logo-sky/5 group"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-500 shadow-sm border border-(--border-color)">
                <Image size={18} className="stroke-[2.5px]" />
              </div>
              <div className="text-center">
                <p className="text-xs font-black text-(--text-primary)">
                  Add Photos/Videos
                </p>
                <p className="text-[10px] text-(--text-tertiary) mt-0.5">
                  or drag and drop
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="mt-6 relative rounded-[2.5rem] overflow-hidden group shadow-xl">
              <img
                src={imageUrl}
                alt="preview"
                className="w-full max-h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="p-3 bg-red-500 text-white rounded-2xl shadow-xl transform scale-90 group-hover:scale-100 transition-all hover:bg-red-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Add To Post Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-(--bg-primary) border border-(--border-color) shadow-sm">
            <span className="text-[11px] font-black text-(--text-primary) opacity-80 pl-1">
              Add to your post
            </span>
            <div className="flex items-center gap-0.5">
              {[
                {
                  icon: Image,
                  color: "text-green-500",
                  hover: "hover:bg-green-500/10",
                },
                {
                  icon: Tag,
                  color: "text-blue-500",
                  hover: "hover:bg-blue-500/10",
                },
                {
                  icon: Smile,
                  color: "text-yellow-400",
                  hover: "hover:bg-yellow-400/10",
                },
                {
                  icon: MapPin,
                  color: "text-red-500",
                  hover: "hover:bg-red-500/10",
                },
              ].map((item, id) => (
                <button
                  key={id}
                  type="button"
                  className={`p-1.5 rounded-lg transition-all hover:scale-110 ${item.hover} ${item.color}`}
                >
                  <item.icon size={16} className="stroke-[2.5px]" />
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 pb-6 bg-transparent">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={(!content.trim() && !imageUrl) || isUploading}
            className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-[0.98] ${
              (!content.trim() && !imageUrl) || isUploading
                ? "bg-[#E9EBED] text-(--text-tertiary) cursor-not-allowed"
                : "bg-logo-sky text-white shadow-xl shadow-logo-sky/20 hover:bg-logo-sky/90"
            }`}
          >
            {isUploading ? "Processing..." : "Post"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
