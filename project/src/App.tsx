import { TouchBackend } from "react-dnd-touch-backend";
import Home from "./pages/Home";
import GlobalStyle from "./styles/GlobalStyle";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  const isMobile = "ontouchstart" in window;

  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <GlobalStyle />
        <Home />
      </DndProvider>
    </>
  );
}

export default App;
