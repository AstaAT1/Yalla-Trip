import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { FaUsers } from "react-icons/fa";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import ErrorPage from "../../Error/error";
import { Communities } from "../dataCuommunity";
import { useAppContext } from "../../../context";

export default function CommunityDetails() {
  const { id } = useParams();
  const { AddedValue = [], SetValueadd } = useAppContext();

  const community = useMemo(
    () => Communities.find((item) => item.id === Number(id)),
    [id],
  );

  if (!community) return <ErrorPage />;

  const joined = AddedValue.includes(community.id);

  const toggleJoin = (communityId) => {
    SetValueadd((prev = []) =>
      prev.includes(communityId)
        ? prev.filter((x) => x !== communityId)
        : [...prev, communityId],
    );
  };

  return (
    <div className="min-h-screen bg-(--bg-main) transition-colors duration-400">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-logo-sky/10 blur-3xl" />
          <div className="absolute top-44 -right-28 h-80 w-80 rounded-full bg-logo-dark/10 blur-3xl opacity-30" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-[2.5rem] border border-(--border-color) bg-(--bg-secondary) shadow-(--card-shadow)"
          >
            {/* Hero image */}
            <div className="relative h-72 md:h-96">
              <img
                src={community.img}
                alt={community.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-logo-dark/80 via-logo-dark/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                  {community.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-white/90">
                    <FaUsers className="text-logo-sky" />
                    <span>{community.members} members</span>
                  </div>

                  <div className="rounded-full bg-logo-sky/20 border border-logo-sky/30 px-4 py-2 text-xs font-black uppercase tracking-widest text-logo-sky backdrop-blur-md">
                    {community.type}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <p className="text-(--text-primary) text-xl md:text-2xl font-black leading-tight tracking-tight">
                {community.desc}
              </p>

              <p className="mt-6 text-(--text-secondary) leading-relaxed font-medium text-base md:text-lg">
                {community.desc2}
              </p>

              {/* Join/Quit */}
              <div className="mt-10">
                <button
                  onClick={() => toggleJoin(community.id)}
                  className={`rounded-2xl px-10 py-4 text-sm font-black uppercase tracking-widest shadow-2xl transition-all duration-300 active:scale-95 ${
                    joined
                      ? "bg-logo-sky text-white shadow-logo-sky/30 hover:bg-logo-dark"
                      : "bg-(--bg-primary) text-(--text-secondary) border border-(--border-color) hover:bg-logo-sky/10 hover:text-logo-sky hover:border-logo-sky/30 shadow-none"
                  }`}
                >
                  {joined ? "Member of Community" : "Join Community"}
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
