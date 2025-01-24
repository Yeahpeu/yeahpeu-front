import { create } from "zustand";

const useCommonStore = create((set) => {
  return {
    activeIndex: 0,
    setActiveIndex: (id) => {
      set(() => {
        return { activeIndex: id };
      });
    },
  };
});

export const useTabStore = create((set) => {
  return {
    activeTab: "캘린더",
    setActiveTab: (value) => {
      set(() => {
        return { activeTab: value };
      });
    },
  };
});

export default useCommonStore;
