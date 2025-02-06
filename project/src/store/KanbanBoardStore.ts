import { create } from "zustand";
import { CardColumnsType, CardType } from "../types/ui/kanban-board.type";

// Zustand 스토어 생성
type KanbanBoardStoreType = {
  cardColumns: CardColumnsType;
  addCard: (columnName: string, cardInfo: CardType) => void;
  // deleteCard: (id:number) => void;
};

export const useKanbanBoardStore = create<KanbanBoardStoreType>((set) => ({
  cardColumns: [
    {
      columnName: "시작 전",
      cards: [],
    },
    {
      columnName: "진행 중",
      cards: [
        {
          TagText: "관리자페이지",
          TagTextColor: "#7C0491",
          ContentText: "회원을 블랙리스트로 지정할 수 있는 기능을 작업합니다.",
        },
      ],
    },
    {
      columnName: "완료",
      cards: [
        {
          TagText: "사용자화면",
          TagTextColor: "#666666",
          ContentText: "장바구니에 상품을 추가하고 수정, 삭제하는 기능이 포함된 컴포넌트를 제작합니다.",
        },
        {
          TagText: "문서화",
          TagTextColor: "#0052EA",
          ContentText: "디자인시스템 2.1 버전로그를 작성합니다.",
        },
      ],
    },
  ],
  addCard: (columnName, newCard) =>
    set((state) => ({
      cardColumns: state.cardColumns.map((column) =>
        column.columnName === columnName ? { ...column, cards: [...(column.cards || []), newCard] } : column
      ),
    })),
  // close: () => set(() => ({ isOpen: false })),
}));
