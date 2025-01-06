import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chat } from '../data';
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
  department?: string;
}

export interface Message {
  id:string; 
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

interface ChatStore {
  chats: Chat[];
  selectedChatId: string | null;
  messages: Message[];
  setSelectedChatId: (id: string) => void;
  addMessage: (message: Message) => void;
  getFilteredChats: (filter?: ChatFilter) => Chat[];
}

export interface ChatFilter {
  type: 'quick-access' | 'active'  | 'status';
  subtype?: string;
}

// Initialize with empty array instead of Chat import
const initialChats: Chat[] = Chat;

const useStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      chats: initialChats,
      selectedChatId:null,

      setSelectedChatId: (id) => set({ selectedChatId: id }),

      addMessage: (message) => set((state) => {
        const newMessages = [...state.messages, message];
        const updatedChats = state.chats.map(chat => {
          if (chat.id === state.selectedChatId) {
            return {
              ...chat,
              message: message.text || '',
              lastMessage: {
                text: message.text || '',
                sender: message.sender,
                timestamp: message.timestamp,
                isNote: message.isNote,
                priority: message.priority,
                ticketId: message.ticketId
              },
              status: message.status || chat.status,
              priority: message.priority || chat.priority
            };
          }
          return chat;
        });

        return {
          messages: newMessages,
          chats: updatedChats
        };
      }),

      getFilteredChats: (filter: ChatFilter) => {
        const state = get();
        const now = new Date();

        switch (filter.type) {
          case 'quick-access':
            return state.chats.filter(chat => {
              switch (filter.subtype) {
                case 'you':
                  return chat.assignedTo === 'currentUser';
                case 'mentions':
                  return chat.lastMessage?.text?.includes('@currentUser') || false;
                case 'vip':
                  return chat.category === 'vip';
                case 'all':
                  return true;
                default:
                  return false;
              }
            });

          case 'active':
            return state.chats.filter(chat => {
              switch (filter.subtype) {
                case 'active-chats':
                  return chat.status === 'active';
                case 'bot-handling':
                  return chat.lastMessage?.sender === 'bot' && 
                    new Date(chat.lastMessage.timestamp).getTime() > now.getTime() - 1800000;
                case 'unassigned':
                  return !chat.assignedTo;
                case 'waiting':
                  return chat.status === 'waiting';
                default:
                  return false;
              }
            });

         

          case 'status':
            return state.chats.filter(chat => {
              switch (filter.subtype) {
                case 'priority':
                  return chat.priority === 'high';
                default:
                  return chat.status === filter.subtype;
              }
            });

          default:
            return state.chats;
        }
      }
    }),
    {
      name: 'chat-store'
    }
  )
);

export default useStore;