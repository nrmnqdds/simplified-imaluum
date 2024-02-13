import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ResultType = {
  result: Result[] | null | undefined;
  setResult: (result: Result[]) => void;
};

const useResult = create(
  persist<ResultType>(
    (set) => ({
      result: null,
      setResult: (result) => set({ result }),
    }),
    {
      name: "result-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useResult;
