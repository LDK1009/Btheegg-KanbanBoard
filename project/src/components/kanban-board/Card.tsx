import styled from "styled-components";
import { bodyText, flex, mixinTextEllipsis } from "../../styles/mixins";
import Tag from "./Tag";
import { CardType } from "../../types/ui/kanban-board.type";
import { useDrag } from "react-dnd";
import { useEffect } from "react";
import { useCardDragStore } from "../../store";

const Card = ({ TagText, TagTextColor, ContentText }: CardType) => {
  // store
  const { setIsDrag } = useCardDragStore();

  // hooks
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_item, monitor) => {
      if (!monitor.didDrop()) {
        setIsDrag(false); // 드래그 취소 시 강제 false 설정
      }
    },
  }));

  // useEffect
  useEffect(() => {
    setIsDrag(isDragging);
    console.log(isDragging);
  }, [isDragging, setIsDrag]);

  return (
    <Container ref={drag}>
      <Tag color={TagTextColor}>{TagText}</Tag>
      <Text>{ContentText}</Text>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  width: 201px;
  height: 112px;
  ${flex("column")};
  align-items: flex-start;
  row-gap: 10px;
  padding: 20px 18px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  background-color:#FFFFFF;
`;

const Text = styled.div`
  width: 100%;
  ${mixinTextEllipsis({ maxLine: 2 })}
  ${bodyText({ type: 1, fontWeight: 500, lineHeight: "120%" })}
`;
