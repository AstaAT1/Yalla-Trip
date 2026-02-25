import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Home, ArrowLeft, Compass, Sparkles } from "lucide-react";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-(--bg-main) relative flex items-center justify-center p-6 transition-colors duration-500 selection:bg-logo-sky/30">
      {/* SUBTLE BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(49,168,208,0.1),transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(49,168,208,0.05),transparent_40%)]" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
        {/* TEXT AREA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-8xl font-black text-(--text-primary) tracking-tight opacity-10">
            404
          </h1>
          <h2 className="text-4xl sm:text-5xl font-black text-(--text-primary) tracking-tight leading-tight">
            Lost in <span className="text-logo-sky">Destinations?</span>
          </h2>
          <p className="text-base sm:text-lg text-(--text-secondary) font-medium max-w-sm mx-auto leading-relaxed">
            We couldn&apos;t find the path you were looking for. Let&apos;s get
            you back on course.
          </p>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/home"
            className="group flex items-center gap-2 bg-logo-sky text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-logo-sky/20 transition-all hover:-translate-y-1 active:scale-95"
          >
            <Home size={16} />
            Go back home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-(--text-primary) font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all border border-(--border-color) bg-(--bg-secondary)/50 hover:bg-(--bg-tertiary)"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
