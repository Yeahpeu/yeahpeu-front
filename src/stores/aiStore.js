import moment from "moment";
import { create } from "zustand";

export const useAiStore = create((set, get) => ({
  // AI 플래너 관련
  homeAi: {},
  setHomeAi: (msg) => set({ homeAi: msg }),

  // AI 판사 관련
  chat: "",
  chatMessages: [
    {
      isAi: true,
      message:
        "안녕하세요, 예쀼의 AI판사 시누이입니다. <br/> 싸우게 된 원인을 말씀해 주세요.",
    },
  ],

  setChat: (chat) => set({ chat }),
  setChatMessages: (newMessage) =>
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        { isAi: newMessage.isAi, message: newMessage.message },
      ],
    })),
  resetChatMessages: () =>
    set({
      chatMessages: [
        {
          isAi: true,
          message:
            "안녕하세요, 예쀼의 AI판사 시누이입니다. <br/> 싸우게 된 원인을 말씀해 주세요.",
        },
      ],
    }),
}));
