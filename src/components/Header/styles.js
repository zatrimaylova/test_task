import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 100px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
`;

export const Navigation = styled.ul`
  width: 202px;
  height: 100%;
  list-style: none;
  display: flex;
`;

export const NavItem = styled.li`
  height: 100%;
  font-size: 16px;
  padding: 0 16px 30px;
  text-align: center;
  vertical-align: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;

  :hover {
    border-bottom: 2px solid #5ECE7B;
  }
`;

export const BrandIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const NavOptions = styled.div`
  display: flex;
  position: relative;
  width: 150px;
`;

export const Currencies = styled.div`
  cursor: pointer;
  margin-right: 22px;
  height: 30px;

  span {
    text-align: right;
  }
`;

export const CurrencyImg = styled.img`
  transform: ${props => props.condition ? 'rotate(180deg)' : 'rotate(0deg)'};
  margin: 0 0 5px 10px;
`;

export const Cart = styled.div`
  width: 20px;
  height: 18px;
  position: relative;

  img {
    width: 20px;
    height: 18px;
  }
`;

export const CartCount = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: -12px;
  right: -10px;
  display:  ${props => props.cart.lenght === 0 ? 'none' : 'block'};

  p {
    font-family: Roboto;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: white;
  }
`;

export const CurrenciesList = styled.ul`
  list-style: none;
  box-shadow: 0 0 20px rgba(168, 172, 176, 0.19);
  padding: 20px;
  position: absolute;
  top: 30px;
  font-size: 18px;
  display: ${props => props.condition ? 'block' : 'none'};

  li {
    margin-bottom: 20px;
    cursor: pointer;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;