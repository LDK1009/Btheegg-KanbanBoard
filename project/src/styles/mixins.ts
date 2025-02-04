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

// headText
