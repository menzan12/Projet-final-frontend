import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { Message } from "../types";
import api from "../api/axios";

export default function Chat() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState("Chargement...");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    if (!bookingId || !user?._id) return;

    try {
      const res = await api.get(`/messages/booking/${bookingId}`);
      const data: Message[] = Array.isArray(res.data) ? res.data : [];

      setMessages(data);

      if (data.length > 0) {
        const firstMsg = data[0];
        const myId = user._id.toString();

        const senderId =
          typeof firstMsg.sender === "object"
            ? firstMsg.sender._id
            : firstMsg.sender;

        const isMine = senderId === myId;
        const otherUser = isMine ? firstMsg.receiver : firstMsg.sender;

        if (typeof otherUser === "object") {
          setReceiverId(otherUser._id);
          setReceiverName(otherUser.name);
        }
      }
    } catch (error) {
      console.error("Erreur fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [bookingId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!content.trim() || !user?._id || !receiverId) return;

    try {
      const res = await api.post("/messages", {
        receiverId,
        content: content.trim(),
        booking: bookingId,
      });

      setMessages((prev) => [...prev, res.data]);
      setContent("");
    } catch (error) {
      console.error("Erreur envoi message:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center font-bold text-gray-500">
        Chargement du chat...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* HEADER */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg flex justify-between items-center shrink-0 rounded-b-3xl">
        <h2 className="font-black text-xl tracking-wide">💬 Discussion</h2>
        <span className="text-xs font-bold uppercase bg-white/20 px-3 py-1 rounded-full">
          {receiverName}
        </span>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {messages.map((msg, index) => {
          const senderId =
            typeof msg.sender === "object" ? msg.sender._id : msg.sender;

          const isMe = senderId === user?._id;

          return (
            <div
              key={msg._id || index}
              className={`flex w-full ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-5 py-3 rounded-3xl shadow-md text-sm font-medium ${
                  isMe
                    ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                }`}
              >
                <p>{msg.content}</p>
                <div
                  className={`text-[10px] mt-1 font-bold opacity-70 ${
                    isMe ? "text-right" : "text-left"
                  }`}
                >
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "À l'instant"}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 bg-gray-50 px-4 py-3 rounded-2xl border outline-none text-sm"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          disabled={!content.trim()}
          className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-3 rounded-2xl font-black text-sm"
        >
          🚀 Envoyer
        </button>
      </div>
    </div>
  );
}
