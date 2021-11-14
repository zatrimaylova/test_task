import styled from 'styled-components';

export const Product = styled.div`
  flex-basis: 30%;
  height: 444px;
  padding: 10px;
  background-color: #FFFFFF;
  opacity: 50%;
  margin-bottom: 100px;
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
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 160%;
  color: #8D8F9A;
`;

export const TextInfo = styled.div`
  padding-top: 26px;
  font-size: 18px;
  line-height: 160%;

  h3 {
    font-style: normal;
    font-weight: 300;
    color: #8D8F9A;
  }

  p {
    font-style: normal;
    font-weight: 500;
    color: #8D8F9A;
  }
`;