import styled from 'styled-components';

export const Product = styled.div`
  flex-basis: 30%;
  min-height: 460px;
  padding: 16px;
  background-color: #FFFFFF;
  margin-bottom: 100px;
  position: relative;
  overflow-x: hidden;
  padding: 16px;

  :hover {
    box-shadow: 0 0 20px rgba(168, 172, 176, 0.19);
  }

  :hover img {
    right: 30px;
    opacity: 1;
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
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 52px;
  height: 52px;
  position: absolute;
  opacity: 0;
  display: block;
  top: 330px;
  right: -100px;
  cursor: pointer;
  transition: opacity 0.7s linear;
`;

export const Text = styled.div`
  padding-top: 26px;
`;

export const NameTitle = styled.h3`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
`;

export const TextDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 160%;

  span {
    font-weight: normal;
    font-size: 14px;
    line-height: 100%;
  }
`;

export const SwatchList = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const SwatchEl = styled.li`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid ${props => props.color.toUpperCase() === '#FFFFFF' ? 'black' : 'transparent'};
`;

export const ChangeCart = styled.div`
  span {
    cursor: pointer;
  }

  div {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }
`;

export const AddSpan = styled.span`
  padding: 5px 5px 0;
  transition: color 0.5s ease-in;

  &:hover {
    color: #5ECE7B;
  }
`;

export const RemoveSpan = styled.span`
  padding: 5px 5px 0;
  transition: color 0.5s ease-in;

  &:hover {
    color: #ef9b94;
  }
`;

export const AmountSpan = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
`;
