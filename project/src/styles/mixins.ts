import { css } from "styled-components";

// flex
export const flex = (direction: "row" | "column" = "row") => css`
  display: flex;
  flex-direction: ${direction};
  align-items: center;
  justify-content: center;
`;

// bodyText
type BodyTextParamsType = {
  type: 1 | 2 | 3 | 4 | 5;
  fontWeight: 500 | 600 | 700 | 800;
  lineHeight: "120%" | "150%";
};

const BODY_TEXT_FONT_SIZES: Record<BodyTextParamsType["type"], string> = {
  1: "14px",
  2: "18px",
  3: "22px",
  4: "26px",
  5: "30px",
};

export const bodyText = ({ type, fontWeight, lineHeight }: BodyTextParamsType) => css`
  font-size: ${BODY_TEXT_FONT_SIZES[type]};
  font-weight: ${fontWeight};
  line-height: ${lineHeight};
`;

// CommonButton
type MixinCommonButtonType = {
  round: boolean;
};
export const mixinCommonButton = ({ round }: MixinCommonButtonType) => css`
  ${flex("row")};
  column-gap: 6px;
  padding: 1px 6px;
  border-radius: ${round ? "30px" : "6px"};
  background-color: ${({ theme }) => theme.colors.buttonBackgroundColor};
  color: ${({ theme }) => theme.colors.gray1};
  font-size: 13px;
  line-height: 120%;
`;

// TextEllipsis
type MixinTextEllipsisType = {
  maxLine: number;
};

export const mixinTextEllipsis = ({ maxLine }: MixinTextEllipsisType) => css`
display: -webkit-box;
-webkit-line-clamp: ${maxLine}; // 특정 줄 이상이면 ellipsis(...) 적용
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
word-wrap: break-word;
overflow-wrap: break-word;
`
export const mixinCommonInput = () => css `
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    outline: none;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    color: #999;
  }
`;