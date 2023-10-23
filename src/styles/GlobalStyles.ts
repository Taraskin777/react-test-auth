import { createGlobalStyle, css } from "styled-components";
import { normalize } from "styled-normalize";

const styles = css`
  * {
    box-sizing: border-box;
    white-space: nowrap;
  }
`;

const GlobalStyles = createGlobalStyle`
  ${normalize}
  ${styles}
`;

export default GlobalStyles;
