import { create } from "zustand";

export const useBudgetStore = create((set) => ({
  totalBudget: 0,
  usedBudget: 0,
  setTotalBudget: (budget) => set({ totalBudget: budget }),
  setUsedBudget: (budget) => set({ usedBudget: budget }),
}));
