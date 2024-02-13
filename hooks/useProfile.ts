import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProfileType = {
  profile: StudentInfo | null | undefined;
  setProfile: (profile: StudentInfo) => void;
};

const useProfile = create(
  persist<ProfileType>(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProfile;
