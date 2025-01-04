import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ChatEntry {
  dateSeparator?: string;
  text: string;
  sender: 'user' | 'bot' | 'employee';
  timestamp: string;
  isNote: boolean;
}

interface MessageStore {
  messages: ChatEntry[];
  appendMessage: (message: ChatEntry) => void;
  emojiMessage: (message: ChatEntry) => void;
}

const useMessageStore = create<MessageStore>()(
  persist(
    (set) => ({
      messages: [
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
        }
      ],   
      appendMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
      })),
      // handleemoji data for input
      emojiMessage : (message) =>set((state)=>({
        
          // text: "Project Map typically replies in under 2h.",
          // sender: 'employee',
          // timestamp: '10:20',
          // isNote: false
        messages : [...state.messages,message]
      })) 
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMessageStore; 