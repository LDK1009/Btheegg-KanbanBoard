import styled from "styled-components";
import Header from "../components/header/Header";
import KanbanBoard from "../components/kanban-board/KanbanBoard";
import { flex } from "../styles/mixins";

const Home = () => {
  return (
    <Container>
      <Header />
      <KanbanBoard />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  ${flex("column")};
  justify-content: flex-start;
`;
