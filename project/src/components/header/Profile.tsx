import styled from "styled-components";
import { bodyText, flex } from "../../styles/mixins";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const Profile = () => {
  return (
    <Container>
      <Img src="/avatar.png" alt="프로필 이미지" />
      <NameBox>
        <Name>이동규</Name>
        <DropIcon />
      </NameBox>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  ${flex("row")};
  column-gap: 12px;
`;

const Img = styled.img`
  width: 36px;
  height: 36px;
`;

const NameBox = styled.div`
  ${flex("row")};
  column-gap: 20px;
`;

const Name = styled.div`
  ${bodyText({ type: 1, fontWeight: 600, lineHeight: "150%" })};
  color: #3a3a3a;
`;

const DropIcon = styled(KeyboardArrowDownOutlinedIcon)`
  width: 24px;
  height: 24px;
`;
