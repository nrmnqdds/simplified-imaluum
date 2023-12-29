import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useResult;
