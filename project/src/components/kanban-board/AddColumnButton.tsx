import styled from "styled-components";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { mixinCommonButton } from "../../styles/mixins";
import { useKanbanBoardStore } from "../../store";

const AddColumnButton = () => {
  const {addColumn} = useKanbanBoardStore();
  return (
    <Container onClick={()=>addColumn("새 컬럼")}>
      <AddIcon />
      <div>Add another list</div>
    </Container>
  );
};

export default AddColumnButton;

const Container = styled.div`
  ${mixinCommonButton({ round: false })};
  flex:1;
`;
const AddIcon = styled(AddOutlinedIcon)`
  width: 14px !important;
  height: 14px !important;
`;
