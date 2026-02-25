import React, { useState, useEffect } from "react";
import PostModal from "./PostModal";
import { Image, MapPin, Smile, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?u=you";

export default function CreatePost({
  onPost,
  userAvatar,
  isModalOpen,
  setIsModalOpen,
}) {
  const avatarSrc = userAvatar || DEFAULT_AVATAR;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full rounded-[2.5rem] bg-(--bg-main) p-8 shadow-(--card-shadow) mb-8 group"
      >
        <div className="flex gap-5 items-center">
          <div className="relative shrink-0">
            <img
              src={avatarSrc}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex-1 rounded-2xl py-4 px-6 bg-(--bg-secondary) text-(--text-secondary) font-bold cursor-pointer hover:bg-(--bg-tertiary) hover:text-(--text-primary) transition-all duration-300 flex items-center justify-between shadow-sm outline-none"
          >
            <span>What's on your mind, Traveller?</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-linear-to-r from-logo-sky to-logo-dark text-white px-8 py-3.5 rounded-[1.25rem] font-bold hover:shadow-[0_10px_25px_-5px_rgba(49,168,208,0.4)] transition-all active:scale-95 whitespace-nowrap"
          >
            Post
          </button>
        </div>

        <div className="flex items-center justify-between mt-8 pt-6">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 text-(--text-secondary) hover:text-logo-sky transition-all hover:scale-105 text-sm font-bold"
            >
              <div className="p-2 rounded-xl bg-logo-sky/5 text-logo-sky">
                <Image size={20} />
              </div>
              Photo/Video
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 text-(--text-secondary) hover:text-red-400 transition-all hover:scale-105 text-sm font-bold"
            >
              <div className="p-2 rounded-xl bg-red-400/5 text-red-400">
                <MapPin size={20} />
              </div>
              Location
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 text-(--text-secondary) hover:text-yellow-500 transition-all hover:scale-105 text-sm font-bold"
            >
              <div className="p-2 rounded-xl bg-yellow-500/5 text-yellow-500">
                <Smile size={20} />
              </div>
              Feeling
            </button>
          </div>
          <button className="p-2 rounded-xl hover:bg-(--bg-secondary) transition-colors text-(--text-tertiary) hover:text-(--text-primary)">
            <MoreHorizontal size={22} />
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isModalOpen && (
          <PostModal
            onClose={() => setIsModalOpen(false)}
            onPost={onPost}
            userAvatar={avatarSrc}
          />
        )}
      </AnimatePresence>
    </>
  );
}
