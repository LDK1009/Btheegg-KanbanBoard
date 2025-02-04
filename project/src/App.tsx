import Header from "./components/header/Header";
import KanbanBoard from "./components/kanban-board/KanbanBoard";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <KanbanBoard/>
    </>
  );
}

export default App;
