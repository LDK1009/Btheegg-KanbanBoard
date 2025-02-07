import { MenuItem, Select } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { flex } from "../../styles/mixins";

type PropsType = {
  label?: string;
  selectValue: MenuType;
  menus: MenuType[];
  menuClick: Dispatch<SetStateAction<string>>;
};

type MenuType = string;

const CommonSelect = ({ label, selectValue, menus, menuClick }: PropsType) => {
  return (
    <Container>
      <Label>{label}</Label>
      <SelectContainer value={selectValue}>
        {menus.map((el, idx) => (
          <MenuItem key={idx} value={el} onClick={() => menuClick(el)}>
            {el}
          </MenuItem>
        ))}
      </SelectContainer>
    </Container>
  );
};

export default CommonSelect;

const Container = styled.div`
  width: 100%;
  ${flex("column")};
  align-items: start;
  row-gap: 6px;
`;
const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const SelectContainer = styled(Select)`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: white;

  & .MuiSelect-select {
    padding: 0px;
  }

  & input {
    border: 0px;
  }

  & fieldset {
    border: 1px solid #ccc;
  }

  &:hover fieldset {
    border-color: #ccc !important;
  }

  /* Select가 선택(포커스) 되었을 때 */
  &.Mui-focused fieldset {
    border-color: #007bff !important;
    border-width: 1px !important; /* ✅ 두께를 고정 */
  }
`;
