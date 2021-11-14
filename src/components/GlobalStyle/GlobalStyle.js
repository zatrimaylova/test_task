import { createGlobalStyle } from 'styled-components';
import fontCSS from './fontsCSS';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };

  ${fontCSS}

  button {
    outline: none;
  };

  body {
    font-family: 'Raleway', sans-serif;
  }
`;

export default GlobalStyles;