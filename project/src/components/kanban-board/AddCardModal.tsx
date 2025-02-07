import styled, { keyframes } from "styled-components";
import { useAddCardModalStore, useKanbanBoardStore } from "../../store";
import { Modal } from "@mui/material";
import CommonInput from "../common/CommonInput";
import { useState } from "react";
import { bodyText, flex } from "../../styles/mixins";
import Card from "./Card";
import CommonSelect from "../common/CommonSelect";

const AddCardModal = () => {
  ////////// Store
  const { isOpen, close } = useAddCardModalStore();
  const { columns, addCard } = useKanbanBoardStore();

  ////////// State
  const [column, setColumn] = useState(columns[0]);
  const [formData, setFormData] = useState({
    TagText: "",
    TagTextColor: "",
    ContentText: "",
  });

  ////////// Function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeColor = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      TagTextColor: value,
    }));
  };

  const clearFormData = () => {
    setFormData({
      TagText: "",
      TagTextColor: "",
      ContentText: "",
    });
  };

  ////////// Data
  const inputs = [
    {
      name: "TagText",
      label: "태그명",
      placeholder: "문서화",
      type: "text",
      value: formData.TagText,
      onChange: handleChange,
    },
    {
      name: "ContentText",
      label: "설명",
      placeholder: "디자인시스템 2.1버전 로그를 작성합니다.",
      type: "text",
      value: formData.ContentText,
      onChange: handleChange,
    },
  ];

  const colors = ["#111827", "#DC2626", "#D97706", "#2563EB", "#7C3AED"];


  const selectProps = {
    label: "컬럼",
    selectValue: column,
    menus: columns,
    menuClick: setColumn,
  };

  ////////// Rendering
  const RenderInputs = inputs.map((el, idx) => {
    const { label, placeholder, type, value, onChange } = el;
    return (
      <>
        <CommonInput
          key={idx}
          name={el.name}
          label={label}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          required={true}
        />
      </>
    );
  });

  const RenderColors = colors.map((el, idx) => (
    <ColorSelecter key={idx} $backgroundColor={el} $delay={(idx + 1) * 0.3} onClick={() => changeColor(el)} />
  ));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    close();
    addCard({columnName : column, ...formData});
    clearFormData();
  };

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
                columnName={column}
                TagText={formData.TagText}
                TagTextColor={formData.TagTextColor}
                ContentText={formData.ContentText}
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
        <SubmitButton type="submit">생성</SubmitButton>
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
