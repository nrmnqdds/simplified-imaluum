import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ScheduleProps = {
  schedule: Subject[];
  sessionName: string;
  sessionQuery: string;
};

type ScheduleType = {
  schedule: ScheduleProps[] | null | undefined;
  setSchedule: (schedule: ScheduleProps[]) => void;
};

const useSchedule = create(
  persist<ScheduleType>(
    (set) => ({
      schedule: null,
      setSchedule: (schedule) => set({ schedule }),
    }),
    {
      name: "schedule-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSchedule;
