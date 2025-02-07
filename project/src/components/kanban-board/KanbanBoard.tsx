import styled from "styled-components";
import CardColumn from "./CardColumn";
import { flex } from "../../styles/mixins";
import AddListButton from "./AddListButton";
import AddCardModal from "./AddCardModal";
import { useKanbanBoardStore } from "../../store";

const KanbanBoard = () => {
  const {columns} = useKanbanBoardStore();

  const RenderCardColumns = columns.map((el, idx) => {
    return <CardColumn key={idx} columnName={el} />;
  });

  return (
    <Container>
      {/* 카드 추가 모달 */}
      <AddCardModal />
      {/* 프로젝트 이름 */}
      <ProjectName>Project No.1</ProjectName>
      {/* 작업별 카드 컬럼 */}
      <CardColumnContainer>
        {RenderCardColumns}
        <AddListButton />
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

const CardColumnContainer = styled.div`
  ${flex("row")};
  justify-content: start;
  align-items: start;
  column-gap: 20px;
`;
