import { create } from "zustand";
import { CardType, ColumnType } from "../types/ui/kanban-board.type";

// Zustand 스토어 생성
type KanbanBoardStoreType = {
  cards: CardType[];
  columns: ColumnType[];
  addCard: (cardInfo: CardType) => void;
  deleteCard: (id: number) => void;
};

export const useKanbanBoardStore = create<KanbanBoardStoreType>((set) => ({
  cards: [
    {
      id: 1,
      columnName: "시작 전",
      TagText: "테스트1",
      TagTextColor: "#000000",
      ContentText: "테스트테스트테스트",
    },
    {
      id: 2,
      columnName: "진행 중",
      TagText: "테스트1",
      TagTextColor: "#000000",
      ContentText: "테스트테스트테스트",
    },
    {
      id: 3,
      columnName: "진행 중",
      TagText: "테스트1",
      TagTextColor: "#000000",
      ContentText: "테스트테스트테스트",
    },
    {
      id: 4,
      columnName: "완료",
      TagText: "테스트1",
      TagTextColor: "#000000",
      ContentText: "테스트테스트테스트",
    },
    {
      id: 5,
      columnName: "완료",
      TagText: "테스트1",
      TagTextColor: "#000000",
      ContentText: "테스트테스트테스트",
    },
  ],
  columns:["시작 전", "진행 중", "완료"],
  // 카드 생성
  addCard: (cardInfo) =>
    set((state) => ({
      cards: [...state.cards, cardInfo], // 새로운 카드 추가
    })),
  // 카드 삭제
  deleteCard: (id) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),
    })),
  }));
