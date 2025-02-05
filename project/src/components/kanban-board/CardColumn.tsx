import { bodyText, flex, mixinCommonButton } from "../../styles/mixins";
import Card from "./Card";
import styled, { keyframes } from "styled-components";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { CardColumnType } from "../../types/ui/kanban-board.type";
import AddCardButton from "./AddCardButton";
import { useDrop } from "react-dnd";
import { useCardDragStore } from "../../store";

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
      <Header columnName={columnName} cards={cards} />
      {cards.length === 0 && <AddCardButton />}
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

const NameBadgeWrap = styled.div`
  ${flex("row")};
  column-gap: 8px;
`;

const Name = styled.div`
  ${bodyText({ type: 1, fontWeight: 800, lineHeight: "120%" })}
`;

////////// Header 컴포넌트
const Header = ({ columnName, cards }: CardColumnType) => {
  return (
    <HeaderContainer>
      <NameBadgeWrap>
        <Name>{columnName}</Name>
        <Bedge>{cards.length}</Bedge>
      </NameBadgeWrap>
      <AddButton>
        <AddIcon />
      </AddButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  ${flex("row")}
  justify-content:space-between;
`;

const Bedge = styled.div`
  width: 22px;
  height: 22px;
  ${flex()};
  font-size: 13px;
  font-weight: 800;
  line-height: 140%;
  background-color: #e9e9e9;
  color: ${({ theme }) => theme.colors.gray2};
  border-radius: 30px;
`;

const AddIcon = styled(AddOutlinedIcon)`
  width: 14px !important;
  height: 14px !important;
`;

const AddButton = styled.div`
  ${mixinCommonButton({ round: true })};
`;
////////// Header 컴포넌트 END
