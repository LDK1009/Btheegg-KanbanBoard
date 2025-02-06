import styled from "styled-components";
import CardColumn from "./CardColumn";
import { flex } from "../../styles/mixins";
import AddListButton from "./AddListButton";
import AddCardModal from "./AddCardModal";

const KanbanBoard = () => {
  const cardColumns = [
    {
      columnName: "시작 전",
      cards: [],
    },
    {
      columnName: "진행 중",
      cards: [
        {
          TagText: "관리자페이지",
          TagTextColor: "#7C0491",
          ContentText: "회원을 블랙리스트로 지정할 수 있는 기능을 작업합니다.",
        },
      ],
    },
    {
      columnName: "완료",
      cards: [
        {
          TagText: "사용자화면",
          TagTextColor: "#666666",
          ContentText: "장바구니에 상품을 추가하고 수정, 삭제하는 기능이 포함된 컴포넌트를 제작합니다.",
        },
        {
          TagText: "문서화",
          TagTextColor: "#0052EA",
          ContentText: "디자인시스템 2.1 버전로그를 작성합니다.",
        },
      ],
    },
  ];

  const RenderCardColumns = cardColumns.map((el, idx) => {
    return <CardColumn key={idx} columnName={el.columnName} cards={el.cards} />;
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
