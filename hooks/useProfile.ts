import { create } from "zustand";

type ProfileType = {
  profile: StudentInfo | null | undefined;
  setProfile: (profile: StudentInfo) => void;
  matricNo: string;
  setMatricNo: (matricNo: string) => void;
};

const useProfile = create<ProfileType>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  matricNo: "",
  setMatricNo: (matricNo) => set({ matricNo }),
}));

export default useProfile;
