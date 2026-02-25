import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Send, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [shares, setShares] = useState(post.shares || 0);
  const [liked, setLiked] = useState(false);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  //  Load comments
  useEffect(() => {
    const saved = localStorage.getItem(`comments-${post.id}`);
    if (saved) {
      setCommentsList(JSON.parse(saved));
    }
  }, [post.id]);

  //  Save comments
  useEffect(() => {
    localStorage.setItem(`comments-${post.id}`, JSON.stringify(commentsList));
  }, [commentsList, post.id]);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      username: "travel_user",
      text: commentInput,
      time: "Just now",
      avatar: "https://i.pravatar.cc/40",
    };

    setCommentsList([newComment, ...commentsList]);
    setCommentInput("");
  };

  const handleDelete = (id) => {
    setCommentsList(commentsList.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-(--bg-main) rounded-[2.5rem] shadow-(--card-shadow) p-8 space-y-6 transition-all duration-300 hover:shadow-2xl group/post">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/45"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-bold text-(--text-primary)">{post.username}</p>
          <p className="text-xs text-(--text-secondary)">Morocco</p>
        </div>
      </div>

      {/* TEXT */}
      <p className="text-(--text-primary)">{post.text}</p>

      {/* IMAGE */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="rounded-xl w-full object-cover"
        />
      )}

      {/* ACTIONS */}
      <div className="flex justify-between pt-6">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition ${
            liked
              ? "text-red-500"
              : "text-(--text-secondary) hover:text-red-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
          <span className="text-sm font-medium">{likes}</span>
        </button>

        <button
          onClick={() => setShowCommentBox(!showCommentBox)}
          className="flex items-center gap-2 text-(--text-secondary) hover:text-logo-sky transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{commentsList.length}</span>
        </button>

        <button
          onClick={() => setShares(shares + 1)}
          className="flex items-center gap-2 text-(--text-secondary) hover:text-logo-sky transition"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-medium">{shares}</span>
        </button>
      </div>

      {/* COMMENT SECTION */}
      <AnimatePresence>
        {showCommentBox && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-4"
          >
            {/* INPUT */}
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/40"
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-(--bg-secondary) rounded-full px-5 py-3 text-sm text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-logo-sky/50 shadow-inner"
              />
              <button
                onClick={handleAddComment}
                className="bg-logo-sky text-white p-2 rounded-full hover:bg-logo-sky/90 transition shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* COMMENTS LIST */}
            <div className="space-y-3">
              {commentsList.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3 group"
                >
                  <img
                    src={comment.avatar}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <div className="bg-(--bg-secondary) rounded-2xl px-5 py-3 flex-1 relative shadow-sm">
                    <p className="text-sm font-semibold text-(--text-primary)">
                      {comment.username}
                    </p>
                    <p className="text-sm text-(--text-secondary)">
                      {comment.text}
                    </p>
                    <span className="text-xs text-(--text-tertiary)">
                      {comment.time}
                    </span>

                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
