import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Search } from "lucide-react";

import Images from "../../../constants/Images";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

import CommunityCard from "./CommunityCard";

// Chat UI
import ChatButton from "./ChatButton";
import CommunityChatModal from "./CommunityChatModal";

import { useAppContext } from "../../../context";

function Community() {
  const { Name, ValueName } = useAppContext();

  const [query, setQuery] = useState("");
  const [openChat, setOpenChat] = useState(false);

  const tabs = useMemo(
    () => [
      "all communties",
      "Backpacking",
      "Luxury Travel",
      "Adventurers",
      "Digital Nomads",
      "Hidden Gems",
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-(--bg-main) transition-colors duration-500">
      <Navbar />

      <div className="relative overflow-hidden">
        {/* blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-logo-sky/10 blur-3xl" />
          <div className="absolute top-44 -right-28 h-80 w-80 rounded-full bg-logo-dark/10 blur-3xl opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[2.5rem] shadow-(--card-shadow) bg-(--bg-secondary) border border-(--border-color)">
            <img
              src={Images.tripcom}
              alt="Yalla Trip Community"
              className="h-[320px] w-full object-cover sm:h-[360px] opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-linear-to-t from-logo-dark/80 via-logo-dark/40 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <div className="max-w-2xl">
                <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-logo-sky/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  Travel & Community
                </span>

                <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                  Find Your Travel Tribe
                </h1>

                <p className="mt-4 text-sm text-white/90 sm:text-base font-medium">
                  Join Moroccan travelers planning trips together, sharing tips,
                  and discovering hidden places across Morocco.
                </p>

                <button className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-logo-sky px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-logo-sky/30 hover:shadow-logo-sky/40 hover:-translate-y-0.5 transition-all active:scale-95">
                  Discover Communities <span className="text-xl">›</span>
                </button>
              </div>
            </div>
          </section>

          {/* FILTERS + SEARCH */}
          <div className="mt-8 rounded-3xl border border-(--border-color) bg-(--bg-secondary) p-5 sm:p-8 shadow-(--card-shadow)">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black text-(--text-primary) tracking-tight">
                  Explore Communities
                </h2>
                <p className="mt-1 text-sm text-(--text-secondary) font-medium">
                  Filter by style and find people to travel with.
                </p>
              </div>

              <div className="relative w-full lg:w-[380px]">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-tertiary)"
                  size={18}
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search communities..."
                  className="w-full rounded-2xl border border-(--border-color) bg-(--bg-primary) px-12 py-3.5 text-sm text-(--text-primary) shadow-sm placeholder:text-(--text-tertiary) outline-none focus:ring-2 focus:ring-logo-sky/20 focus:border-logo-sky/50 transition-all"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {tabs.map((t) => {
                const active = Name === t;
                return (
                  <button
                    key={t}
                    onClick={() => ValueName(t)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                      active
                        ? "bg-logo-sky text-white border-logo-sky shadow-lg shadow-logo-sky/20 scale-105"
                        : "bg-(--bg-primary) text-(--text-secondary) border-(--border-color) hover:bg-(--bg-secondary) hover:text-(--text-primary) hover:border-(--text-tertiary/20)"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CARDS */}
          <CommunityCard query={query} />
        </div>
      </div>

      <Footer />

      {/* CHAT BUTTON (hides when open) */}
      {!openChat && <ChatButton onClick={() => setOpenChat(true)} />}

      {/* CHAT MODAL */}
      <AnimatePresence>
        {openChat && <CommunityChatModal onClose={() => setOpenChat(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default Community;
