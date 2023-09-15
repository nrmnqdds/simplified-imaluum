import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tSchedule, tScheduleDetail } from "../../index";
import { RootState } from "../index";

const initialState: tSchedule = {
  "2023-09-14": [
    {
      start: { hour: 1, minute: 20 },
      end: { hour: 3, minute: 40 },
      color: "pink",
      title: "coding",
    },
  ],
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addSchedule: (
      state,
      action: PayloadAction<{ date: string; data: tScheduleDetail }>
    ) => {
      if (!state[action.payload.date]) {
        state[action.payload.date] = [];
      }
      state[action.payload.date] = [
        ...state[action.payload.date],
        action.payload.data,
      ];
    },
    removeSchedule: (
      state,
      action: PayloadAction<{ date: string; index: number }>
    ) => {
      delete state[action.payload.date][action.payload.index];
    },
  },
});

export const { addSchedule, removeSchedule } = scheduleSlice.actions;
export const schedules = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
