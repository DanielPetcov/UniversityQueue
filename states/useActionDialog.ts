import { create } from "zustand";

interface ActionDialogState {
  open: boolean;
  title: string;
  description: string;
  onConfirm?: () => void;

  openDialog: (options: {
    title: string;
    description: string;
    onConfirm?: () => void;
  }) => void;
  closeDialog: () => void;
}

export const useActionDialog = create<ActionDialogState>((set) => ({
  open: false,
  title: "",
  description: "",
  onConfirm: undefined,

  openDialog: ({ title, description, onConfirm }) =>
    set({ open: true, title, description, onConfirm }),
  closeDialog: () => set({ open: false }),
}));
