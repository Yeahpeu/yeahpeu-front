import { create } from "zustand";

export const useScheduleStore = create((set) => ({
  schedules: [], // 전체 스케줄
  scheduleDetails: {}, // 상세 스케줄

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
}));
