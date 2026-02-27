import { useState } from "react";
import { motion } from "framer-motion";

export default function AIChatAssistant() {

  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello 👋 Ask me about your fleet performance." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: data.reply }
      ]);

    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "⚠ Unable to connect to AI server." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 
                 p-6 rounded-2xl shadow-lg"
    >
      <h3 className="text-cyan-400 text-xl font-semibold mb-6">
        🤖 AI Fleet Assistant
      </h3>

      <div className="h-64 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl text-sm ${
              msg.role === "user"
                ? "bg-emerald-500 text-black ml-auto"
                : "bg-black/30 text-gray-300"
            } max-w-[80%]`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <p className="text-gray-400 text-sm animate-pulse">
            AI is thinking...
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black/30 border border-white/10 
                     rounded-lg px-4 py-2 text-sm"
          placeholder="Ask about fleet performance..."
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500
                     px-4 py-2 rounded-lg text-black font-semibold"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}