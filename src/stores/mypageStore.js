import { create } from "zustand";

const useMypageStore = create((set) => ({
  id: "",
  avatarUrl: "",
  username: "",
  nickname: "",
  budget: "",
  weddingDay: "",
  profileImage: "",
  partnerName: null,
  weddingRole: "",
  myCode: "",
  emailAddress: "",

  setId: (id) => set({ id }),
  setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
  setUsername: (username) => set({ username }),
  setNickname: (nickname) => set({ nickname }),
  setBudget: (budget) => set({ budget }),
  setWeddingRole: (weddingRole) => set({ weddingRole }),
  setWeddingDay: (weddingDay) => set({ weddingDay }),
  setProfileImage: (profileImage) => set({ profileImage }),
  setPartnerName: (partnerName) => set({ partnerName }),
  setMyCode: (myCode) => set({ myCode }),
  setEmailAddress: (emailAddress) => set({ emailAddress }),
}));

export default useMypageStore;
