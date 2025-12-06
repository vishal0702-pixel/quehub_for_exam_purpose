import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import axiosclient from "../utils/axiosclient";

function Aisupport() {
  const [messages, setMessages] = useState([]);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const chatEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const userText = watch("messages") || "";

  // Scroll to bottom whenever messages or loading change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const onSubmit = async (data) => {
    if (!data.messages.trim()) return;

    const newUserMsg = { role: "user", text: data.messages };
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    reset();
    setLoading(true);

    try {
      const response = await axiosclient.post("/ai/chat", {
        messages: updatedMessages,
      });

      const aiMsg = { role: "model", text: response.data.message };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "model", text: "⚠ Something went wrong!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-6 py-4 font-semibold shadow-md">
        QueHub AI Tutor 💡
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-y-auto px-6 py-4 space-y-3">
        {messages.length === 0 && !loading && (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Ask me anything 👇
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-500/30"
                  : "bg-[#1f2937] text-gray-200 border border-indigo-600 shadow-indigo-500/20"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[50%] px-4 py-3 rounded-2xl text-sm leading-relaxed bg-[#1f2937] text-gray-200 animate-pulse">
              QueHub AI is typing...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-end gap-3 px-6 py-4 border-t border-indigo-700 bg-[#111827] sticky bottom-0"
      >
        <textarea
          placeholder="Ask me anything..."
          rows={1}
          style={{ resize: "none" }}
          className="flex-1 max-w-xl px-4 py-3 bg-[#1f2937] border border-cyan-600 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 overflow-hidden"
          {...register("messages", { required: true, minLength: 2 })}
          onInput={(e) => (e.target.style.height = "auto")}
          onChange={(e) => (e.target.style.height = e.target.scrollHeight + "px")}
        />
        <button
          type="submit"
          className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 transition-all shadow-md text-white"
          disabled={errors.messages}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default Aisupport;
