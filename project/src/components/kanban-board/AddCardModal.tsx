import styled, { keyframes } from "styled-components";
import { useAddCardModalStore, useKanbanBoardStore } from "../../store";
import { Modal } from "@mui/material";
import { bodyText, flex, mixinCommonInput, mixinInputLabel, mixinInputWrapper } from "../../styles/mixins";
import Card from "./Card";
import CommonSelect from "../common/CommonSelect";

const AddCardModal = () => {
  ////////// Store
  const {
    editCardId,
    type,
    inputValue,
    setInputValue,
    clearInputValue,
    isOpen,
    close,
    selectedColumn,
    setSelectedColumn,
  } = useAddCardModalStore();
  const { cards, columns, addCard, editCard } = useKanbanBoardStore();

  ////////// State

  ////////// Function
  const handleSubmit = (e: React.FormEvent) => {
    if (type === "add") {
      e.preventDefault();
      close();
      addCard({ id: nextCardId, columnName: selectedColumn, ...inputValue });
      clearInputValue();
    }
    if (type === "edit") {
      e.preventDefault();
      editCard(editCardId, { id: editCardId, columnName: selectedColumn, ...inputValue });
      clearInputValue();
      close();
    }
  };

  ////////// Data
  const inputs = [
    {
      name: "TagText",
      label: "태그명",
      placeholder: "문서화",
      type: "text",
      value: inputValue.TagText,
      onChange: setInputValue,
    },
    {
      name: "ContentText",
      label: "설명",
      placeholder: "디자인시스템 2.1버전 로그를 작성합니다.",
      type: "text",
      value: inputValue.ContentText,
      onChange: setInputValue,
    },
  ];

  const colors = ["#111827", "#DC2626", "#D97706", "#2563EB", "#7C3AED"];

  const selectProps = {
    label: "컬럼",
    selectValue: selectedColumn,
    menus: columns,
    menuClick: setSelectedColumn,
  };

  const nextCardId = (cards[cards.length - 1]?.id + 1) | 1;

  ////////// Rendering
  const RenderInputs = inputs.map((el, idx) => {
    const { name, label, placeholder, type, value, onChange } = el;
    return (
      <InputWrapper>
        <InputLabel>{label}</InputLabel>
        <Input
          key={idx}
          name={el.name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required
        />
      </InputWrapper>
    );
  });

  const RenderColors = colors.map((el, idx) => (
    <ColorSelecter
      key={idx}
      $backgroundColor={el}
      $delay={(idx + 1) * 0.3}
      onClick={() => setInputValue("TagTextColor", el)}
    />
  ));

  ////////// Return
  return (
    <Modal open={isOpen} onClose={close}>
      <FormContainer onSubmit={handleSubmit}>
        {/* 프리뷰 + 입력란 */}
        <InputPreviewWrap>
          {/* 프리뷰 */}
          <PreviewContainer>
            <PreviewTitle>Preview</PreviewTitle>
            <CardPreview>
              <Card
                id={nextCardId}
                columnName={selectedColumn}
                TagText={inputValue.TagText}
                TagTextColor={inputValue.TagTextColor}
                ContentText={inputValue.ContentText}
              />
            </CardPreview>
          </PreviewContainer>
          {/* 입력란 */}
          <InputContainer>
            <InputTitle>Input</InputTitle>
            <InputWrap1>
              <InputWrap2>
                <CommonSelect {...selectProps} />
                {RenderInputs}
              </InputWrap2>
              <ColorSelecterContainer>{RenderColors}</ColorSelecterContainer>
            </InputWrap1>
          </InputContainer>
        </InputPreviewWrap>
        {/* 제출 버튼 */}
        <SubmitButton type="submit">{type === "add" ? "생성" : "수정"}</SubmitButton>
      </FormContainer>
    </Modal>
  );
};

export default AddCardModal;

const FormContainer = styled.form`
  width: 800px;
  height: 600px;
  padding: 24px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${flex("column")};
  justify-content: space-around;
  background-color: white;
  border-radius: 32px;
  outline: none; // 포커스 시 보더 방지
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* 모달 그림자 추가 */
`;

const InputPreviewWrap = styled.div`
  width: 100%;
  ${flex("row")};
  justify-content: space-around;
`;

////////// InputContainer 하위
const InputContainer = styled.div``;

const InputWrap1 = styled.div`
  width: 300px;
  height: 312px;
  ${flex("column")};
  justify-content: space-between;
`;

const InputWrap2 = styled.div`
  width: 100%;
  ${flex("column")};
  row-gap: 16px;
`;

const ColorSelecterContainer = styled.div`
  width: 100%;
  ${flex("row")};
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

type ColorSelecterType = {
  $delay: number;
  $backgroundColor: string;
};

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ColorSelecter = styled.div<ColorSelecterType>`
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  animation: ${slideDown} ${({ $delay }) => `${$delay}s`} ease forwards;
  &:hover {
    cursor: pointer;
  }
`;
////////// END

////////// PreviewContainer 하위
const PreviewContainer = styled.div``;

const CardPreview = styled.div`
  ${flex("row")}
  width:100%;
  background-color: #f0f0f0;
  padding: 100px 50px;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const PreviewTitle = styled.div`
  ${bodyText({ type: 5, lineHeight: "150%", fontWeight: 800 })};
  color: ${({ theme }) => theme.colors.gray3};
  text-align: center;
  margin-bottom: 12px;
`;

const InputTitle = styled(PreviewTitle)``;
////////// END

const SubmitButton = styled.button`
  ${bodyText({ type: 2, fontWeight: 800, lineHeight: "150%" })};
  ${flex()};
  width: 90%;
  padding: 12px 0px;
  border: 0px;
  border-radius: 8px;
  background-color: rgba(0, 0, 255, 0.2);
  color: white;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 255, 0.2);
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: rgba(0, 0, 255, 0.2);
    transform: scale(1.01);
  }

  &:active {
    background-color: white;
    color: rgba(0, 0, 255, 0.2);
    transform: scale(0.98);
  }
`;

const InputWrapper = styled.div`
  ${mixinInputWrapper()};
`;

const InputLabel = styled.label`
  ${mixinInputLabel()};
`;

const Input = styled.input`
  ${mixinCommonInput()};
`;
