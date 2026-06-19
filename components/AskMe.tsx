"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

const REPLY_TEXT = "不好意思，我家token额度不足1元了，所以这个功能暂时用不了😁";

const bubbleVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const dotTransition = {
  repeat: Infinity,
  duration: 0.6,
  ease: "easeInOut",
};

export default function AskMeContent() {
  const [messages, setMessages] = useState<{ type: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || sending) return;
    const q = input.trim();
    setMessages((prev) => [...prev, { type: "user", text: q }]);
    setInput("");
    setSending(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: REPLY_TEXT }]);
      setSending(false);
    }, 800);
  };

  return (
    <div className="h-full w-full flex flex-col px-6 md:px-12">
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-16 pb-6">
        <h2 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] mb-3">
          你对我有什么想问的？
        </h2>
        <p className="text-lg md:text-xl text-[#1a1a1a]/50">
          任何问题，我来回答
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pt-2 pb-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-[#1a1a1a]/25">
            还没有对话，在下方输入你的问题吧
          </div>
        )}
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              className={`flex mb-4 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={
                  msg.type === "user"
                    ? "max-w-[75%] px-5 py-3 rounded-2xl rounded-br-md bg-[#f97316] text-white text-base md:text-lg leading-relaxed shadow-sm"
                    : "max-w-[75%] px-5 py-3 rounded-2xl rounded-bl-md bg-white/80 backdrop-blur border border-[#1a1a1a]/5 text-[#1a1a1a]/80 text-base md:text-lg leading-relaxed shadow-sm"
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {sending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-4"
          >
            <div className="px-5 py-3 rounded-2xl rounded-bl-md bg-white/80 backdrop-blur border border-[#1a1a1a]/5">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#f97316]/40"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ ...dotTransition, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 pb-8 pt-2">
        <div className="max-w-2xl mx-auto flex items-center gap-3 bg-white/70 backdrop-blur border border-[#1a1a1a]/10 rounded-2xl px-4 py-2 shadow-sm">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="输入你的问题..."
            disabled={sending}
            className="flex-1 bg-transparent text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 text-base md:text-lg px-2 py-2 outline-none disabled:opacity-40"
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#f97316] text-white hover:bg-[#ea580c] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
          >
            {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
