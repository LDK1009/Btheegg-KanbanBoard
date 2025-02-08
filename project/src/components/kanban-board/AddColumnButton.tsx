import styled, { keyframes } from "styled-components";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { flex, mixinCommonButton, mixinCommonInput } from "../../styles/mixins";
import { useKanbanBoardStore } from "../../store";
import { useState } from "react";

const AddColumnButton = () => {
  // Store
  const { addColumn } = useKanbanBoardStore();

  // State
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  // 엔터 키 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addColumn(newColumnName);
      setNewColumnName(""); // 입력 후 초기화
      setIsInputVisible(false);
    }
  };

  return (
    <Container>
      {/* 버튼 */}
      <ButtonContainer onClick={() => setIsInputVisible((state) => !state)}>
        <AddIcon />
        <div>Add another list</div>
      </ButtonContainer>

      {/* 인풋 (애니메이션 적용) */}
      <InputWrapper isVisible={isInputVisible}>
        <Input
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 입력 감지
          placeholder="예) 새 컬럼"
        />
      </InputWrapper>
    </Container>
  );
};

export default AddColumnButton;

const Container = styled.div`
  ${flex("column")};
  flex: 1;
  row-gap: 14px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  ${mixinCommonButton({ round: false })};
  cursor:pointer;
`;

const AddIcon = styled(AddOutlinedIcon)`
  width: 14px !important;
  height: 14px !important;
`;

// 인풋 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const InputWrapper = styled.div<{ isVisible: boolean }>`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? "translateY(0)" : "translateY(-10px)")};
  animation: ${(props) => (props.isVisible ? fadeIn : "none")} 0.3s ease-out;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  width: 100%;
`;

const Input = styled.input`
  ${mixinCommonInput()}
`;
