import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSchedule;
