import { create } from "zustand";

export const useChatStore = create((set) => ({
  roomId: null,
  roomTitle: "",
  chat: "",

  setRoomId: (roomId) => set({ roomId }),
  setRoomTitle: (roomTitle) => set({ roomTitle }),
  setChat: (chat) => set({ chat }),
}));
