import styled from 'styled-components';

export const Container = styled.div`
  width: 1240px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -620px;
  z-index: 1000;
  opacity: 1;
  background-color: white;
`;

export const BrandIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const HeaderOptions = styled.div`
  display: flex;
  position: relative;
  width: 150px;
`;

export const Currencies = styled.div`
  cursor: pointer;
  margin-right: 22px;
  height: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;

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
  cursor: pointer;
  color: white

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
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    color: #FFFFFF;
    text-align: center;
    align-items: center;
    height: 100%;
  }
`;

export const CurrenciesList = styled.ul`
  list-style: none;
  box-shadow: 0 0 20px rgba(168, 172, 176, 0.19);
  padding: 20px;
  position: absolute;
  top: 30px;
  font-size: 18px;
  z-index: 2999;
  background-color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  li {
    cursor: pointer;
  }
`;