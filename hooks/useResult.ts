import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ResultType = {
  result: Result[] | null;
  setResult: (result: Result[] | null) => void;
  reset: () => void;
};

const useResult = create(
  persist<ResultType>(
    (set) => ({
      result: [],
      setResult: (result: Result[] | null) => set({ result }),
      reset: () => set({ result: [] }),
    }),
    {
      name: "result-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useResult;
