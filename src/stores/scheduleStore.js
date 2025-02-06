import { create } from "zustand";

export const useScheduleStore = create((set) => ({
  schedules: [], // 전체 스케줄
  scheduleDetails: {}, // 상세 스케줄
  categories: [],

  addSchedule: (newSchedule) =>
    set((state) => ({
      schedules: [...state.schedules, newSchedule],
    })),

  updateSchedule: (id, updatedData) =>
    set((state) => ({
      schedules: state.schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updatedData } : schedule
      ),
      scheduleDetails: {
        ...state.scheduleDetails,
        [id]: { ...state.scheduleDetails[id], ...updatedData },
      },
    })),

  deleteSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.id !== id),
      scheduleDetails: Object.fromEntries(
        Object.entries(state.scheduleDetails).filter(([key]) => key !== id)
      ),
    })),

  setScheduleDetail: (id, detail) =>
    set((state) => ({
      scheduleDetails: {
        ...state.scheduleDetails,
        [id]: detail,
      },
    })),

  resetSchedules: () => set({ schedules: [], scheduleDetails: {} }),

  // 체크 리스트 수정 중
  addChecklist: (newSchedule) =>
    set((state) => ({
      schedules: [...state.schedules, newSchedule],
    })),

  updateChecklist: (id, updatedData) =>
    set((state) => ({
      schedules: state.schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updatedData } : schedule
      ),
      scheduleDetails: {
        ...state.scheduleDetails,
        [id]: { ...state.scheduleDetails[id], ...updatedData },
      },
    })),

  deleteChecklist: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.id !== id),
      scheduleDetails: Object.fromEntries(
        Object.entries(state.scheduleDetails).filter(([key]) => key !== id)
      ),
    })),

  resetChecklist: () => set({ schedules: [], scheduleDetails: {} }),

  setCategories: (categories) =>
    set(() => ({
      categories,
    })),

  // categories 상태를 초기화 (빈 객체로 리셋)
  resetCategories: () =>
    set(() => ({
      categories: [],
    })),
}));
