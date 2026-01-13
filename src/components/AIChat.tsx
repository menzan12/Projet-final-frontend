import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, MessageSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function AIChat() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    const textToSend = input;
    setInput("");
    setIsLoading(true);

    try {
      // Récupération du token depuis le localStorage (ou ton store)
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5001/api/ai/ask",
        { text: textToSend },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // On s'assure que la réponse contient bien du texte
      const aiText =
        response.data.text || "Désolé, je n'ai pas pu générer de réponse.";

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      console.error("Erreur Chat:", error.response?.data || error.message);

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text:
          error.response?.data?.message ||
          "L'assistant est indisponible (vérifiez votre connexion au serveur).",
        sender: "ai",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header - Harmonisé en Bleu/Orange */}
            <div className="p-5 bg-blue-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm border border-white/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest">
                    SkillMarket <span className="text-orange-400">AI</span>
                  </h3>
                  <p className="text-[10px] text-blue-100 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Assistant disponible
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Zone de chat */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 custom-scrollbar"
            >
              {messages.length === 0 && (
                <div className="text-center mt-10 px-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <Bot className="w-8 h-8 text-blue-600 opacity-40" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">
                    Bonjour{" "}
                    <span className="text-blue-600 font-black">
                      {user?.name?.split(" ")[0] || "invité"}
                    </span>
                    , je suis votre assistant IA. Comment puis-je vous aider
                    aujourd'hui ?
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl max-w-[85%] text-[13px] leading-relaxed shadow-sm font-medium ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none shadow-blue-200"
                        : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                      Réflexion en cours...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Section */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Posez votre question..."
                  className="flex-1 px-5 py-3.5 bg-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/10 border border-transparent focus:border-blue-200 transition-all font-medium"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-3.5 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:bg-slate-300 shadow-lg shadow-blue-100 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[8px] text-center text-slate-400 mt-2 font-bold uppercase tracking-widest">
                Propulsé par SkillMarket AI Engine
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton Flottant Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 ${
          isOpen
            ? "bg-slate-900 text-white rotate-180"
            : "bg-blue-600 text-white"
        }`}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageSquare className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}
