import { create } from "zustand";

const useOnboardingStore = create((set, get) => ({
  weddingRole: "",
  weddingDay: "",
  budget: 0,
  currentStep: 0,
  selectedCategoryIds: [],
  category: [],

  setWeddingRole: (role) => set({ weddingRole: role }),
  setWeddingDay: (day) => {
    // day가 이미 ISO 문자열이 아닌 경우에만 변환
    const dateString = day instanceof Date ? day.toISOString() : day;
    set({ weddingDay: dateString });
  },
  setBudget: (amount) => set({ budget: amount }),
  setCategory: (category) => set({ category: category }),

  setCurrentStep: (step) => set({ currentStep: step }),

  toggleCategoryId: (id) =>
    set((state) => ({
      selectedCategoryIds: state.selectedCategoryIds.includes(id)
        ? state.selectedCategoryIds.filter((categoryId) => categoryId !== id)
        : [...state.selectedCategoryIds, id],
    })),

  getCurrentProgress: () => {
    return get().currentStep * 25;
  },

  resetSelections: () =>
    set({
      currentStep: 0,
      weddingRole: "",
      weddingDay: "",
      budget: 0,
      selectedCategoryIds: [],
    }),

  getAllSelections: () => {
    const { weddingRole, weddingDay, budget, selectedCategoryIds } = get();
    return {
      weddingRole,
      weddingDay,
      budget,
      categoryIds: selectedCategoryIds,
    };
  },
}));

export default useOnboardingStore;
