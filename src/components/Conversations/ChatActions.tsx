import React from "react";
import { Button } from "../ui/button";
import { Paperclip, Image, MessageSquare, NotebookPen } from "lucide-react";
import EmojiPicker from "./EmojiPicker";
import { Gif } from "@phosphor-icons/react";
import { useGifStore } from "../../app/gifStore";
interface ChatActionsProps {
  handleNoteClick: () => void;
  handleReplyClick: () => void;
  isLastMessageNoted: boolean;
  isReplyActive: boolean;
  handleEmojiSelect: (emoji: string) => void;
}
const ChatActions: React.FC<ChatActionsProps> = ({
  handleNoteClick,
  handleReplyClick,
  isLastMessageNoted,
  isReplyActive,
  handleEmojiSelect,
}) => {
  const { toggleGif } = useGifStore();
  const handleClick = () => {
    toggleGif();
  };
  return (
    <div className="flex justify-between items-center align-middle">
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-gray-200"
          onClick={handleClick}
        >
          <Gif size={32} />
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-gray-200">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-gray-200">
          <Image className="h-4 w-4" />
        </Button>
        <EmojiPicker onSelectEmoji={handleEmojiSelect} />
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-200 ${
            isReplyActive ? "bg-blue-100" : ""
          }`}
          onClick={handleReplyClick}
        >
          <MessageSquare className="h-4 w-4 mr-1" /> Reply
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-200 ${
            isLastMessageNoted ? "bg-yellow-100" : ""
          }`}
          onClick={handleNoteClick}
        >
          <NotebookPen className="h-4 w-4 mr-1" /> Note
        </Button>
      </div>
    </div>
  );
};
export default ChatActions;