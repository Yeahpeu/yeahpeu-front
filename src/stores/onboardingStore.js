import { create } from "zustand";
import { STEP_KEYS } from "../components/onboardingSteps";

const useOnboardingStore = create((set, get) => ({
  currentStep: 0,
  selections: {
    wedding: [],
    styling: [],
    gift: [],
    house: [],
    honeymoon: [],
  },

  setCurrentStep: (step) => set({ currentStep: step }),

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
      selections: {
        wedding: [],
        styling: [],
        gift: [],
        house: [],
        honeymoon: [],
      },
    }),

  getAllSelections: () => {
    const { selections } = get();
    return {
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
