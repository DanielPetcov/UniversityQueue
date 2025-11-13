import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  userId: string | null;
  userName: string | null;
  setUserId: (id: string) => void;
  setUserName: (name: string) => void;
  clearUser: () => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      userName: null,
      setUserId: (id) => set({ userId: id }),
      setUserName: (name) => set({ userName: name }),
      clearUser: () => set({ userId: null, userName: null }),
    }),
    {
      name: "user-info",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
