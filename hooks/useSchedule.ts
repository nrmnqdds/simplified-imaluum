import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ScheduleProps = {
  schedule: Subject[];
  sessionName: string;
  sessionQuery: string;
};

type ScheduleType = {
  schedule: ScheduleProps[];
  setSchedule: (schedule: ScheduleProps[]) => void;
  reset: () => void;
};

const useSchedule = create(
  persist<ScheduleType>(
    (set) => ({
      schedule: [],
      setSchedule: (schedule: ScheduleProps[]) => set({ schedule }),
      reset: () => set({ schedule: [] }),
    }),
    {
      name: "schedule-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSchedule;
