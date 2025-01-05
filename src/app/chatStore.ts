import { create } from 'zustand';

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
  department?: 'sales' | 'support' | 'global';
  status?: 'active' | 'waiting' | 'resolved' | 'archived';
  priority?: 'high' | 'medium' | 'low';
  lastInteraction?: string;
  assignedTo?: string;
  customerMetadata?: CustomerMetadata;
  lastMessage?: LastMessage;
}

export interface Message {
  text?: string;
  GIFlink?: string;
  ImageLink?: string;
  sender: 'user' | 'employee' | 'bot';
  timestamp: string;
  isNote?: boolean;
  dateSeparator?: string;
  priority?: 'high' | 'medium' | 'low';
  department?: 'sales' | 'support' | 'global';
  status?: 'active' | 'waiting' | 'resolved' | 'archived';
  ticketId?: string;
}

interface ChatStore {
  chats: Chat[];
  selectedChatId: string | null;
  messages: Message[];
  setSelectedChatId: (id: string) => void;
  addMessage: (message: Message) => void;
  getFilteredChats: (filter: ChatFilter) => Chat[];
}

export interface ChatFilter {
  type: 'quick-access' | 'active' | 'department' | 'status';
  subtype?: string;
}

// Merge all example chats into a single array
const mergedChats: Chat[] = [
  // Quick Access
  {
    id: '1',
    name: 'Sarah Johnson',
    message: 'I need urgent assistance with my enterprise account setup',
    avatar: 'SJ',
    unread: true,
    category: 'vip',
    priority: 'high',
    status: 'active',
    customerMetadata: {
      totalTickets: 12,
      memberSince: '2023-01-15',
      previousInteractions: 45
    },
    lastMessage: {
      text: 'I need urgent assistance with my enterprise account setup',
      sender: 'user',
      timestamp: '09:45',
      priority: 'high',
      ticketId: 'TK-1001'
    }
  },
  {
    id: '2',
    name: 'Team Discussion',
    message: '@alex Please review the customers integration request',
    avatar: 'TD',
    unread: true,
    category: 'internal',
    lastMessage: {
      text: '@alex Please review the customers integration request',
      sender: 'employee',
      timestamp: '10:15',
      isNote: true,
      ticketId: 'TK-1002'
    }
  },
  {
    id: '3',
    name: 'Michael Smith',
    message: 'Bot: Escalating to human support - Complex integration question',
    avatar: 'MS',
    status: 'active',
    category: 'regular',
    lastMessage: {
      text: 'I need help with the API integration. The documentation is not clear about rate limits.',
      sender: 'user',
      timestamp: '11:20',
      ticketId: 'TK-1003'
    }
  },
  {
    id: '4',
    name: 'Emma Davis',
    message: 'Awaiting customer response on proposed solution',
    avatar: 'ED',
    status: 'waiting',
    lastMessage: {
      text: 'I ve shared the solution. Please let me know if this helps.',
      sender: 'employee',
      timestamp: '14:30',
      ticketId: 'TK-1004'
    }
  },
  {
    id: '5',
    name: 'David Wilson',
    message: 'Interested in enterprise pricing for 500+ users',
    avatar: 'DW',
    category: 'new',
    priority: 'high',
    department: 'sales',
    lastMessage: {
      text: 'Could you provide details about enterprise pricing?',
      sender: 'user',
      timestamp: '15:45',
      ticketId: 'TK-1005'
    }
  },
  {
    id: '6',
    name: 'Lisa Chen',
    message: 'Technical issue with dashboard loading',
    avatar: 'LC',
    category: 'regular',
    priority: 'medium',
    department: 'support',
    lastMessage: {
      text: 'The dashboard is not loading after the latest update',
      sender: 'user',
      timestamp: '16:00',
      ticketId: 'TK-1006'
    }
  },
  {
    id: '7',
    name: 'Global Corp Inc.',
    message: 'Service disruption affecting multiple users',
    avatar: 'GC',
    category: 'vip',
    priority: 'high',
    status: 'active',
    lastMessage: {
      text: 'Urgent: Multiple users reporting login failures',
      sender: 'user',
      timestamp: '09:15',
      ticketId: 'TK-1007'
    }
  },
  {
    id: '8',
    name: 'Robert Brown',
    message: 'Issue resolved: Account access restored',
    avatar: 'RB',
    status: 'resolved',
    lastMessage: {
      text: 'Thank you for your help! Everything is working now.',
      sender: 'user',
      timestamp: '17:30',
      ticketId: 'TK-1008'
    }
  },
  {
    id: '9',
    name: 'Anna White',
    message: 'Still investigating payment processing delay',
    avatar: 'AW',
    status: 'active',
    priority: 'medium',
    lastMessage: {
      text: 'Our team is still investigating the cause of the delay',
      sender: 'employee',
      timestamp: '13:20',
      ticketId: 'TK-1009'
    }
  },
  {
    id: '10',
    name: 'Tech Solutions Ltd',
    message: 'Implementation completed successfully',
    avatar: 'TS',
    status: 'archived',
    lastMessage: {
      text: 'Project implementation completed. Closing ticket.',
      sender: 'employee',
      timestamp: '18:00',
      ticketId: 'TK-1010'
    }
  }
];

const useStore = create<ChatStore>((set, get) => ({
  messages: [],
  chats: mergedChats,
  selectedChatId: null,

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

      case 'department':
        return state.chats.filter(chat => chat.department === filter.subtype);

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
}));

export default useStore;