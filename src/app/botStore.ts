import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Bot, BotStore, Flow } from './DTO';
const getCurrentTimestamp = () => new Date().toISOString();
const generateId = () => Math.random().toString(36).substr(2, 9);
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
      botId:null,
      flowId:null,

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
        selectedFlow: null,
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
          Nodes: [],
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
        selectedFlow: state.bots.find(bot => bot.id === botId)?.flowDetails.find(flow => flow.id === flowId) || null,
        botId:botId,
        flowId:flowId
      })),

      // Flow Node Actions
      updateFlowNodes: (botId, flowId, nodes, edges = []) => set((state) => {
        const updatedBots = state.bots.map(bot => {
          if (bot.id === botId) {
            const updatedFlows = bot.flowDetails.map(flow => {
              if (flow.id === flowId) {
                return {
                  ...flow,
                  Nodes: nodes,
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
                Nodes: nodes, 
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