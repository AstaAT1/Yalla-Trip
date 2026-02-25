import { FaUsers } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi";
import { useAppContext } from "../../../context";
import { Communities } from "../dataCuommunity";
import { Link } from "react-router-dom";

export default function CommunitySection({ query = "" }) {
  const { Name, AddedValue = [], SetValueadd } = useAppContext();

  const toggleJoin = (id) => {
    SetValueadd((prev = []) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = Communities.filter((e) => {
    const typeMatch =
      (e.type === "backpacking" && Name === "Backpacking") ||
      (e.type === "luxury travel" && Name === "Luxury Travel") ||
      (e.type === "adventurers" && Name === "Adventurers") ||
      (e.type === "digital nomads" && Name === "Digital Nomads") ||
      (e.type === "hidden gems" && Name === "Hidden Gems") ||
      Name === "all communties";

    if (!typeMatch) return false;

    if (!normalizedQuery) return true;

    const text = `${e.title} ${e.desc} ${e.type}`.toLowerCase();
    return text.includes(normalizedQuery);
  });

  return (
    <section className="mt-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => {
          const joined = AddedValue.includes(item.id);

          return (
            <Link key={item.id} to={`/${item.id}`} className="block group">
              <div className="h-full overflow-hidden rounded-4xl border border-(--border-color) bg-(--card-bg) shadow-(--card-shadow) hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-logo-dark/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 rounded-full bg-black/20 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                    {item.members} members
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <h3 className="text-lg font-black text-(--text-primary) leading-tight tracking-tight group-hover:text-logo-sky transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-(--text-secondary) font-medium line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-4 mt-auto border-t border-(--border-color) flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-logo-sky">
                      <FaUsers className="text-logo-sky" />
                      <span>{item.type}</span>
                    </div>

                    {/* Join/Quit button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleJoin(item.id);
                      }}
                      className={`flex items-center gap-1 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                        joined
                          ? "bg-logo-sky text-white shadow-lg shadow-logo-sky/30 hover:bg-logo-dark"
                          : "bg-(--bg-secondary) text-(--text-secondary) border border-(--border-color) hover:bg-logo-sky/10 hover:text-logo-sky hover:border-logo-sky/30"
                      }`}
                    >
                      {joined ? "Member" : "Join"}
                      <HiArrowSmRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
