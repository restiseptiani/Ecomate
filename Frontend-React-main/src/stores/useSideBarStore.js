import {create} from 'zustand';

const useSideBarStore = create((set) => ({
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  }));

  export default useSideBarStore;