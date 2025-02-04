import { create } from "zustand";

const useMypageStore = create((set) => ({
  id: "",
  userImg: "",
  username: "",
  nickname: "",
  budget: "",
  weddingDay: "",
  profileImage: "",
  partnerName: null,

  myCode: "",
  emailAddress: "",

  setId: (id) => set({ id }),
  setUserImg: (userImg) => set({ userImg }),
  setUsername: (username) => set({ username }),
  setNickname: (nickname) => set({ nickname }),
  setBudget: (budget) => set({ budget }),
  setWeddingDay: (weddingDay) => set({ weddingDay }),
  setProfileImage: (profileImage) => set({ profileImage }),
  setPartnerName: (partnerName) => set({ partnerName }),

  setMyCode: (myCode) => set({ myCode }),
  setEmailAddress: (emailAddress) => set({ emailAddress }),
}));

export default useMypageStore;
