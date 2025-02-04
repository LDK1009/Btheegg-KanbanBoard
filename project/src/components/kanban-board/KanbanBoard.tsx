import Card from "./Card";

const KanbanBoard = () => {
  const TD = [
    {
      TagText: "사용자화면",
      TagTextColor: "",
      ContentText: "회원을 블랙리스트로 지정할 수 있는 기능을 작업합니다.",
    },
  ];
  return (
    <div>
      {TD.map((el, idx) => {
        return <Card key={idx} TagText={el.TagText} TagTextColor={el.TagTextColor} ContentText={el.ContentText} />;
      })}
    </div>
  );
};

export default KanbanBoard;
