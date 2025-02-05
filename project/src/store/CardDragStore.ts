import { create } from "zustand";

// Zustand 스토어 생성
type CardDragStoreType = {
  isDrag: boolean;
  setIsDrag: (value: boolean) => void;
};

export const useCardDragStore = create<CardDragStoreType>((set) => ({
  isDrag: false, // 초기 상태
  setIsDrag: (value) => set(() => ({ isDrag: value })), // 상태 업데이트
}));
