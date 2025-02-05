import styled from "styled-components";
import { bodyText, flex } from "../../styles/mixins";
import Tag from "./Tag";
import { CardType } from "../../types/ui/kanban-board.type";

const Card = ({ TagText, TagTextColor, ContentText }: CardType) => {
  return (
    <Container>
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
`;

const Text = styled.div`
  ${bodyText({ type: 1, fontWeight: 500, lineHeight: "120%" })}
`;
