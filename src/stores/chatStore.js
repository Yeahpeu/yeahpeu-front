import { create } from "zustand";

export const useChatStore = create((set) => ({
  roomId: null,
  chatUsers: [],
  roomTitle: "",
  chat: "",
  userId: null,
  imageUrl: "",
  chatMessage: {
    message: "",
    sentAt: "",
    attachmentRequests: [
      {
        url: "",
        contentType: "",
      },
    ],
  },

  setUserId: (id) => set({ userId: id }),
  setRoomId: (roomId) => set({ roomId }),
  setRoomTitle: (roomTitle) => set({ roomTitle }),
  setChat: (chat) => set({ chat }),
  setChatUsers: (chatUsers) => set({ chatUsers }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setChatMessage: (message) =>
    set(() => ({
      chatMessage: message,
    })),

  setAttachment: (url, contentType) =>
    set((state) => ({
      chatMessage: {
        ...state.chatMessage,
        attachmentRequests: [{ url, contentType }],
      },
    })),

  resetChatMessage: () =>
    set({
      chatMessage: {
        message: "",
        sentAt: "",
        attachmentRequests: [{ url: "", contentType: "" }],
      },
    }),
}));

export const chatMessageStore = create((set) => ({
  chatMessage: {},
  setChatMessage: (chatMessage) => set({ chatMessage }),
}));
