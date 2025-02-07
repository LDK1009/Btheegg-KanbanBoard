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
      columnName: "진행 중",
      TagText: "관리자페이지",
      TagTextColor: "#7C0491",
      ContentText: "회원을 블랙리스트로 지정할 수 있는 기능을 제작합니다.",
    },
    {
      id: 2,
      columnName: "완료",
      TagText: "사용자화면",
      TagTextColor: "",
      ContentText: "장바구니에 상품을 추가하고 수정, 삭제하는 기능이 포함된 컴포넌트를 제작합니다.",
    },
    {
      id: 3,
      columnName: "완료",
      TagText: "문서화",
      TagTextColor: "#0052EA",
      ContentText: "디자인시스템 2.1 버전로그를 작성합니다.",
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
