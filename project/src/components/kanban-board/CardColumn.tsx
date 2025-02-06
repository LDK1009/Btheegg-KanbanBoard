import { flex } from "../../styles/mixins";
import Card from "./Card";
import styled, { keyframes } from "styled-components";
import { CardColumnType } from "../../types/ui/kanban-board.type";
import AddCardButton from "./AddCardButton";
import { useDrop } from "react-dnd";
import { useCardDragStore } from "../../store";
import CardColumnHeader from "./CardColumnHeader";

const CardColumn = ({ columnName, cards }: CardColumnType) => {
  // store
  const { isDrag } = useCardDragStore();

  // DnD hooks
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: () => alert("✅ 박스가 드롭되었습니다!"),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const RenderCards = cards.map((el, idx) => {
    return <Card key={idx} TagText={el.TagText} TagTextColor={el.TagTextColor} ContentText={el.ContentText} />;
  });

  return (
    <Container ref={drop} $isOver={isOver} $isDrag={isDrag}>
      {/* 컬럼 헤더 */}
      <CardColumnHeader columnName={columnName} cards={cards} />
      {/* if(카드 개수 === 0) */}
      {/* true : 카드 추가 컴포넌트 렌더링  */}
      {cards.length === 0 && <AddCardButton/>}
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
