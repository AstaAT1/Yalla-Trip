import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, Bell, MessageSquare, Menu, X, Sun, Moon } from "lucide-react";
import Images from "../constants/Images";
import { useTheme } from "../context/ThemeContext";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?u=yalla";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("yt_profile");
      if (saved) {
        const p = JSON.parse(saved);
        setProfile(p);
      } else {
        setProfile(null);
      }
    } catch {
      setProfile(null);
    }
  }, [location.pathname]);

  const avatarSrc = profile?.avatar || DEFAULT_AVATAR;

  const isActive = (path) => {
    const match =
      path === "/contact"
        ? location.pathname.toLowerCase() === "/contact"
        : location.pathname === path;
    return match;
  };

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/destinations", label: "Destinations" },
    { to: "/community", label: "Community" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/contact", label: "Contact" },
  ];
  const [avatar, setAvatar] = useState(Images.profil);

  useEffect(() => {
    const loadAvatar = () => {
      try {
        const p = JSON.parse(localStorage.getItem("yt_profile") || "null");
        setAvatar(p?.avatar || Images.profil);
      } catch {
        setAvatar(Images.profil);
      }
    };

    loadAvatar();
    window.addEventListener("yt_profile_updated", loadAvatar);

    return () => window.removeEventListener("yt_profile_updated", loadAvatar);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full bg-(--bg-main)/95 backdrop-blur-xl shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* LOGO */}
        <Link to="/home" className="flex items-center gap-2 group">
          <img
            className=" w-15 h-15 object-cover transition-transform duration-300 group-hover:scale-105"
            src={theme === "dark" ? Images.logoBlack : Images.logoremove}
            alt="Yalla Trip Logo"
          />
          <span className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-(--text-primary)">
            Yalla Trip
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                isActive(link.to)
                  ? "text-logo-sky"
                  : "text-(--text-main) hover:text-logo-sky hover:bg-(--color-accent)/10"
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              {isActive(link.to) && (
                <motion.span
                  layoutId="navbar-active"
                  className="absolute inset-0 rounded-lg bg-logo-sky/10 z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* RIGHT: Icons + Profile + Burger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 pl-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg text-(--text-main) hover:text-logo-sky transition-colors"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block p-2 rounded-lg text-(--text-main) hover:text-logo-sky transition-colors"
            >
              <Bell size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block p-2 rounded-lg text-(--text-main) hover:text-logo-sky transition-colors"
            >
              <MessageSquare size={18} />
            </motion.button>
          </div>

          <Link to="/Profile" className="group block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <img
                src={avatar}
                alt="Profile"
                className={`w-9 h-9 rounded-full object-cover ring-2 ${theme === "dark" ? "ring-white/10" : "ring-black/5"} group-hover:ring-logo-sky transition-all duration-300`}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-logo-sky border-2 border-(--bg-primary)" />
            </motion.div>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-lg text-(--text-main) hover:bg-(--color-accent)/10 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-(--bg-primary) border-t border-(--border-color)"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    onClick={closeMenu}
                    to={link.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive(link.to)
                        ? "text-logo-sky bg-logo-sky/10"
                        : "text-(--text-primary) hover:bg-(--bg-secondary)"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
