import styled from 'styled-components';


export const CurrenciesList = styled.ul`
  list-style: none;
  box-shadow: 0 0 20px rgba(168, 172, 176, 0.19);
  padding: 20px;
  top: 30px;
  font-size: 18px;
  z-index: 3000;
  position: absolute;

  li {
    margin-bottom: 20px;
    cursor: pointer;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;