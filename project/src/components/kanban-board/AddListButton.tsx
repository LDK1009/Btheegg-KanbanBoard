import styled from "styled-components";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { mixinCommonButton } from "../../styles/mixins";

const AddListButton = () => {
  return (
    <Container>
      <AddIcon />
      <div>Add another list</div>
    </Container>
  );
};

export default AddListButton;

const Container = styled.div`
  ${mixinCommonButton({ round: false })};
  flex:1;
`;
const AddIcon = styled(AddOutlinedIcon)`
  width: 14px !important;
  height: 14px !important;
`;
