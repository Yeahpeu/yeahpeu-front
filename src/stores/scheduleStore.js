import { create } from "zustand";

const scheduleStore = create((set) => {
  return {
    events: [],
    //NOTE - 낙관적 업데이트를 위한 코드
    addEvents: (newEvents) => {
      set((state) => {
        return { events: [...state.events, newEvents] };
      });
    },
  };
});
