import moment from "moment";
import { create } from "zustand";

export const useScheduleStore = create((set, get) => ({
  schedules: [], // 전체 스케줄
  scheduleDetails: {}, // 상세 스케줄
  categories: [],
  selectedDate: moment().format("YYYY-MM-DD"),
  setSelectedDate: (date) => set({ selectedDate: date }),

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
        [id]: { ...(state.scheduleDetails[id] || {}), ...updatedData },
      },
    })),

  deleteSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter(
        (schedule) => String(schedule.id) !== String(id)
      ),
      scheduleDetails: Object.fromEntries(
        Object.entries(state.scheduleDetails).filter(
          ([key]) => key !== String(id)
        )
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

  // 체크 리스트 관련 함수 (필요 시 schedule 관련 함수와 합칠 수도 있음)
  addChecklist: (newChecklist) =>
    set((state) => ({
      schedules: [...state.schedules, newChecklist],
    })),

  updateChecklist: (id, updatedData) =>
    set((state) => ({
      schedules: state.schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updatedData } : schedule
      ),
      scheduleDetails: {
        ...state.scheduleDetails,
        [id]: { ...(state.scheduleDetails[id] || {}), ...updatedData },
      },
    })),

  deleteChecklist: (id) =>
    set((state) => ({
      schedules: state.schedules.filter(
        (schedule) => String(schedule.id) !== String(id)
      ),
      scheduleDetails: Object.fromEntries(
        Object.entries(state.scheduleDetails).filter(
          ([key]) => key !== String(id)
        )
      ),
    })),

  resetChecklist: () => set({ schedules: [], scheduleDetails: {} }),

  setCategories: (categories) =>
    set(() => ({
      categories,
    })),

  resetCategories: () =>
    set(() => ({
      categories: [],
    })),
}));
