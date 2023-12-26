import { create } from "zustand";

type ScheduleProps = {
  schedule?: any;
  sessionName: string;
  sessionQuery: string;
};

type ScheduleType = {
  schedule: ScheduleProps[] | null | undefined;
  setSchedule: (schedule: ScheduleProps[]) => void;
};

const useSchedule = create<ScheduleType>((set) => ({
  schedule: null,
  setSchedule: (schedule) => set({ schedule }),
}));

export default useSchedule;
