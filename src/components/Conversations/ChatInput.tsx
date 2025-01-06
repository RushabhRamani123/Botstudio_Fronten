import React, { useState, KeyboardEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { ChatInputProps } from "./ChatDTO";
const ChatInput: React.FC<ChatInputProps> = ({
  Note,
  Emoji,
  setEmoji,
  handleSendMessage,
}) => {
  const [message, setMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendMessage = () => {
    if (message.trim()) {
      handleSendMessage(message);
      setMessage("");
    }
  };
  useEffect(() => {
    setMessage((prevMessage) => prevMessage + Emoji);
    setEmoji("");
  }, [Emoji]);
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center mb-2">
      <Input
        className="flex-1 mr-2 rounded-full px-4 py-2
          border border-gray-200 
          focus:border-blue-500
          focus-visible:ring-0
          focus-visible:ring-offset-0
          focus:outline-none
          placeholder:text-gray-400"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={Note ? `Type a note...` : `Type a message...`}
      />
      <Button
        size="icon"
        onClick={sendMessage}
        className="text-white bg-blue-600 hover:bg-blue-700 rounded-full"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
