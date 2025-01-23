import { create } from "zustand";

export const useCommonStore = create((set) => {
  return {
    activeIndex: 0,
    navItems: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
    setActiveIndex: () => {
      set((id) => {
        activeIndex: id;
      });
    },
  };
});
