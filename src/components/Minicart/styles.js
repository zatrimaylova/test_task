import styled from 'styled-components';

export const Product = styled.div`
  flex-basis: 30%;
  height: 444px;
  padding: 16px;
  background-color: #FFFFFF;
  margin-bottom: 100px;
  cursor: pointer;
  position: relative;
  overflow-x: hidden;
  padding: 16px;

  :hover {
    box-shadow: 0 0 20px rgba(168, 172, 176, 0.19);
  }

  :hover img {
    right: 30px;
  }
`;

export const ProductImage = styled.div`
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

export const Icon = styled.img`
  width: 52px;
  height: 52px;
  position: absolute;
  display: block;
  top: 330px;
  right: -100px;
`;

export const TextDetails = styled.div`
  display: flex;
  justify-content: space-between;
  
  div {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }
`;

export const AddSpan = styled.span`
  padding: 5px;

  &:hover {
    color: #5ECE7B;
  }
`;

export const RemoveSpan = styled.span`
  padding: 5px;

  &:hover {
    color: #ef9b94;
  }
`;

