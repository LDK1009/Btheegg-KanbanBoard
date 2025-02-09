import { create } from "zustand";

// Zustand 스토어 생성
type AddCardModalStoreType = {
  type: modalType;

  editCardId: number;
  setEditCardId: (id: number) => void;

  inputValue: {
    TagText: string;
    TagTextColor: string;
    ContentText: string;
  };
  setInputValue: (name: string, value: string) => void;
  clearInputValue: () => void;

  isOpen: boolean;
  open: (type: modalType) => void;
  close: () => void;

  selectedColumn: string;
  setSelectedColumn: (value: string) => void;
};

type modalType = "add" | "edit";

export const useAddCardModalStore = create<AddCardModalStoreType>((set) => ({
  type: "add",

  editCardId: 0,
  setEditCardId: (id) =>
    set(() => {
      return { editCardId: id };
    }),

  inputValue: {
    TagText: "",
    TagTextColor: "",
    ContentText: "",
  },
  setInputValue: (name, value) =>
    set((state) => {
      return { inputValue: { ...state.inputValue, [name]: value } };
    }),
  clearInputValue: () =>
    set(() => ({
      inputValue: {
        TagText: "",
        TagTextColor: "",
        ContentText: "",
      },
    })),

  isOpen: false, // 초기 상태
  open: (type) => set(() => ({ isOpen: true, type: type })),
  close: () => set(() => ({ isOpen: false })),

  selectedColumn: "시작 전",
  setSelectedColumn: (value) => set(() => ({ selectedColumn: value })),
}));
