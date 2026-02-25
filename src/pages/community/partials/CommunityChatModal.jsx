import { useState, useMemo, useRef, useEffect } from "react";
import {
  X,
  Search,
  Users,
  ChevronLeft,
  Send,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../../../context";
import { Communities } from "../dataCuommunity";

export default function CommunityChatModal({ onClose }) {
  const { AddedValue = [] } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [messages, setMessages] = useState({}); // { communityId: [messages] }
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);

  const joinedCommunities = useMemo(() => {
    return Communities.filter((c) => AddedValue.includes(c.id));
  }, [AddedValue]);

  const filteredCommunities = useMemo(() => {
    return joinedCommunities.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [joinedCommunities, searchQuery]);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedCommunity, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedCommunity) return;

    const newMsg = {
      id: Date.now(),
      text: inputValue,
      sender: "You",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedCommunity.id]: [...(prev[selectedCommunity.id] || []), newMsg],
    }));
    setInputValue("");
  };

  const getCommunityMessages = (id) => {
    const defaultMsgs = [
      {
        id: 1,
        text: "Welcome to the group! Let's plan our next trip.",
        sender: "Admin",
        time: "09:00 AM",
      },
      {
        id: 2,
        text: "Anyone interested in a weekend trip?",
        sender: "Amine",
        time: "10:30 AM",
      },
    ];
    return messages[id] ? [...defaultMsgs, ...messages[id]] : defaultMsgs;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-60 flex justify-end pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto"
        />

        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col h-screen pointer-events-auto border-l border-gray-100"
        >
          {/* CONTENT: List View or Chat View */}
          {!selectedCommunity ? (
            <>
              {/* Header - List View */}
              <div className="bg-[#0084ff] p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Users size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg leading-tight">
                      Community Chat
                    </h2>
                    <p className="text-sm text-blue-100 opacity-90">
                      Static messaging
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="hover:bg-white/10 p-2 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-4 bg-white border-b border-gray-100">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your communities..."
                    className="w-full bg-[#f3f6f9] border-none rounded-xl py-3 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  />
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto bg-white">
                {joinedCommunities.length === 0 ? (
                  <div className="flex flex-col h-full">
                    <div className="px-6 py-4">
                      <p className="text-gray-400 text-sm">
                        No joined communities
                      </p>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="px-6 py-4">
                      <p className="text-gray-500 text-sm font-medium">
                        Join a community to start chatting
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-2">
                    <div className="px-6 py-2">
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                        Your Communities ({joinedCommunities.length})
                      </p>
                    </div>
                    {filteredCommunities.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCommunity(c)}
                        className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition text-left"
                      >
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-100">
                          <img
                            src={c.img}
                            alt={c.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate">
                            {c.title}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {c.members} members
                          </p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Header - Chat View */}
              <div className="bg-[#0084ff] p-4 flex items-center gap-3 text-white">
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="hover:bg-white/10 p-1.5 rounded-lg transition"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="h-10 w-10 rounded-lg overflow-hidden border border-white/20">
                  <img
                    src={selectedCommunity.img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-base truncate">
                    {selectedCommunity.title}
                  </h2>
                  <p className="text-xs text-blue-100 opacity-90">
                    {selectedCommunity.members} members
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="hover:bg-white/10 p-2 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 bg-[#f8fafc] space-y-4 custom-scrollbar"
              >
                {getCommunityMessages(selectedCommunity.id).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-gray-300">
                        {msg.time}
                      </span>
                    </div>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] shadow-sm ${
                        msg.sender === "You"
                          ? "bg-[#0084ff] text-white rounded-tr-none"
                          : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 bg-white border-t border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#f3f6f9] border-none rounded-xl py-3 px-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="bg-[#0084ff] text-white p-3 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 active:scale-95 disabled:opacity-50 transition"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
