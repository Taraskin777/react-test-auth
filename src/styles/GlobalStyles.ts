import { createGlobalStyle, css } from "styled-components";
import { normalize } from "styled-normalize";

const styles = css`
  * {
    box-sizing: border-box;
    white-space: nowrap;
  }
  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    color: red;
  }
`;

const GlobalStyles = createGlobalStyle`
  ${normalize}
  ${styles}
`;

export default GlobalStyles;
