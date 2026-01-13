import React, { useState } from "react";
import {
  Send,
  Search,
  CheckCheck,
  MoreHorizontal,
  User,
  Paperclip,
} from "lucide-react";
import type { UniversalChatProps } from "../types/Message";

const UniversalChat: React.FC<UniversalChatProps> = ({
  conversations,
  messages,
  selectedConvId,
  currentUserId,
  onSelectConversation,
  onSendMessage,
  title = "Messages",
  accentColor = "blue",
}) => {
  const [inputValue, setInputValue] = useState("");

  const themeClass = accentColor === "blue" ? "bg-blue-500" : "bg-orange-500";
  const ringClass =
    accentColor === "blue" ? "focus:ring-blue-500" : "focus:ring-orange-500";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  const activeConv = conversations.find((c) => c._id === selectedConvId);
  const partnerInfo =
    activeConv?.lastMessage.sender._id === currentUserId
      ? activeConv?.lastMessage.receiver
      : activeConv?.lastMessage.sender;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[750px] w-full bg-transparent">
      {/* --- SIDEBAR : LISTE DES CONVERSATIONS --- */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
        <div className={`p-8 ${themeClass} text-white shadow-lg`}>
          <h3 className="font-[1000] uppercase text-xs tracking-[0.2em] mb-4 italic">
            {title}
          </h3>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
              size={16}
            />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border-none rounded-2xl text-xs placeholder:text-white/60 outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {conversations.map((conv) => {
            const isSentByMe = conv.lastMessage.sender._id === currentUserId;
            const partner = isSentByMe
              ? conv.lastMessage.receiver
              : conv.lastMessage.sender;

            return (
              <button
                key={conv._id}
                onClick={() => onSelectConversation(conv._id)}
                className={`w-full p-5 rounded-[2.2rem] flex items-center gap-4 transition-all duration-300 ${
                  selectedConvId === conv._id
                    ? `${themeClass} text-white shadow-xl scale-[1.02]`
                    : "hover:bg-slate-50 text-slate-900"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-inner ${
                      selectedConvId === conv._id
                        ? "bg-white/20"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    {partner.avatar ? (
                      <img
                        src={partner.avatar}
                        className="w-full h-full object-cover rounded-2xl"
                        alt={partner.name}
                      />
                    ) : (
                      partner.name.charAt(0)
                    )}
                  </div>
                </div>

                <div className="flex-1 text-left overflow-hidden">
                  <p className="font-black text-sm uppercase tracking-tighter truncate">
                    {partner.name}
                  </p>
                  <p className={`text-[11px] font-bold truncate opacity-70`}>
                    {isSentByMe && "Moi: "}
                    {conv.lastMessage.content}
                  </p>
                </div>

                {conv.unreadCount > 0 && selectedConvId !== conv._id && (
                  <span className="bg-orange-500 text-white text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full ring-4 ring-white shadow-lg">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- FENÊTRE DE CHAT --- */}
      <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
        {/* Header Chat */}
        {partnerInfo ? (
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl ${themeClass} flex items-center justify-center font-black shadow-lg`}
              >
                {partnerInfo.avatar ? (
                  <img
                    src={partnerInfo.avatar}
                    className="w-full h-full object-cover rounded-2xl"
                    alt=""
                  />
                ) : (
                  partnerInfo.name.charAt(0)
                )}
              </div>
              <div>
                <p className="font-black text-lg uppercase tracking-tighter leading-none">
                  {partnerInfo.name}
                </p>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 block">
                  {partnerInfo.email || "Utilisateur vérifié"}
                </span>
              </div>
            </div>
            <button className="p-3 hover:bg-white/10 rounded-xl transition-all">
              <MoreHorizontal />
            </button>
          </div>
        ) : (
          <div className="p-8 border-b border-slate-50 bg-slate-900 text-white h-[100px] flex items-center italic opacity-50 font-bold">
            Sélectionnez un contact pour discuter
          </div>
        )}

        {/* Zone des messages */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[#FBFDFF] custom-scrollbar">
          {messages.length > 0 ? (
            messages.map((msg) => {
              const isMe = msg.sender._id === currentUserId;
              return (
                <div
                  key={msg._id}
                  className={`flex ${
                    isMe ? "justify-end" : "justify-start"
                  } animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[75%] p-6 rounded-[2.5rem] text-sm font-bold shadow-sm ${
                      isMe
                        ? `${themeClass} text-white rounded-tr-none shadow-blue-200`
                        : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
                    <div
                      className={`flex items-center gap-2 mt-3 font-black uppercase text-[9px] opacity-60`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {isMe && (
                        <CheckCheck
                          size={14}
                          className={
                            msg.isRead ? "text-orange-400" : "text-white/50"
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 italic opacity-40">
              <User size={64} className="mb-4" />
              <p className="text-xs uppercase font-black tracking-widest">
                Aucun message ici
              </p>
            </div>
          )}
        </div>

        {/* Barre d'envoi */}
        <div className="p-8 bg-white border-t border-slate-100">
          <form onSubmit={handleSubmit} className="relative flex gap-4">
            <button
              type="button"
              className="p-5 text-slate-400 hover:text-blue-500 hover:bg-slate-50 rounded-2xl transition-all"
            >
              <Paperclip size={22} />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ecrivez votre message ici..."
              className={`flex-1 pl-8 pr-8 py-5 bg-slate-100 border-none rounded-[2.2rem] text-sm font-bold ${ringClass} transition-all outline-none`}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`p-5 ${themeClass} text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:scale-100`}
            >
              <Send size={22} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UniversalChat;
