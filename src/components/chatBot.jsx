import { IoIosSend } from "react-icons/io";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { X, Sparkles, MessageCircle, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const key = import.meta.env.VITE_APIKEY;

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, loading, isOpen]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim() || loading) return;

    const userMsg = message.trim();
    const newHistory = [...chatHistory, { role: "user", content: userMsg }];
    setChatHistory(newHistory);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key || ""}`,
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat",
            messages: [
              {
                role: "system",
                content:
                  "You are Ibn Battota, a legendary Moroccan traveler and wise assistant. Be helpful, concise, and professional.",
              },
              ...newHistory,
            ],
          }),
        },
      );

      const data = await response.json();

      if (data?.choices?.[0]?.message) {
        setChatHistory((prev) => [...prev, data.choices[0].message]);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("ChatBot Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Can you try again?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-[9999]">
      <AnimatePresence mode="wait">
        {isOpen ? (
          // CHAT BOX V5: Modern Tile
          <motion.div
            key="chat-v5"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            className="w-[340px] sm:w-[400px] h-[580px] bg-(--bg-primary) border border-(--border-color) shadow-2xl rounded-2xl flex flex-col origin-bottom-right"
          >
            {/* MINIMAL HEADER - No bar, just text */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-(--border-color)/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-logo-sky flex items-center justify-center text-white shadow-lg shadow-logo-sky/20">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-(--text-primary)">
                    Ibn Battota
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] font-medium text-(--text-tertiary)">
                      Online Assistant
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-(--bg-secondary) rounded-lg text-(--text-tertiary) hover:text-(--text-primary) transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* MESSAGE AREA - Clean white/dark-surface grid */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-(--bg-main) custom-scrollbar"
            >
              <div className="flex flex-col items-start max-w-[90%]">
                <div className="bg-(--bg-secondary) border-l-4 border-logo-sky p-3.5 rounded-r-xl rounded-b-xl text-(--text-primary) text-[13px] font-medium leading-[1.6]">
                  Salam! I'm Ibn Battota. How can I assist your travels today?
                </div>
              </div>

              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} w-full`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-xl text-[13px] font-medium leading-[1.6] ${
                      msg.role === "user"
                        ? "bg-logo-sky text-white rounded-tr-none"
                        : "bg-(--bg-secondary) border-l-4 border-logo-sky text-(--text-primary) rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-1.5 p-2 bg-(--bg-secondary) rounded-lg w-fit">
                  <span className="w-1 h-1 bg-logo-sky rounded-full animate-bounce" />
                  <span className="w-1 h-1 bg-logo-sky rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-1 bg-logo-sky rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* INPUT SECTION - Pill shaped for a precise look */}
            <form
              onSubmit={handleSend}
              className="p-4 bg-(--bg-secondary)/40 border-t border-(--border-color)/50"
            >
              <div className="flex items-center gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-(--bg-primary) border border-(--border-color) rounded-xl px-4 py-3 text-sm font-medium text-(--text-primary) outline-none focus:ring-1 focus:ring-logo-sky/50 focus:border-logo-sky/50 transition-all placeholder:text-(--text-tertiary)"
                />
                <button
                  type="submit"
                  disabled={!message.trim() || loading}
                  className="w-11 h-11 rounded-xl bg-logo-sky text-white flex items-center justify-center hover:bg-logo-sky/90 active:scale-95 disabled:opacity-30 transition-all shadow-md shadow-logo-sky/10"
                >
                  <IoIosSend size={22} />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          // TOGGLE BUTTON: Hides when open
          <motion.button
            key="toggle-pill-v5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-7 py-4 rounded-full bg-logo-sky text-white shadow-xl shadow-logo-sky/30 border-none outline-none group"
          >
            <HiOutlineChatAlt2
              size={24}
              className="group-hover:translate-x-0.5 transition-transform"
            />
            <span className="font-bold text-sm tracking-tight">
              Ibn Battota
            </span>
            <div className="h-2 w-2 rounded-full bg-white relative">
              <span className="animate-ping absolute inset-0 rounded-full bg-white opacity-70"></span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
