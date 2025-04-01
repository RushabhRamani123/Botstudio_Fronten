import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ChatFilter, ChatStore } from './DTO';
import { initialMessages, initialChats } from '../data';

const useStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: initialChats,
      messages: initialMessages,
      selectedChatId: null,
      selectedMessageId: null,
      setSelectedChat: (chatId: string) => {
        const chat = get().chats.find(chat => chat.id === chatId);
        if (!chat) {
          console.warn(`Chat with id ${chatId} does not exist`);
          return;
        }
        set({ selectedChatId: chatId });
      },
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
      })),
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
      getSelectedChatMessages: () => {
        const state = get();
        return state.selectedChatId 
          ? state.messages.filter(msg => msg.chatId === state.selectedChatId)
          : [];
      },
      clearSelectedChat: () => set({ 
        selectedChatId: null,
        selectedMessageId: null 
      }),
      updateMessageStatus: (messageId, status) => set((state) => ({
        messages: state.messages.map(msg => 
          msg.id === messageId ? { ...msg, status } : msg
        )
      })),
      markChatAsRead: (chatId) => set((state) => ({
        chats: state.chats.map(chat => 
          chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
        )
      }))
    }),
    {
      name: "chat-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        chats: state.chats,
        messages: state.messages,
        selectedChatId: state.selectedChatId
      })
    }
  )
);

export default useStore;