import styled, { keyframes } from "styled-components";
import { bodyText, flex, mixinTextEllipsis } from "../../styles/mixins";
import Tag from "./Tag";
import { CardType } from "../../types/ui/kanban-board.type";
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";
import { useAddCardModalStore, useCardDragStore, useKanbanBoardStore } from "../../store";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const Card = ({ id, columnName, TagText, TagTextColor, ContentText }: CardType) => {
  // store
  const { open, setInputValue, setEditCardId, setSelectedColumn } = useAddCardModalStore();
  const { setIsDrag } = useCardDragStore();
  const { deleteCard } = useKanbanBoardStore();
  // state
  const [menuVisable, setMenuVisable] = useState(false);

  // hooks
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    item: { ...{ id, columnName, TagText, TagTextColor, ContentText } },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_item, monitor) => {
      if (!monitor.didDrop()) {
        setIsDrag(false); // 드래그 취소 시 강제 false 설정
      }
    },
  }));

  // Fuction
  const handleEdit = () => {
    setMenuVisable(false);
    open("edit");
    setEditCardId(id);
    setSelectedColumn(columnName);

    const init = [
      {
        name: "TagText",
        value: TagText,
      },
      {
        name: "TagTextColor",
        value: TagTextColor,
      },
      {
        name: "ContentText",
        value: ContentText,
      },
    ];

    init.map((el) => {
      setInputValue(el.name, el.value || "");
    });
  };

  const handleDelete = () => {
    setMenuVisable(false);
    deleteCard(id);
  };

  // useEffect
  useEffect(() => {
    setIsDrag(isDragging);
    console.log(isDragging);
  }, [isDragging, setIsDrag]);

  // ESC 키 입력 시 메뉴 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuVisable(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Container ref={drag}>
      <Header>
        {/* 태그 */}
        <Tag color={TagTextColor}>{TagText}</Tag>
        {/* 메뉴 */}
        <MenuWrap>
          <MenuIcon onClick={() => setMenuVisable((state) => !state)} />
          {menuVisable && (
            <>
              <MenuBox>
                <MenuItem onClick={handleEdit}>수정</MenuItem>
                <MenuItem onClick={handleDelete}>삭제</MenuItem>
              </MenuBox>
            </>
          )}
        </MenuWrap>
      </Header>
      {/* 내용 */}
      <Text>{ContentText}</Text>
    </Container>
  );
};

export default Card;

const slideUp = keyframes`
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 201px;
  height: 112px;
  ${flex("column")};
  align-items: flex-start;
  row-gap: 10px;
  padding: 20px 18px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  background-color: #ffffff;
  cursor: grab;
  transition: box-shadow 0.3s ease-in-out;
  animation: ${slideUp} 0.3s ease-in-out both;

  &:hover {
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 255, 0.2);
  }
`;

const Header = styled.div`
  width: 100%;
  ${flex("row")}
  justify-content:space-between;
`;

const MenuWrap = styled.div`
  position: relative;
`;

const MenuIcon = styled(MoreHorizOutlinedIcon)`
  width: 20px !important;
  height: 20px !important;
  color: ${({ theme }) => theme.colors.gray1};
  cursor: pointer;
`;

const menuFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const MenuBox = styled.div`
  ${flex("column")}
  row-gap:4px;
  position: absolute;
  top: 20px;
  right: 0px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  animation: ${menuFadeIn} 0.3s ease-in-out;
`;

const MenuItem = styled.div`
  width: 50px;
  height: 25px;
  ${flex()}
  ${bodyText({ type: 1, lineHeight: "120%", fontWeight: 500 })}
  cursor: pointer;
`;

const Text = styled.div`
  width: 100%;
  ${mixinTextEllipsis({ maxLine: 2 })}
  ${bodyText({ type: 1, fontWeight: 500, lineHeight: "120%" })}
`;
