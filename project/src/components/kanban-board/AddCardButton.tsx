import styled from "styled-components";
import { flex, mixinCommonButton } from "../../styles/mixins";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useAddCardModalStore } from "../../store";

type PropsType = {
  columnName: string;
};

const AddCardButton = ({ columnName }: PropsType) => {
  const { open: addCardModalOpen, setSelectedColumn } = useAddCardModalStore();

  return (
    <Container
      onClick={() => {
        addCardModalOpen();
        setSelectedColumn(columnName);
      }}
    >
      <Text> 지금 바로 추가해보세요.</Text>
      <AddButton>
        <AddIcon />
      </AddButton>
    </Container>
  );
};

export default AddCardButton;

const Container = styled.div`
  width: 201px;
  height: 112px;
  ${flex("column")};
  row-gap: 13px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 255, 0.2);
  }
`;

const Text = styled.div`
  font-size: 12px;
  line-height: 120%;
  color: ${({ theme }) => theme.colors.gray1};
`;
const AddIcon = styled(AddOutlinedIcon)`
  width: 14px !important;
  height: 14px !important;
`;

const AddButton = styled.div`
  ${mixinCommonButton({ round: true })};
`;
