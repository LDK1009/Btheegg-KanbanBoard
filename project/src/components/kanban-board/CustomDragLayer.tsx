import { useDragLayer } from "react-dnd";
import styled, { keyframes } from "styled-components";

// 🔹 진동 애니메이션 정의
const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
`;

// 🔹 커스텀 드래그 미리보기 스타일
const DragPreview = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  width: 100px;
  height: 100px;
  background-color: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  animation: ${shakeAnimation} 0.3s infinite; /* 🟢 드래그 중 진동 효과 */
`;

const CustomDragLayer = () => {
  const { item, itemType, currentOffset, isDragging } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  return (
    <DragPreview
      style={{
        left: currentOffset.x,
        top: currentOffset.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      🚀 드래그 중!
    </DragPreview>
  );
};

export default CustomDragLayer;
