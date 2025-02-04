import styled from "styled-components";
import { bodyText } from "../../styles/mixins";

type PropsType = {
  children: string;
  color?: string;
};

const Tag = ({ children, color }: PropsType) => {
  return <Container $color={color}>{children}</Container>;
};

export default Tag;

type ContainerProps = {
  $color?: string; // 프라이머리 버튼 여부
};

const Container = styled.div<ContainerProps>`
  width: auto;
  height: auto;
  padding: 1.5px 8px;
  border-radius: 4px;
  background-color: #f5f5f5;
  ${bodyText({ type: 1, fontWeight: 600, lineHeight: "150%" })}
  color:${(props) => props.$color || "#666666"};
`;
