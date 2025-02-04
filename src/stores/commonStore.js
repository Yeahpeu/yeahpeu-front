import { create } from "zustand";

export const useCommonStore = create((set) => {
  return {
    activeIndex: "",
    setActiveIndex: (id) => {
      set(() => {
        return { activeIndex: id };
      });
    },
  };
});

export const useTabStore = create((set) => {
  return {
    activeTab: "",
    setActiveTab: (value) => {
      set(() => {
        return { activeTab: value };
      });
    },
  };
});
