import { create } from "zustand";
import { CardType, ColumnType } from "../types/ui/kanban-board.type";

// Zustand 스토어 생성
type KanbanBoardStoreType = {
  cards: CardType[];
  addCard: (cardInfo: CardType) => void;
  deleteCard: (id: number) => void;
  editCard: (id: number, updatedData: CardType) => void;

  columns: ColumnType[];
  addColumn: (columnName: string) => void;
  deleteColumn: (columnName: string) => void;
};

export const useKanbanBoardStore = create<KanbanBoardStoreType>((set) => ({
  ////////// 카드 관련
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
  // 카드 수정
  editCard: (id, updatedData) =>
    set((state) => ({
      cards: state.cards.map((card) => (card.id === id ? { ...updatedData } : card)),
    })),

  ////////// 컬럼 관련
  columns: ["시작 전", "진행 중", "완료"],

  // 컬럼 생성
  addColumn: (columnName) => {
    set((state) => {
      if (columnName.trim() === "") {
        alert("컬럼명을 입력해주세요");
        return state;
      }

      if (state?.columns.includes(columnName)) {
        alert("중복된 이름의 컬럼은 생성할 수 없습니다.");
        return state;
      }

      return {
        columns: [...state.columns, columnName],
      };
    });
  },

  // 컬럼 삭제
  deleteColumn: (columnName) => {
    if (["시작 전", "진행 중", "완료"].includes(columnName)) {
      alert(`"${columnName}" 컬럼은 삭제할 수 없습니다.`);
      return;
    }

    set((state) => ({
      columns: state.columns.filter((col) => col !== columnName),
    }));
  },
}));
