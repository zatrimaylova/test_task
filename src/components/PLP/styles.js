import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 150px 0 0;
  position: relative;
`;

export const Title = styled.h1`
  margin-bottom: 50px;
  font-style: normal;
  font-weight: normal;
  font-size: 42px;
  line-height: 160%;
`;

export const ProductList = styled.div`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 50px;

  &::after {
    content: "";
    justify-content: space-around;
  }
`;