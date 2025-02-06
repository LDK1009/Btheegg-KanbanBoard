import { create } from "zustand";

// Zustand 스토어 생성
type AddCardModalStoreType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useAddCardModalStore = create<AddCardModalStoreType>((set) => ({
  isOpen: false, // 초기 상태
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}));
