import {create} from 'zustand';

export interface Chat {
  id: string;
  name: string;
  message: string;
  avatar: string;
  unread: boolean;
}

export interface Message {
  text?: string;
  GIFlink?: string;
  ImageLink?: string; 
  sender: 'user' | 'employee' | 'bot';
  timestamp: string;
  isNote?: boolean;
  dateSeparator?: string;
}

interface ChatStore {
  chats: Chat[];
  selectedChatId: string | null;
  messages: Message[];
  setSelectedChatId: (id: string) => void;
  addMessage: (message: Message) => void;
  updateChat: (id: string, updates: Partial<Chat>) => void;
}

const initialMessages: Message[] = [
  {
    dateSeparator: "MONDAY",
    text: "How do you decide on the pricing, I mean what is your definition of people?",
    sender: 'bot',
    timestamp: '10:18',
    isNote: false
  },
  {
    text: "Project Map typically replies in under 2h.",
    sender: 'employee',
    timestamp: '10:20',
    isNote: false
  },
  {
    text: "Good question! People means the users/customers and leads you store in the database but you can have as many agents as you'd like.",
    sender: 'employee',
    timestamp: '10:22',
    isNote: false
  },
  {
    dateSeparator: "YESTERDAY",
    text: "Exactly, and pricing is based on the number of 'people' you manage in the employee.",
    sender: 'bot',
    timestamp: '16:09',
    isNote: false
  },
  {
    text: "That helps, thanks!",
    sender: 'user',
    timestamp: '16:10',
    isNote: false
  },
  {
    text: "Glad we could clarify that for you! Let us know if you have any other questions.",
    sender: 'employee',
    timestamp: '16:12',
    isNote: false
  },
  {
    dateSeparator: "TODAY",
    text: "You're welcome! I can also provide you with more details on the pricing tiers if you'd like.",
    sender: 'bot',
    timestamp: '21:01',
    isNote: false
  },
  {
    text: "This man is interested for this product",
    sender: 'employee',
    timestamp: '21:01',
    isNote: true
  },
  {
    GIFlink:"https://media0.giphy.com/media/v1.Y2lkPWNmNWNhYWI5emhiMzRlMmk1ZTRhYmFkNnV0NXh0eXJoODhuNW4weHl6MXAxaXBxMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WG4uYteu6J0teNVxpT/giphy.gif",
    sender:"employee",
    timestamp:"14:25",
    isNote:false 
  }
];

const useStore = create<ChatStore>((set) => ({
  messages: initialMessages,
  chats: [{
    id: '1',
    name: 'Albert Flores',
    message: initialMessages[initialMessages.length - 1].text || '',  // Get the last message
    avatar: 'AF',
    unread: false
  }],
  selectedChatId: null,
  setSelectedChatId: (id) => set({ selectedChatId: id }),
  addMessage: (message) => set((state) => {
    const newMessages = [...state.messages, message];
    const updatedChats = state.chats.map(chat => ({
      ...chat,
      message: message.text || ''  // Update with the new message text
    }));
    return {
      messages: newMessages,
      chats: updatedChats
    };
  }),
  updateChat: (id, updates) => set((state) => ({
    chats: state.chats.map((chat) => 
      chat.id === id ? { ...chat, ...updates } : chat
    ),
  })),
}));

export default useStore;