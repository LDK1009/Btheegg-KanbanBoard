import { bodyText, flex, mixinCommonButton } from "../../styles/mixins";
import Card from "./Card";
import styled from "styled-components";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { CardColumnType } from "../../types/ui/kanban-board.type";
import AddCardButton from "./AddCardButton";

const CardColumn = ({ columnName, cards }: CardColumnType) => {
  return (
    <Container>
      <Header columnName={columnName} cards={cards} />
      {cards.length === 0 && <AddCardButton />}
      {cards.map((el, idx) => {
        return <Card key={idx} TagText={el.TagText} TagTextColor={el.TagTextColor} ContentText={el.ContentText} />;
      })}
    </Container>
  );
};

export default CardColumn;

const Container = styled.div`
  ${flex("column")};
  align-items: start;
  row-gap: 14px;
  width: auto;
  height: auto;
`;

const NameBadgeWrap = styled.div`
  ${flex("row")};
  column-gap: 8px;
`;

const Name = styled.div`
  ${bodyText({ type: 1, fontWeight: 800, lineHeight: "120%" })}
`;

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
