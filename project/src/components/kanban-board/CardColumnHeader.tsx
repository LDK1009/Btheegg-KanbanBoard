import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { bodyText, flex, mixinCommonButton } from "../../styles/mixins";
import { CardType, ColumnType } from "../../types/ui/kanban-board.type";
import styled from "styled-components";
import { useAddCardModalStore, useKanbanBoardStore } from "../../store";
import { useRef } from "react";

type PropsType = {
  columnName: ColumnType;
  cards: CardType[];
};

const CardColumnHeader = ({ columnName, cards }: PropsType) => {
  // store
  const { open, setSelectedColumn } = useAddCardModalStore();
  const { deleteColumn } = useKanbanBoardStore();

  // hooks
  const headerRef = useRef<HTMLDivElement>(null);

  // useEffect
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 우클릭 메뉴 방지
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
      const isYes = confirm("선택한 컬럼을 삭제하시겠습니까?");
      if (isYes) {
        deleteColumn(columnName);
      }
    }
  };

  return (
    <HeaderContainer ref={headerRef} onContextMenu={handleRightClick}>
      <NameBadgeWrap>
        <Name>{columnName}</Name>
        <Bedge>{cards.length}</Bedge>
      </NameBadgeWrap>
      <AddButton
        onClick={() => {
          open("add");
          setSelectedColumn(columnName);
        }}
      >
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
