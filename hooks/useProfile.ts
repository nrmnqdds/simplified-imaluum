import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ProfileType = {
  profile: StudentInfo | null | undefined;
  setProfile: (profile: StudentInfo) => void;
  matricNo: string;
  setMatricNo: (matricNo: string) => void;
};

const useProfile = create(
  persist<ProfileType>(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      matricNo: "",
      setMatricNo: (matricNo) => set({ matricNo }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useProfile;
