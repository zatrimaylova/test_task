import styled from 'styled-components';

export const Product = styled.div`
  flex-basis: 30%;
  height: 444px;
  padding: 16px;
  background-color: #FFFFFF;
  margin-bottom: 100px;
  cursor: pointer;

  :hover {
    box-shadow: 0 0 20px rgba(168, 172, 176, 0.19);
  }

  :hover div {
    display: block;
    padding: 0;
  }
`;

export const ProductImage = styled.div`
  width: 90%;
  height: 338px;
  background: url(${props => props.url});
  max-height: 338px;
  max-width: 356px;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto;
`;

export const Text = styled.div`
  padding-top: 26px;
`;

export const RoundIcon = styled.div`
  background-color: #5ECE7B;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-left: 75%;
  margin-top: -26px;
  display: none;
`;

export const Icon = styled.img`
  weight: 24px;
  height: 24px;
  margin: 14px 12px;
`;