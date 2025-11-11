import { create } from "zustand";

interface UserState {
  userId: string;
  setUserId: (id: string) => void;
  clearUserId: () => void;
}

export const userUser = create<UserState>((set) => ({
  userId: "",
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: "" }),
}));
