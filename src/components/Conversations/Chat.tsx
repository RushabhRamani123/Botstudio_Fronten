import React, { useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import UserProfile from "./UserProfile";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatActions from "./ChatActions";
import useStore from "../../app/chatStore";
import Giphy from "./Giphy";
import GifModal from "./GifModal";
import { useGifStore } from "../../app/gifStore";
import { genUid } from "../../utils/genUid";
// Define styles for animations
const styles = `
@keyframes bounce-dot {
  0%, 100% { 
    transform: translateY(0); 
    opacity: 0.7; 
  }
  50% { 
    transform: translateY(-6px); 
    opacity: 1; 
  }
}

.animate-bounce-dot {
  animation: bounce-dot 1.5s infinite ease-in-out;
  transform-origin: center;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

.message-fade-in {
  animation: fade-in 0.3s ease-out;
}
`;

const Chat: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNoteActive, setIsNoteActive] = useState(false);
  const [isReplyActive, setIsReplyActive] = useState<boolean>(false);
  const [Emoji, setEmoji] = useState<string>("");
  const { messages, addMessage, selectedChatId, chats } = useStore();
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const [isBothandle,setisBothandle] = useState(false); 
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const scrollbarsRef = useRef<Scrollbars>(null);
  const { gifVissible } = useGifStore();
  // Add styles to document
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  }, [messages]);

  const openDrawer = () => setIsDrawerOpen(true);

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      addMessage({
        id: genUid(),
        chatId: selectedChatId,
        text,
        sender: "employee",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isNote: isNoteActive,
      });
      setIsNoteActive(false);
      setIsReplyActive(false);
    }
  };

  const handleNoteClick = () => {
    setIsNoteActive(!isNoteActive);
    setIsReplyActive(false);
  };

  const handleReplyClick = () => {
    setIsReplyActive(!isReplyActive);
    setIsNoteActive(false);
  };

  const renderThumb = () => {
    const thumbStyle = {
      backgroundColor: "#888",
      borderRadius: "4px",
    };
    return <div style={thumbStyle} />;
  };
  const handleEmojiSelect = (emoji: string) => {
    console.log("This is in the chat");
    console.log(emoji);
    setEmoji(emoji);
  };
  const renderTrackVertical = () => {
    const trackStyle = {
      backgroundColor: "#f1f1f1",
      right: "2px",
      bottom: "2px",
      top: "2px",
      borderRadius: "3px",
    };
    return <div style={trackStyle} />;
  };

  if (!selectedChat) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <svg
            className="mx-auto mb-6 animate-fade-in"
            width="150"
            height="150"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="backgroundGradient"
                x1="0"
                y1="0"
                x2="120"
                y2="120"
              >
                <stop offset="0%" stopColor="#EBF4FF" />
                <stop offset="100%" stopColor="#DBEAFE" />
              </linearGradient>

              <linearGradient id="dotGradient" x1="0" y1="0" x2="0" y2="10">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>

              <filter
                id="dropShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="2"
                  floodOpacity="0.1"
                />
              </filter>
            </defs>

            <circle cx="60" cy="60" r="60" fill="url(#backgroundGradient)" />

            <path
              d="M35 45C35 39.4772 39.4772 35 45 35H75C80.5228 35 85 39.4772 85 45V65C85 70.5228 80.5228 75 75 75H45C39.4772 75 35 70.5228 35 65V45Z"
              fill="white"
              filter="url(#dropShadow)"
            />

            <circle
              className="animate-bounce-dot"
              cx="50"
              cy="55"
              r="5"
              fill="url(#dotGradient)"
              style={{ animationDelay: "0s" }}
            />
            <circle
              className="animate-bounce-dot"
              cx="60"
              cy="55"
              r="5"
              fill="url(#dotGradient)"
              style={{ animationDelay: "0.2s" }}
            />
            <circle
              className="animate-bounce-dot"
              cx="70"
              cy="55"
              r="5"
              fill="url(#dotGradient)"
              style={{ animationDelay: "0.4s" }}
            />

            <path
              d="M45 75L35 90H85L75 75H45Z"
              fill="white"
              filter="url(#dropShadow)"
            />
          </svg>
          <h2 className="text-2xl font-semibold mb-4 animate-fade-in">
            Start a Conversation
          </h2>
          <p className="text-gray-600 animate-fade-in">
            Please select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 flex flex-col border-r">
        {/* CHAT HEADER */}
        <ChatHeader
          userName={selectedChat.name}
          avatarSrc={`/api/placeholder/32/32`}
          openDrawer={openDrawer}
        />

        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-hidden">
          <Scrollbars
            ref={scrollbarsRef}
            renderThumbVertical={renderThumb}
            renderTrackVertical={renderTrackVertical}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
          >
            <div className="p-4 space-y-4">
              {messages.filter(message => message.chatId === selectedChatId).map((entry, index) => (
                <div
                  key={index}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  className="message-fade-in"
                >
                  <ChatMessage
                    text={entry.text}
                    GIFlink={entry.GIFlink}
                    ImageLink={entry.ImageLink}
                    sender={entry.sender}
                    timestamp={entry.timestamp}
                    isNote={entry.isNote}
                    dateSeparator={entry.dateSeparator}
                    avatarSrc="/api/placeholder/32/32"
                  />
                </div>
              ))}
            </div>
          </Scrollbars>
        </div>

        {/* CHAT FOOTER */}
        {!isBothandle?<div className="bg-white p-4 border-t-2 border-blue-300 ">
          <ChatInput
            Emoji={Emoji}
            setEmoji={setEmoji}
            Note={isNoteActive}
            handleSendMessage={handleSendMessage}
          />
          <ChatActions
            handleNoteClick={handleNoteClick}
            handleReplyClick={handleReplyClick}
            isLastMessageNoted={isNoteActive}
            isReplyActive={isReplyActive}
            handleEmojiSelect={handleEmojiSelect}
          />
          <div>{gifVissible && <Giphy />}</div>
        </div>:""}
      </div>
      <UserProfile
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      {/* This is the modal thing  */}
      <GifModal />
    </div>
  );
};
export default Chat;