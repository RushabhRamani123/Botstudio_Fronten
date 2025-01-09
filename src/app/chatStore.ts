import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatFilter, ChatStore } from './DTO';
import { initialMessages,initialChats } from '../data';
const useStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: initialMessages,
      chats: initialChats,
      selectedChatId: null,
      setSelectedChatId:(ChatId:string)=>{
      const chat = get().chats.find(chat => chat.id === ChatId);
      if (!chat) {
        console.warn(`Chat with id ${ChatId} does not exist`);
        return;
      }
        set({selectedChatId:ChatId});
      },
      addMessage: (message) => set((state) => {
        const newMessages = [...state.messages, message];        
        return {
          messages: newMessages,
        };
      }),
      getFilteredChats: (filter?: ChatFilter) => {
        const state = get();
        const now = new Date();

        if (!filter) return state.chats;

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
      },
    }),
  )
);
export default useStore;