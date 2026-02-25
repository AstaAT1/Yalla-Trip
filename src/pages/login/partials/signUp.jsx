import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaApple, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Sparkles, ArrowRight, User, Mail, Lock } from "lucide-react";
import Images from "../../../constants/Images";
import validate from "../../../components/validateForm";
import ThemeToggle from "../../../components/ThemeToggle";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const carouselImages = [Images.Trip5, Images.Trip4, Images.Trip6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = storedUsers.some(
      (user) => user.email === formData.email,
    );
    if (emailExists) {
      setErrors({ email: "Email already registered" });
      return;
    }

    const newUsers = [...storedUsers, formData];
    localStorage.setItem("users", JSON.stringify(newUsers));

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ name: formData.name, email: formData.email }),
    );

    navigate("/loginin");
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-(--bg-main) selection:bg-logo-sky/30">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <img
          src={Images.LoginBg}
          alt="Signup background"
          className="h-full w-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-(--bg-main) via-(--bg-main)/90 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-logo-sky/5 rounded-full blur-3xl -ml-64 -mb-64" />
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
          className="grid overflow-hidden rounded-4xl bg-(--bg-main) shadow-2xl lg:grid-cols-[1fr_1.1fr] lg:min-h-[700px]"
        >
          {/* Visual Side (Left on desktop) */}
          <div className="relative hidden lg:block overflow-hidden">
            <div className="absolute inset-0 z-0">
              {carouselImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt="Travel Experience"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{
                    opacity: index === currentImage ? 1 : 0,
                    scale: index === currentImage ? 1 : 1.1,
                  }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-logo-dark/90 via-logo-dark/30 to-transparent" />
            </div>

            <div className="absolute top-12 left-12 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-logo-sky/10 backdrop-blur-md text-logo-sky">
                  <Sparkles size={24} />
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                  Yalla Trip
                </h1>
              </div>
            </div>

            <div className="absolute bottom-12 left-12 right-12 z-10">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-logo-sky/20 backdrop-blur-md text-logo-sky text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  Join the Community
                </div>
                <h2 className="text-4xl font-black text-white leading-tight mb-3 tracking-tight">
                  Escape the <br /> Ordinary
                </h2>
                <p className="text-lg text-white/80 font-medium max-w-sm">
                  Create your account and start discovering the most beautiful
                  places in Morocco.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 sm:p-14">
            <div className="mb-8">
              <h2 className="text-4xl font-black text-(--text-primary) tracking-tight mb-2">
                Join the Adventure
              </h2>
              <p className="text-(--text-secondary) font-medium">
                Complete the details below to create your account.
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
                or sign up manually
              </span>
              <div className="h-px flex-1 bg-(--text-main) opacity-10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-black uppercase tracking-widest text-(--text-secondary)"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-(--text-tertiary)"
                    />
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full h-14 rounded-2xl bg-(--bg-main) pl-14 pr-6 text-sm font-black outline-none focus:ring-2 focus:ring-logo-sky/50 transition-all placeholder-(--text-main)/30 shadow-sm"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-[10px] font-bold pl-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-black uppercase tracking-widest text-(--text-secondary)"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-(--text-tertiary)"
                    />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full h-14 rounded-2xl bg-(--bg-main) pl-14 pr-6 text-sm font-black outline-none focus:ring-2 focus:ring-logo-sky/50 transition-all placeholder-(--text-main)/30 shadow-sm"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-bold pl-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2 relative">
                  <label
                    htmlFor="password"
                    className="text-xs font-black uppercase tracking-widest text-(--text-secondary)"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-(--text-tertiary)"
                    />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full h-14 rounded-2xl bg-(--bg-main) pl-14 pr-14 text-sm font-black outline-none focus:ring-2 focus:ring-logo-sky/50 transition-all placeholder-(--text-main)/30 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-(--text-tertiary) hover:text-logo-sky transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-[10px] font-bold pl-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2 relative">
                  <label
                    htmlFor="confirm"
                    className="text-xs font-black uppercase tracking-widest text-(--text-secondary)"
                  >
                    Confirm
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-(--text-tertiary)"
                    />
                    <input
                      id="confirm"
                      type={showConfirm ? "text" : "password"}
                      value={formData.confirm}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full h-14 rounded-2xl bg-(--bg-main) pl-14 pr-14 text-sm font-black outline-none focus:ring-2 focus:ring-logo-sky/50 transition-all placeholder-(--text-main)/30 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-(--text-tertiary) hover:text-logo-sky transition-colors"
                    >
                      {showConfirm ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirm && (
                    <p className="text-red-500 text-[10px] font-bold pl-1">
                      {errors.confirm}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="group mt-4 w-full h-14 rounded-2xl bg-linear-to-r from-logo-sky to-logo-dark text-white font-black text-lg shadow-xl shadow-logo-sky/20 hover:shadow-logo-sky/40 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Create Account
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <p className="text-center text-sm font-bold text-(--text-secondary)">
                Already have an account?{" "}
                <Link
                  to="/loginin"
                  className="text-logo-sky hover:underline decoration-2 underline-offset-4"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
