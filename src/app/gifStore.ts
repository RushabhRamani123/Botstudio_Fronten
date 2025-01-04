import {create} from 'zustand';

interface GifState {
  isModalOpen: boolean;
  selectedGifUrl: string | null;
  gifVissible: boolean;
  toggleGifModal: (value: boolean, url: string | null) => void;
  toggleGif: () => void;
}

export const useGifStore = create<GifState>((set) => ({
  gifVissible: false,
  isModalOpen: false,
  selectedGifUrl: null,
  toggleGifModal: (value, url) => 
    set({
      isModalOpen: value,
      selectedGifUrl: url,
    }),
  toggleGif: () => set((state) => ({ gifVissible: !state.gifVissible }))
}));