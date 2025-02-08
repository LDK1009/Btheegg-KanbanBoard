import styled from "styled-components";
import { flex } from "../../styles/mixins";
import Profile from "./Profile";

const Header = () => {
  return (
    <Container>
      <img src="/btheegg-logo.png" alt="비더에그 로고" />
      <Profile />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  ${flex("row")}
  width:100%;
  height: 88px;
  padding: 0px 120px;
  justify-content: space-between;
`;
