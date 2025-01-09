export interface CustomerMetadata {
    totalTickets: number;
    memberSince: string;
    previousInteractions: number;
  }
  
  export interface LastMessage {
    text: string;
    sender: 'user' | 'employee' | 'bot';
    timestamp: string;
    isNote?: boolean;
    ticketId?: string;
    priority?: 'high' | 'medium' | 'low';
  }
  
  export interface Chat {
    id: string;
    name: string;
    message: string;
    avatar: string;
    unread?: boolean;
    category?: 'vip' | 'regular' | 'new' | 'returning' | 'internal';
    status?: 'active' | 'waiting' | 'resolved' | 'archived';
    priority?: 'high' | 'medium' | 'low';
    lastInteraction?: string;
    assignedTo?: string;
    customerMetadata?: CustomerMetadata;
    lastMessage?: LastMessage;
  }
  
  export interface Message {
    id: string;
    chatId:string;
    text?: string;
    GIFlink?: string;
    ImageLink?: string;
    sender: 'user' | 'employee' | 'bot';
    timestamp: string;
    isNote?: boolean;
    dateSeparator?: string;
    priority?: 'high' | 'medium' | 'low';
    status?: 'active' | 'waiting' | 'resolved' | 'archived';
    ticketId?: string;
  }
  
  export interface ChatFilter {
    type: 'quick-access' | 'active' | 'status';
    subtype?: string;
  }
  export interface ChatStore {
    chats: Chat[];
    selectedChatId: string | null;
    selectedMessageId: string | null;
    messages: Message[];
    setSelectedChat: (chatId: string) => void;
    addMessage: (message: Message) => void;
    getFilteredChats: (filter?: ChatFilter) => Chat[];
    getSelectedChatMessages: () => Message[];
    clearSelectedChat: () => void;
    updateMessageStatus: (messageId: string, status: Message['status']) => void;
    markChatAsRead: (chatId: string) => void;
  }