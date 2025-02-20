import { create } from "zustand";

export const useBudgetStore = create((set, get) => ({
  budgets: [],
  totalBudget: 0,
  usedBudget: 0,

  setBudgets: (budgets) => set({ budgets }),

  addBudget: (newBudget) =>
    set((state) => ({
      budgets: [...state.budgets, newBudget],
    })),

  updateBudget: (id, updatedData) =>
    set((state) => ({
      budgets: state.budgets.map((budget) =>
        budget.id === id ? { ...budget, ...updatedData } : budget
      ),
    })),

  deleteBudget: (id) =>
    set((state) => ({
      budgets: state.budgets.filter(
        (budget) => String(budget.id) !== String(id)
      ),
    })),

  resetBudgets: () => set({ budgets: [] }),

  // 총 예산 값
  setTotalBudget: (total) => set({ totalBudget: total }),
  setUsedBudget: (used) => set({ usedBudget: used }),

  // 서브 카테고리 추가
  addSubCategory: (budgetId, subCategory) =>
    set((state) => ({
      budgets: state.budgets.map((budget) =>
        budget.id === budgetId
          ? {
              ...budget,
              subCategories: [...(budget.subCategories || []), subCategory],
            }
          : budget
      ),
    })),

  // 서브 카테고리 업데이트 (budgetId와 subCategory id 기준)
  updateSubCategory: (budgetId, subCategoryId, updatedData) =>
    set((state) => ({
      budgets: state.budgets.map((budget) => {
        if (budget.id === budgetId && budget.subCategories) {
          return {
            ...budget,
            subCategories: budget.subCategories.map((subCat) =>
              subCat.id === subCategoryId
                ? { ...subCat, ...updatedData }
                : subCat
            ),
          };
        }
        return budget;
      }),
    })),

  // 서브 카테고리 삭제
  deleteSubCategory: (budgetId, subCategoryId) =>
    set((state) => ({
      budgets: state.budgets.map((budget) => {
        if (budget.id === budgetId && budget.subCategories) {
          return {
            ...budget,
            subCategories: budget.subCategories.filter(
              (subCat) => String(subCat.id) !== String(subCategoryId)
            ),
          };
        }
        return budget;
      }),
    })),

  // 서브 카테고리 초기화
  resetSubCategories: (budgetId) =>
    set((state) => ({
      budgets: state.budgets.map((budget) =>
        budget.id === budgetId ? { ...budget, subCategories: [] } : budget
      ),
    })),
}));
