import { create } from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';
import { Operations, ASKQUESTION } from '../data/index';

type ActionType = typeof Operations[number] | typeof ASKQUESTION[number] | null;

type FlowStore = {
  selectedOperation: typeof Operations[number] | null;
  setSelectedOperation: (operation: typeof Operations[number] | null) => void;
  stepIndex: number;
  setStepIndex: (index: number) => void;
  selectedAction: ActionType;
  setSelectedAction: (action: ActionType) => void;
};

export const useFlowStore = create<FlowStore>()(
  persist(
    (set) => ({
      selectedOperation: null,
      setSelectedOperation: (operation) => set({ selectedOperation: operation }),
      stepIndex: 0,
      setStepIndex: (index) => set({ stepIndex: index }),
      selectedAction: null,
      setSelectedAction: (action) => set({ selectedAction: action }),
    }),
    {
      name: 'flow-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);