import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiMiniEnvelope } from "react-icons/hi2";
import TrueFocus from "../Truefocus";

function Footer() {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { label: "Our Story", to: "/about" },
    { label: "Destinations", to: "/destinations" },
    { label: "Travel Stories", to: "/stories" },
    { label: "Success Stories", to: "/success" },
  ];

  const supportLinks = [
    { label: "Help Center", to: "/help" },
    { label: "Become a Host", to: "/host" },
    { label: "Safety Resources", to: "/safety" },
  ];

  const socialIcons = [
    { Icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { Icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    {
      Icon: HiMiniEnvelope,
      href: "mailto:hello@yallatrip.com",
      label: "Email",
    },
  ];

  return (
    <footer className="bg-(--bg-primary) border-t border-(--border-color) pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="mb-6">
              <TrueFocus
                sentence="Yalla Trip"
                manualMode={true}
                blurAmount={3}
                borderColor="#31A8D0"
                glowColor="rgba(49, 168, 208, 0.4)"
                className="text-(--text-primary)"
              />
            </div>
            <p className="text-(--text-secondary) text-sm leading-relaxed max-w-sm">
              Bringing the world closer together, one suitcase at a time. Join
              our global community and start your next journey today.
            </p>
          </div>

          {/* EXPLORE COLUMN */}
          <div className="lg:col-span-2">
            <h4 className="text-(--text-primary) font-bold text-xs uppercase tracking-[0.15em] mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-(--text-secondary) text-sm hover:text-logo-sky transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT COLUMN */}
          <div className="lg:col-span-2">
            <h4 className="text-(--text-primary) font-bold text-xs uppercase tracking-[0.15em] mb-6">
              Support
            </h4>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-(--text-secondary) text-sm hover:text-logo-sky transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div className="lg:col-span-4">
            <h4 className="text-(--text-primary) font-bold text-xs uppercase tracking-[0.15em] mb-6">
              Stay Inspired
            </h4>
            <p className="text-(--text-secondary) text-sm mb-4">
              Weekly travel gems delivered to your inbox.
            </p>
            <div className="flex gap-2 p-1.5 bg-(--bg-secondary) border border-(--border-color) rounded-2xl focus-within:border-logo-sky/50 transition-all mb-6">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-none w-full px-3 py-2 text-sm text-(--text-primary) focus:ring-0 outline-none placeholder:text-(--text-tertiary)"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-logo-sky hover:bg-logo-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors duration-300"
              >
                Join
              </motion.button>
            </div>

            {/* SOCIALS */}
            <div className="flex gap-3">
              {socialIcons.map(({ Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{
                    y: -4,
                    backgroundColor: "var(--color-logo-sky)",
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-(--bg-secondary) text-(--text-tertiary) transition-all duration-300 border border-(--border-color)"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-(--border-color) flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-(--text-tertiary) text-[13px]">
            &copy; {currentYear} Yalla Trip. Crafted for explorers.
          </p>
          <div className="flex gap-8 text-[13px]">
            <Link
              to="/privacy"
              className="text-(--text-tertiary) hover:text-(--text-primary) transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-(--text-tertiary) hover:text-(--text-primary) transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-(--text-tertiary) hover:text-(--text-primary) transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
