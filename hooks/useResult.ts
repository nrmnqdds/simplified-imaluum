import { create } from "zustand";

type ResultType = {
  result: Result[] | null | undefined;
  setResult: (result: Result[]) => void;
};

const useResult = create<ResultType>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}));

export default useResult;
