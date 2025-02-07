import { flex } from "../../styles/mixins";
import Card from "./Card";
import styled, { keyframes } from "styled-components";
import AddCardButton from "./AddCardButton";
import { useDrop } from "react-dnd";
import { useCardDragStore, useKanbanBoardStore } from "../../store";
import CardColumnHeader from "./CardColumnHeader";
import { CardType } from "../../types/ui/kanban-board.type";

type PropsType = {
  columnName: string;
};

const CardColumn = ({ columnName }: PropsType) => {
  // store
  const { isDrag } = useCardDragStore();
  const { cards, addCard } = useKanbanBoardStore();

  // DnD hooks
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (card : CardType) => {
      addCard({
        ...card,
        columnName,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Data
  const filteredCards = cards?.filter((el) => {
    return columnName === el.columnName;
  });

  // Component
  const RenderCards = filteredCards?.map((el, idx) => {
    return (
      <Card
        key={idx}
        id={el.id}
        columnName={el.columnName}
        TagText={el.TagText}
        TagTextColor={el.TagTextColor}
        ContentText={el.ContentText}
      />
    );
  });

  return (
    <Container ref={drop} $isOver={isOver} $isDrag={isDrag}>
      {/* 컬럼 헤더 */}
      <CardColumnHeader columnName={columnName} cards={filteredCards} />
      {/* if(카드 개수 === 0) */}
      {/* true : 카드 추가 컴포넌트 렌더링  */}
      {filteredCards?.length === 0 && <AddCardButton />}
      {/* false : 카드 렌더링  */}
      {RenderCards}
    </Container>
  );
};

export default CardColumn;

// 드래그 중 애니메이션
const pulse = keyframes`
  0% {
    box-shadow: 0px 0px 0px rgba(0, 0, 255, 0.1);
  }
  50% {
    box-shadow: 0px 0px 8px rgba(0, 0, 255, 0.2);
  }
  100% {
    box-shadow: 0px 0px 0px rgba(0, 0, 255, 0.1);
  }
`;

type ContainerType = {
  $isOver: boolean;
  $isDrag: boolean;
};

const Container = styled.div<ContainerType>`
  ${flex("column")};
  align-items: start;
  row-gap: 14px;
  width: auto;
  height: auto;
  background-color: ${({ $isOver }) => ($isOver ? "rgba(0, 0, 255, 0.1)" : "")};
  animation: ${(props) => (props.$isDrag ? pulse : "none")} 2s infinite ease-in-out;
  transition: background-color 0.3s ease;
`;
