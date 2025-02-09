import styled from "styled-components";
import CardColumn from "./CardColumn";
import { flex } from "../../styles/mixins";
import AddCardModal from "./AddCardModal";
import { useKanbanBoardStore } from "../../store";
import AddColumnButton from "./AddColumnButton";
import { useState } from "react";

const KanbanBoard = () => {
  // Store
  const { columns } = useKanbanBoardStore();

  // State
  const [projectName, setProjectName] = useState("Project No.1");
  const [isEditing, setIsEditing] = useState(false);

  // Fuction
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setIsEditing(false);
  };

  // Rendering
  const RenderCardColumns = columns.map((el, idx) => {
    return <CardColumn key={idx} columnName={el} />;
  });

  return (
    <Container>
      {/* 카드 추가 모달 */}
      <AddCardModal />
      {/* 프로젝트 이름 */}
      {isEditing ? (
        <ProjectNameInput
          type="text"
          value={projectName}
          onChange={handleNameChange}
          onBlur={toggleEditing}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <ProjectName onClick={toggleEditing}>{projectName}</ProjectName>
      )}

      {/* 작업별 카드 컬럼 */}
      <CardColumnContainer>
        {RenderCardColumns}
        <AddColumnButton />
      </CardColumnContainer>
    </Container>
  );
};

export default KanbanBoard;

const Container = styled.div`
  width: 800px;
  ${flex("column")};
  align-items: start;
  row-gap: 40px;
`;

const ProjectName = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 142%;
  letter-spacing: -2%;
  color: #3a3a3a;
`;

const ProjectNameInput = styled.input`
  font-size: 24px;
  font-weight: bold;
  line-height: 142%;
  letter-spacing: -2%;
  border: none;
  outline: none;
  background: transparent;
`;

const CardColumnContainer = styled.div`
  width: 100%;
  ${flex("row")};
  justify-content: start;
  align-items: start;
  row-gap: 48px;
  flex-wrap: wrap;
  column-gap: 20px;
`;
