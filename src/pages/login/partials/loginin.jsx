import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaApple, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Sparkles, ArrowRight } from "lucide-react";
import Images from "../../../constants/Images";
import ThemeToggle from "../../../components/ThemeToggle";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const carouselImages = [Images.Trip5, Images.Trip4, Images.Trip6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) =>
        (user.name === username || user.email === username) &&
        user.password === password,
    );

    if (matchedUser) {
      setError("");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: matchedUser.name, email: matchedUser.email }),
      );
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-(--bg-main) selection:bg-logo-sky/30">
      {/* Background with subtle glow */}
      <div className="absolute inset-0 z-0">
        <img
          src={Images.LoginBg}
          alt="Login background"
          className="h-full w-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-(--bg-main) via-(--bg-main)/80 to-transparent" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-logo-sky/5 rounded-full blur-3xl -mr-64 -mt-64" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid overflow-hidden rounded-4xl bg-(--bg-main) shadow-2xl lg:grid-cols-2 h-[700px]"
        >
          {/* Form Side */}
          <div className="p-8 sm:p-12">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-logo-sky/10 text-logo-sky">
                  <Sparkles size={20} />
                </div>
                <h1 className="text-3xl font-black text-(--text-primary) tracking-tight">
                  Yalla Trip
                </h1>
              </div>
              <span className="hidden sm:inline-flex rounded-full bg-logo-sky/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-logo-sky">
                Welcome back
              </span>
            </div>

            <div className="mb-10">
              <h2 className="text-4xl font-black text-(--text-primary) tracking-tight mb-2">
                Journey Begins
              </h2>
              <p className="text-(--text-secondary) font-medium">
                Log in to continue your adventure.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[FaApple, FaGoogle, FaXTwitter].map((Icon, idx) => (
                <button
                  key={idx}
                  className="h-14 rounded-2xl bg-(--bg-main) flex items-center justify-center hover:bg-logo-sky hover:text-white transition-all duration-300 group shadow-sm active:scale-95"
                >
                  <Icon className="text-xl group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>

            <div className="relative flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-(--text-main) opacity-10" />
              <span className="text-[10px] font-black uppercase tracking-widest text-(--text-main) opacity-40">
                or continue with email
              </span>
              <div className="h-px flex-1 bg-(--text-main) opacity-10" />
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-(--text-secondary)">
                  Username or Email
                </label>
                <input
                  type="text"
                  placeholder="Enter username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-(--bg-main) px-6 text-sm font-black outline-none focus:ring-2 focus:ring-logo-sky/50 transition-all placeholder-(--text-main)/30 shadow-sm"
                />
              </div>

              <div className="space-y-2 relative">
                <label className="text-xs font-black uppercase tracking-widest text-(--text-secondary)">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 rounded-2xl bg-(--bg-main) px-6 pr-14 text-sm font-black outline-none focus:ring-2 focus:ring-logo-sky/50 transition-all placeholder-(--text-main)/30 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-(--text-tertiary) hover:text-logo-sky transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-xs font-bold pl-1"
                >
                  {error}
                </motion.p>
              )}

              <button className="group mt-4 w-full h-14 rounded-2xl bg-linear-to-r from-logo-sky to-logo-dark text-white font-black text-lg shadow-xl shadow-logo-sky/20 hover:shadow-logo-sky/40 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]">
                Log In
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <p className="text-center text-sm font-bold text-(--text-secondary)">
                Don't have an account?{" "}
                <Link
                  to="/signUp"
                  className="text-logo-sky hover:underline decoration-2 underline-offset-4"
                >
                  Register now
                </Link>
              </p>
            </form>
          </div>

          {/* Visual Side */}
          <div className="relative hidden lg:block overflow-hidden">
            <div className="absolute inset-0 z-0">
              {carouselImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt="Travel"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{
                    opacity: index === currentImage ? 1 : 0,
                    scale: index === currentImage ? 1 : 1.1,
                  }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-logo-dark/80 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-14 left-14 right-14 z-10">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-5xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-2xl">
                  Escape the <br /> Ordinary
                </h2>
                <p className="text-lg text-white/80 font-medium max-w-md">
                  Join Yalla Trip and explore millions of places with a
                  community of travelers.
                </p>
              </motion.div>

              <div className="flex gap-2 mt-8">
                {carouselImages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === currentImage ? "w-8 bg-logo-sky" : "w-2 bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
