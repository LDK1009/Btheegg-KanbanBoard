import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { bodyText, flex, mixinCommonButton } from "../../styles/mixins";
import { CardType, ColumnType } from "../../types/ui/kanban-board.type";
import styled from "styled-components";
import { useAddCardModalStore } from "../../store";

type PropsType = {
  columnName:ColumnType;
  cards:CardType[];
}


const CardColumnHeader = ({ columnName, cards }: PropsType) => {
  const { open } = useAddCardModalStore();

  return (
    <HeaderContainer>
      <NameBadgeWrap>
        <Name>{columnName}</Name>
        <Bedge>{cards.length}</Bedge>
      </NameBadgeWrap>
      <AddButton onClick={open}>
        <AddIcon />
      </AddButton>
    </HeaderContainer>
  );
};

export default CardColumnHeader;

const NameBadgeWrap = styled.div`
  ${flex("row")};
  column-gap: 8px;
`;

const Name = styled.div`
  ${bodyText({ type: 1, fontWeight: 800, lineHeight: "120%" })}
`;

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
  cursor: pointer;
`;
