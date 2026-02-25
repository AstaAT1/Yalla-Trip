import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import LeftSideBar from "./partials/leftSideBar";
import Navbar from "../../components/navbar";
import RightSideBar from "./partials/rightSideBar";
import Feed from "./partials/feed";
import Images from "../../constants/Images";
import { ChatBot } from "../../components/chatBot";
import Icons from "../../constants/Icons";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?u=guest";

function loadUserInfo() {
  try {
    const currentUserRaw = localStorage.getItem("currentUser");
    const ytProfileRaw = localStorage.getItem("yt_profile");
    const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;
    const ytProfile = ytProfileRaw ? JSON.parse(ytProfileRaw) : null;

    const name = ytProfile?.name || currentUser?.name || null;
    const avatar = ytProfile?.avatar || DEFAULT_AVATAR;

    return { name, avatar };
  } catch {
    return { name: null, avatar: DEFAULT_AVATAR };
  }
}

export default function Home() {
  const [userInfo, setUserInfo] = useState(() => loadUserInfo());
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  useEffect(() => {
    const handleProfileUpdate = () => {
      setUserInfo(loadUserInfo());
    };
    window.addEventListener("yt_profile_updated", handleProfileUpdate);
    return () =>
      window.removeEventListener("yt_profile_updated", handleProfileUpdate);
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-(--bg-main) selection:bg-logo-sky/30">
      {!isPostModalOpen && <Navbar />}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 sm:px-6 pt-8 pb-4">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-[2.5rem] overflow-hidden bg-(--bg-main) shadow-(--card-shadow) group"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-logo-sky/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-logo-dark/20 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />

          {/* Content grid */}
          <div className="relative grid w-full md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center p-8 md:p-14">
            {/* Left Content */}
            <div className="text-center md:text-left z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-logo-sky/10 backdrop-blur-md"
              >
                <Sparkles size={14} className="text-logo-sky" />
                <span className="text-logo-sky text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                  Your Journey Starts Here
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-(--text-primary) leading-[1.1] mb-6 tracking-tight"
              >
                {userInfo.name ? (
                  <>
                    Welcome back,{" "}
                    <span className="bg-linear-to-r from-logo-sky to-logo-dark bg-clip-text text-transparent">
                      {userInfo.name.split(" ")[0]}
                    </span>
                  </>
                ) : (
                  <>
                    Explore the World with{" "}
                    <span className="bg-linear-to-r from-logo-sky to-logo-dark bg-clip-text text-transparent">
                      Yalla Trip
                    </span>
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-(--text-secondary) max-w-xl mx-auto md:mx-0 leading-relaxed font-medium mb-8"
              >
                Connect with travel enthusiasts, discover hidden gems across
                Morocco, and share your unforgettable stories with a global
                community.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <Link
                  to="/destinations"
                  className="group/btn flex items-center gap-3 px-8 py-4 rounded-2xl bg-logo-sky text-white font-bold text-lg shadow-2xl shadow-logo-sky/40 transition-all duration-300 hover:shadow-2xl hover:shadow-logo-sky/50 hover:-translate-y-1 active:scale-95"
                >
                  Explore Trips
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>

            {/* Right Side Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative aspect-4/3 rounded-4xl overflow-hidden shadow-2xl z-10"
            >
              <div className="absolute inset-0 bg-linear-to-t from-logo-dark/40 via-transparent to-transparent z-10" />
              <img
                src={Images.homeatlas || Images.trajet0}
                alt="Yalla Trip Experience"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                <div className="flex justify-center px-4 py-1.5 rounded-xl bg-(--bg-main)/30 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
                  <Icons.Location className="w-3 h-3 mr-1 inline" />
                  Atlas Mountains
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* BODY - Feed + Sidebars */}
      <div className="relative z-10 flex-1 max-w-[1500px] mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <aside className="w-[280px] hidden xl:block shrink-0">
            <div className="sticky top-28">
              <LeftSideBar />
            </div>
          </aside>

          {/* Main Feed - WIDER */}
          <main className="flex-1 min-w-0 max-w-[800px] mx-auto">
            <Feed
              userAvatar={userInfo.avatar}
              userName={userInfo.name}
              isModalOpen={isPostModalOpen}
              setIsModalOpen={setIsPostModalOpen}
            />
          </main>

          {/* Right Sidebar */}
          <aside className="w-[350px] hidden lg:block shrink-0">
            <div className="sticky top-28">
              <RightSideBar />
            </div>
          </aside>
        </div>
      </div>

      <ChatBot />
    </div>
  );
}
