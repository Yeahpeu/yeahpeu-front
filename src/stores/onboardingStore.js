import { create } from "zustand";
import { STEP_KEYS } from "../components/onboardingSteps";

const useOnboardingStore = create((set, get) => ({
  weddingRole: "",
  weddingDay: "",
  budget: 0,
  currentStep: 0,
  selections: {
    wedding: [],
    styling: [],
    gift: [],
    house: [],
    honeymoon: [],
  },

  setWeddingRole: (role) => set({ weddingRole: role }),
  setWeddingDay: (day) => set({ weddingDay: day }),
  setBudget: (amount) => set({ budget: amount }),

  setCurrentStep: (step) =>
    set(() => {
      return { currentStep: step };
    }),

  setSelections: (step, selections) =>
    set((state) => ({
      selections: {
        ...state.selections,
        [step]: selections,
      },
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
      selections: {
        wedding: [],
        styling: [],
        gift: [],
        house: [],
        honeymoon: [],
      },
    }),

  getAllSelections: () => {
    const { weddingRole, weddingDay, budget, selections } = get();
    return {
      weddingRole,
      weddingDay,
      budget,
      selectedTasks: STEP_KEYS.reduce((acc, key) => {
        return [
          ...acc,
          ...selections[key].map((task) => ({
            category: key,
            task: task,
          })),
        ];
      }, []),
    };
  },
}));

export default useOnboardingStore;
