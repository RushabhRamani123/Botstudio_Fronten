import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Node Types
interface FlowNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    text: string;
    // Add other data properties as needed
  };
  measured?: {
    width: number;
    height: number;
  };
  selected?: boolean;
  dragging?: boolean;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
}

// Flow Types
interface Flow {
  id: string;
  name: string;
  triggers: string;
  lastPublishedAt: string;
  sessions: number;
  completed: number;
  dropped: number;
  status: 'Draft' | 'Published' | 'Archived';
  flowNodes?: FlowNode[];
  edges?: Edge[];
  createdAt: string;
  updatedAt: string;
}

// Bot Types
interface Bot {
  id: string;
  name: string;
  description?: string;
  lastUpdated: string;
  flows: number;
  sessions: number;
  dropped: number;
  flowDetails: Flow[];
  createdAt: string;
  status: 'Active' | 'Inactive' | 'Archived';
}

// Store Interface
interface BotStore {
  // State
  bots: Bot[];
  selectedBot: Bot | null;
  selectedFlow: Flow | null;
  isModalOpen: boolean;
  newBotName: string;
  isLoading: boolean;
  error: string | null;

  // Bot Actions
  setNewBotName: (name: string) => void;
  openModal: () => void;
  closeModal: () => void;
  addBot: (name: string, description?: string) => void;
  updateBot: (botId: string, updates: Partial<Bot>) => void;
  deleteBot: (botId: string) => void;
  selectBot: (id: string) => void;
  
  // Flow Actions
  addFlow: (botId: string, flowName: string) => void;
  updateFlow: (botId: string, flowId: string, updates: Partial<Flow>) => void;
  deleteFlow: (botId: string, flowId: string) => void;
  selectFlow: (botId: string, flowId: string) => void;
  
  // Flow Node Actions
  updateFlowNodes: (botId: string, flowId: string, nodes: FlowNode[], edges?: Edge[]) => void;
  
  // Error Handling
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Helper Functions
const getCurrentTimestamp = () => new Date().toISOString();

const generateId = () => Math.random().toString(36).substr(2, 9);

// Create Store
export const useBotStore = create<BotStore>()(
  persist(
    (set) => ({
      // Initial State
      bots: [],
      selectedBot: null,
      selectedFlow: null,
      isModalOpen: false,
      newBotName: '',
      isLoading: false,
      error: null,

      // Bot Actions
      setNewBotName: (name) => set({ newBotName: name }),
      
      openModal: () => set({ isModalOpen: true }),
      
      closeModal: () => set({ isModalOpen: false, newBotName: '' }),
      
      addBot: (name, description = '') => set((state) => {
        const newBot: Bot = {
          id: generateId(),
          name,
          description,
          lastUpdated: getCurrentTimestamp(),
          flows: 0,
          sessions: 0,
          dropped: 0,
          flowDetails: [],
          createdAt: getCurrentTimestamp(),
          status: 'Active'
        };
        
        return {
          bots: [...state.bots, newBot],
          isModalOpen: false,
          newBotName: ''
        };
      }),
      
      updateBot: (botId, updates) => set((state) => ({
        bots: state.bots.map(bot => 
          bot.id === botId 
            ? { 
                ...bot, 
                ...updates, 
                lastUpdated: getCurrentTimestamp() 
              }
            : bot
        ),
        selectedBot: state.selectedBot?.id === botId 
          ? { ...state.selectedBot, ...updates }
          : state.selectedBot
      })),
      
      deleteBot: (botId) => set((state) => ({
        bots: state.bots.filter(bot => bot.id !== botId),
        selectedBot: state.selectedBot?.id === botId ? null : state.selectedBot
      })),
      
      selectBot: (id) => set((state) => ({
        selectedBot: state.bots.find(bot => bot.id === id) || null,
        selectedFlow: null
      })),

      // Flow Actions
      addFlow: (botId, flowName) => set((state) => {
        const newFlow: Flow = {
          id: generateId(),
          name: flowName,
          triggers: "New Trigger",
          lastPublishedAt: "-",
          sessions: 0,
          completed: 0,
          dropped: 0,
          status: 'Draft',
          flowNodes: [],
          edges: [],
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp()
        };

        const updatedBots = state.bots.map(bot => {
          if (bot.id === botId) {
            return {
              ...bot,
              flows: bot.flows + 1,
              flowDetails: [...bot.flowDetails, newFlow],
              lastUpdated: getCurrentTimestamp()
            };
          }
          return bot;
        });

        return {
          bots: updatedBots,
          selectedBot: updatedBots.find(bot => bot.id === botId) || null
        };
      }),
      
      updateFlow: (botId, flowId, updates) => set((state) => {
        const updatedBots = state.bots.map(bot => {
          if (bot.id === botId) {
            const updatedFlows = bot.flowDetails.map(flow => 
              flow.id === flowId 
                ? { 
                    ...flow, 
                    ...updates, 
                    updatedAt: getCurrentTimestamp() 
                  }
                : flow
            );
            
            return {
              ...bot,
              flowDetails: updatedFlows,
              lastUpdated: getCurrentTimestamp()
            };
          }
          return bot;
        });

        return {
          bots: updatedBots,
          selectedBot: updatedBots.find(bot => bot.id === botId) || null,
          selectedFlow: state.selectedFlow?.id === flowId 
            ? { ...state.selectedFlow, ...updates }
            : state.selectedFlow
        };
      }),
      
      deleteFlow: (botId, flowId) => set((state) => {
        const updatedBots = state.bots.map(bot => {
          if (bot.id === botId) {
            return {
              ...bot,
              flows: bot.flows - 1,
              flowDetails: bot.flowDetails.filter(flow => flow.id !== flowId),
              lastUpdated: getCurrentTimestamp()
            };
          }
          return bot;
        });

        return {
          bots: updatedBots,
          selectedBot: updatedBots.find(bot => bot.id === botId) || null,
          selectedFlow: state.selectedFlow?.id === flowId ? null : state.selectedFlow
        };
      }),
      
      selectFlow: (botId, flowId) => set((state) => ({
        selectedFlow: state.bots
          .find(bot => bot.id === botId)
          ?.flowDetails.find(flow => flow.id === flowId) || null
      })),

      // Flow Node Actions
      updateFlowNodes: (botId, flowId, nodes, edges = []) => set((state) => {
        const updatedBots = state.bots.map(bot => {
          if (bot.id === botId) {
            const updatedFlows = bot.flowDetails.map(flow => {
              if (flow.id === flowId) {
                return {
                  ...flow,
                  flowNodes: nodes,
                  edges: edges,
                  updatedAt: getCurrentTimestamp()
                };
              }
              return flow;
            });
            
            return {
              ...bot,
              flowDetails: updatedFlows,
              lastUpdated: getCurrentTimestamp()
            };
          }
          return bot;
        });

        return {
          bots: updatedBots,
          selectedBot: updatedBots.find(bot => bot.id === botId) || null,
          selectedFlow: state.selectedFlow?.id === flowId 
            ? { 
                ...state.selectedFlow, 
                flowNodes: nodes, 
                edges: edges 
              } 
            : state.selectedFlow
        };
      }),

      // Error Handling
      setError: (error) => set({ error }),
      clearError: () => set({ error: null })
    }),
    {
      name: 'bot-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bots: state.bots,
        selectedBot: state.selectedBot,
        selectedFlow: state.selectedFlow,
      }),
    }
  )
);