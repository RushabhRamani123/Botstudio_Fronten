import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatFilter, ChatStore } from './DTO';
import { Message } from 'react-hook-form';


const useStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      chats: [],
      selectedChatId: null,
      selectedMessageId: null,

      setSelectedChat: (chatId) => {
        const chat = get().chats.find(chat => chat.id === chatId);
        if (!chat) {
          console.warn(`Chat with id ${chatId} does not exist`);
          return;
        }
        set({ 
          selectedChatId: chatId,
          selectedMessageId: chat.messageId 
        });
        console.log(chat); 
        get().markChatAsRead(chatId);
      },

      clearSelectedChat: () => set({ 
        selectedChatId: null,
        selectedMessageId: null 
      }),

      getSelectedChatMessages: () => {
        const state = get();
        if (!state.selectedChatId) return [];
        return state.messages
          .filter(message => message.ticketId === state.selectedChatId)
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      },

      addMessage: (message) => set((state) => {
        const newMessages = [...state.messages, message];
        const updatedChats = state.chats.map(chat => {
          if (chat.id === state.selectedChatId) {
            return {
              ...chat,
              messageId: message.id,
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
              priority: message.priority || chat.priority,
              unread: message.sender !== 'employee'
            };
          }
          return chat;
        });

        if (state.selectedChatId === message.ticketId) {
          set({ selectedMessageId: message.id });
        }

        return {
          messages: newMessages,
          chats: updatedChats
        };
      }),

      updateMessageStatus: (messageId: string, status: Message['status']) => 
        set((state) => ({
          messages: state.messages.map(message =>
            message.id === messageId ? { ...message, status } : message
          )
        })),

      markChatAsRead: (chatId: string) => 
        set((state) => ({
          chats: state.chats.map(chat =>
            chat.id === chatId ? { ...chat, unread: false } : chat
          )
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
    }),
    {
      name: 'chat-store'
    }
  )
);

export default useStore;