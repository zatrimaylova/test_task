import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };

  button {
    outline: none;
  };

  body {
    font-family: 'Raleway', sans-serif;
    color: #1D1F22;
  }
`;

export default GlobalStyles;