import styled from 'styled-components';

export const Product = styled.div`
  flex-basis: 30%;
  height: 444px;
  padding: 10px;
  background-color: #FFFFFF;
  opacity: 50%;
  margin-bottom: 100px;

  p {
    margin: 25px 16px 0 0;
  }
`;

export const ProductImage = styled.div`
  width: 90%;
  height: 338px;
  background: url(${props => props.url});
  max-height: 338px;
  max-width: 356px;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 auto;
  padding-top: 150px;
`;

export const Title = styled.h3`
  text-align: center;
`;