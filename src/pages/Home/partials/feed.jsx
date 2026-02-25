import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegComment, FaRegBookmark, FaHeart } from "react-icons/fa";
import {
  MapPin,
  MessageCircle,
  Heart,
  Bookmark,
  Share2,
  Send,
} from "lucide-react";
import { initialPosts } from "../../../data/posts";
import CreatePost from "./CreatePost";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?u=guest";

export default function Feed({
  userAvatar,
  userName,
  isModalOpen,
  setIsModalOpen,
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [commentDrafts, setCommentDrafts] = useState({});
  const [openComments, setOpenComments] = useState({});

  const handleCreatePost = (postData) => {
    if (!postData || (!postData.caption && !postData.image)) return;

    const displayName = userName ? userName.split(" ")[0] : "current_user";

    const newPost = {
      id: Date.now(),
      user: {
        username: displayName,
        avatar: userAvatar || DEFAULT_AVATAR,
      },
      location: postData.location || "Morocco",
      image: postData.image || "",
      upvotes: 0,
      hasUpvoted: false,
      commentsList: [],
      bookmarks: 0,
      caption: postData.caption || postData.text || "",
    };

    setPosts([newPost, ...posts]);
  };

  const handleUpvote = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            upvotes: post.hasUpvoted ? post.upvotes - 1 : post.upvotes + 1,
            hasUpvoted: !post.hasUpvoted,
          };
        }
        return post;
      }),
    );
  };

  const handleToggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId, text) => {
    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: text,
    }));
  };

  const handleAddComment = (postId) => {
    const text = commentDrafts[postId];
    if (!text || text.trim() === "") return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentsList: [
              ...post.commentsList,
              { id: Date.now(), username: "current_user", text },
            ],
          };
        }
        return post;
      }),
    );

    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  return (
    <div className="w-full flex flex-col items-center pb-20">
      <CreatePost
        onPost={handleCreatePost}
        userAvatar={userAvatar}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="w-full mb-10 rounded-[2.5rem] overflow-hidden bg-(--bg-main) shadow-(--card-shadow) hover:shadow-2xl transition-all duration-500 group"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={post.user.avatar}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-4 border-(--bg-main) rounded-full" />
              </div>
              <div>
                <div className="font-bold text-lg text-(--text-primary) tracking-tight">
                  @{post.user.username}
                </div>
                <div className="text-xs text-(--text-secondary) flex items-center gap-1.5 font-semibold uppercase tracking-wider opacity-60">
                  <MapPin size={12} className="text-logo-sky" />
                  <span>{post.location}</span>
                </div>
              </div>
            </div>
            <button className="p-2.5 rounded-2xl text-(--text-tertiary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-all active:scale-90">
              <FiMoreHorizontal size={22} />
            </button>
          </div>

          {/* Image */}
          {post.image && (
            <div className="relative overflow-hidden aspect-video sm:aspect-[16/10] bg-(--bg-secondary)">
              <img
                src={post.image}
                alt="post content"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Caption */}
          <div className="px-7 pt-6 pb-2">
            <p className="text-(--text-primary) leading-relaxed">
              <span className="font-black text-lg mr-2 inline-block">
                @{post.user.username}
              </span>
              <span className="text-[1.05rem] font-medium leading-relaxed opacity-90">
                {post.caption}
              </span>
            </p>
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-between px-7 py-5">
            <div className="flex items-center gap-8">
              <button
                onClick={() => handleUpvote(post.id)}
                className={`flex items-center gap-2.5 transition-all hover:scale-110 active:scale-90 ${
                  post.hasUpvoted
                    ? "text-red-500 scale-105"
                    : "text-(--text-secondary) hover:text-red-500"
                }`}
              >
                <Heart
                  size={24}
                  className={
                    post.hasUpvoted
                      ? "fill-current"
                      : "group-hover:stroke-red-500 transition-colors"
                  }
                />
                <span className="font-bold text-sm">{post.upvotes}</span>
              </button>

              <button
                onClick={() => handleToggleComments(post.id)}
                className={`flex items-center gap-2.5 transition-all hover:scale-110 active:scale-90 ${
                  openComments[post.id]
                    ? "text-logo-sky"
                    : "text-(--text-secondary) hover:text-logo-sky"
                }`}
              >
                <MessageCircle
                  size={24}
                  className={openComments[post.id] ? "fill-logo-sky/20" : ""}
                />
                <span className="font-bold text-sm">
                  {post.commentsList.length}
                </span>
              </button>

              <button className="flex items-center gap-2.5 text-(--text-secondary) hover:text-logo-sky transition-all hover:scale-110 active:scale-90">
                <Share2 size={24} />
              </button>
            </div>

            <button className="text-(--text-secondary) hover:text-logo-sky transition-all hover:scale-110 active:scale-90">
              <Bookmark size={24} />
            </button>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {openComments[post.id] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-7 py-8 bg-(--bg-secondary)/30 backdrop-blur-sm">
                  {post.commentsList.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto mb-6 space-y-4 custom-scrollbar pr-2">
                      {post.commentsList.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300"
                        >
                          <img
                            src={DEFAULT_AVATAR}
                            alt="user"
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="bg-(--bg-main) p-4 rounded-2xl flex-1 shadow-sm">
                            <span className="font-black text-xs text-logo-sky block mb-0.5">
                              @{comment.username}
                            </span>
                            <span className="text-sm text-(--text-primary) font-medium">
                              {comment.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-(--text-tertiary)">
                      <MessageCircle size={32} className="opacity-20 mb-2" />
                      <p className="text-sm font-bold">No comments yet</p>
                    </div>
                  )}
                  <div className="flex gap-3 mt-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        className="w-full pl-6 pr-14 py-4 text-sm bg-(--bg-main) text-(--text-main) placeholder-(--text-main)/30 rounded-2xl outline-none focus:ring-2 focus:ring-logo-sky/40 transition-all font-black shadow-inner"
                        placeholder="Add a comment..."
                        value={commentDrafts[post.id] || ""}
                        onChange={(e) =>
                          handleCommentChange(post.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddComment(post.id);
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={
                          !commentDrafts[post.id] ||
                          commentDrafts[post.id].trim() === ""
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl text-logo-sky hover:bg-logo-sky/10 transition-colors disabled:opacity-0"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
