import { LucideIcon } from "lucide-react";
import { ChatFilter } from "../../app/chatStore";
import { StringChain } from "lodash";
interface ChatListProps {
    filter?: ChatFilter;
    title?: string;
    onClose: () => void;
  }
  interface ChatMessageProps {
    text?: string;
    GIFlink?: string;
    ImageLink?: string; 
    sender: 'user' | 'employee' | 'bot';
    timestamp: string;
    isNote?: boolean;
    avatarSrc: string;
    dateSeparator?: string;
  }
  interface EmojiThing {
    id: StringChain;
    keywords: string[];
    name: string;
    native: string;
    shortcodes: string;
    unified: string;
  }
  interface EmojiPickerProps {
    onSelectEmoji: (emoji: string) => void;
  }
  interface ChatHeaderProps {
    userName: string;
    avatarSrc: string;
    openDrawer: () => void;
  }
  interface ChatInputProps {
    handleSendMessage: (message: string) => void;
    Note: boolean;
    Emoji:string; 
    setEmoji:React.Dispatch<React.SetStateAction<string>>;
  }
  interface ConversationItem {
    icon: LucideIcon;
    label: string;
    count: number;
    color?: string;
    filter: ChatFilter;
  }
  
  interface CategorySection {
    title: string;
    items: ConversationItem[];
  }
  
  interface ReplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (template: string) => void;
  }
export type {ChatListProps,ChatHeaderProps,ChatMessageProps,EmojiThing,EmojiPickerProps,ChatInputProps,CategorySection,ReplyModalProps}; 