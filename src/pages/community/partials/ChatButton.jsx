import { MessageCircle } from "lucide-react";

export default function ChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Open community chat"
      title="Community Chat"
    >
      <div className="relative">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/40 group-hover:bg-blue-500/55 transition" />
        {/* Button */}
        <div className="relative bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition active:scale-95">
          <MessageCircle size={26} />
        </div>
      </div>
    </button>
  );
}