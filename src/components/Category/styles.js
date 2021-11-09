import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 150px 100px 0;
  position: relative;
`;

export const Title = styled.h1`
  margin-bottom: 50px;
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