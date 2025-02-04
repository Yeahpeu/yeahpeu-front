import { create } from "zustand";

export const useWishStore = create((set) => ({
  wishes: [], // 나의 위시

  addWish: (newWish) =>
    set((state) => ({
      wishes: [...state.wishes, newWish],
    })),

  updateWish: (id, updatedData) =>
    set((state) => ({
      wishes: state.wishes.map((wish) =>
        wish.id === id ? { ...wish, ...updatedData } : wish
      ),
    })),

  deleteWish: (id) =>
    set((state) => ({
      wishes: state.wishes.filter((wish) => wish.id !== id),
    })),

  resetWishes: () => set({ wishes: [] }),
}));
