import { create } from 'zustand';

interface Flow {
  id: string;
  name: string;
  triggers: string;
  lastPublishedAt: string;
  sessions: number;
  completed: number;
  dropped: number;
  status: string;
}

interface Bot {
  id: string;
  name: string;
  lastUpdated: string;
  flows: number;
  sessions: number;
  dropped: number;
  flowDetails: Flow[];
}

interface BotStore {
  bots: Bot[];
  selectedBot: Bot | null;
  isModalOpen: boolean;
  newBotName: string;
  setNewBotName: (name: string) => void;
  openModal: () => void;
  closeModal: () => void;
  addBot: (name: string) => void;
  selectBot: (id: string) => void;
  addFlow: (botId: string, flowName: string) => void;
}

export const useBotStore = create<BotStore>((set) => ({
  bots: [
   
  ],
  selectedBot: null,
  isModalOpen: false,
  newBotName: '',
  setNewBotName: (name) => set({ newBotName: name }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, newBotName: '' }),
  addBot: (name) => set((state) => ({
    bots: [...state.bots, {
      id: (state.bots.length + 1).toString(),
      name,
      lastUpdated: 'Just now',
      flows: 0,
      sessions: 0,
      dropped: 0,
      flowDetails: []
    }],
    isModalOpen: false,
    newBotName: ''
  })),
  selectBot: (id) => set((state) => ({
    selectedBot: state.bots.find(bot => bot.id === id) || null
  })),
  addFlow: (botId, flowName) => set((state) => {
    const updatedBots = state.bots.map(bot => {
      if (bot.id === botId) {
        const newFlow = {
          id: (bot.flowDetails.length + 1).toString(),
          name: flowName,
          triggers: "New Trigger",
          lastPublishedAt: "-",
          sessions: 0,
          completed: 0,
          dropped: 0,
          status: "In Draft"
        };
        return {
          ...bot,
          flows: bot.flows + 1,
          flowDetails: [...bot.flowDetails, newFlow],
          lastUpdated: 'Just now'
        };
      }
      return bot;
    });

    const updatedSelectedBot = updatedBots.find(bot => bot.id === botId) || null;

    return {
      bots: updatedBots,
      selectedBot: updatedSelectedBot
    };
  }),
}));