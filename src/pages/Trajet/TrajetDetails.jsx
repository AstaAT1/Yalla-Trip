import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { destinationsData } from "../../json/trajetsData";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function TrajetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const route = destinationsData.find((t) => t.id === Number(id));

  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--bg-primary)">
        <p className="text-(--text-primary) p-10 font-black text-2xl">
          Destination not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--bg-primary) selection:bg-logo-sky/30">
      <Navbar />

      <main className="px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-(--text-secondary) hover:text-logo-sky mb-8 font-black uppercase tracking-widest text-xs transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Destinations
          </motion.button>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-4xl overflow-hidden bg-(--card-bg) border border-(--border-color) shadow-2xl grid lg:grid-cols-2"
          >
            {/* Image */}
            <div className="relative aspect-square lg:aspect-auto overflow-hidden">
              <img
                src={route.image}
                alt={route.title}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-logo-dark/60 via-transparent to-transparent opacity-60" />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-xl bg-logo-sky text-white text-xs font-black uppercase tracking-widest shadow-xl">
                  {route.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-xl bg-logo-sky/10 text-logo-sky">
                  <Sparkles size={20} />
                </div>
                <span className="text-logo-sky text-[10px] font-black uppercase tracking-[0.2em]">
                  Featured Destination
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-(--text-primary) leading-tight mb-6 tracking-tight">
                {route.title}
              </h1>

              <p className="text-lg text-(--text-secondary) font-medium leading-relaxed mb-8 opacity-90">
                {route.description}
              </p>

              {/* Info */}
              <div className="grid grid-cols-3 gap-6 mb-10 pb-8 border-b border-(--border-color)">
                <div>
                  <span className="text-(--text-tertiary) text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <MapPin size={12} className="text-logo-sky" /> Location
                  </span>
                  <span className="text-(--text-primary) font-black">
                    {route.location}
                  </span>
                </div>

                <div>
                  <span className="text-(--text-tertiary) text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <Clock size={12} className="text-logo-sky" /> Duration
                  </span>
                  <span className="text-(--text-primary) font-black">
                    {route.duration}
                  </span>
                </div>

                <div>
                  <span className="text-(--text-tertiary) text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    Rating
                  </span>
                  <span className="text-(--text-primary) font-black">
                    {route.rating}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              {route.highlights && (
                <div className="mb-10">
                  <h4 className="font-black text-(--text-primary) mb-4 flex items-center gap-2">
                    <BookOpen size={18} className="text-logo-sky" />
                    Highlights
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {route.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-2xl bg-(--bg-secondary) border border-(--border-color) text-(--text-secondary) text-sm font-bold"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex flex-wrap items-center justify-between gap-6 mt-auto">
                <div>
                  <span className="text-(--text-tertiary) text-[10px] font-black uppercase tracking-[0.2em]">
                    Full Experience
                  </span>
                  <span className="block text-logo-sky font-black text-4xl tracking-tight">
                    ${route.price}
                  </span>
                </div>

                <button className="px-10 py-5 rounded-2xl bg-linear-to-r from-logo-sky to-logo-dark text-white font-black text-lg shadow-2xl hover:-translate-y-1 transition">
                  Book this destination
                </button>
              </div>
            </div>
          </motion.div>

          {/* Places Section */}
          {route.places && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 rounded-2xl bg-logo-sky/10 text-logo-sky">
                  <MapPin size={20} />
                </div>
                <h2 className="text-3xl font-black text-(--text-primary)">
                  Places You Can Visit
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {route.places.map((place, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8 }}
                    className="rounded-3xl overflow-hidden bg-(--card-bg) border border-(--border-color) shadow-xl group"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-60" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-black text-(--text-primary) mb-2">
                        {place.name}
                      </h3>

                      <p className="text-(--text-secondary) text-sm mb-4 leading-relaxed">
                        {place.description}
                      </p>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          place.name + " " + route.title
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-logo-sky text-sm font-bold uppercase tracking-widest hover:underline"
                      >
                        View on Map →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TrajetDetails;
