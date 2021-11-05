import styled from 'styled-components';

export const CartContainer = styled.div`
  background: rgba(57, 55, 72, 0.22);
  z-index: 1000;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 80px;
  left: 0;
  transition: all 0.8s ease 0s;
  overflow: hidden;
`;

export const CartBody = styled.div`
  width: 325px;
  max-height: 540px;
  padding: 8px 10px 20px;
  position: absolute;
  top: 0;
  right: 100px;
  background-color: #FFFFFF;
`;

export const CartTitle = styled.div`
  font-size: 16px;
  line-height: 26.5px;
  margin-bottom: 23px;

  span {
    font-weight: bold;
  }
`;

export const OverlayListEl = styled.ul`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;

  p {
    margin-top: 5px;
  }
`;

export const ProductInfoCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const OptionsList = styled.ul`
  list-style: none;
  margin-top: 15px;
  padding-left: 5px;

  li {
    margin-bottom: 5px;
  }
`;

export const ChangingInfo = styled.div`
  display: flex;
`;

export const CountCont = styled.div`
  height: 137px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;

  div {
    width: 24px;
    height: 24px;
  }

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const CountSpan = styled.span`
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin: 30px 0;
  height: 26px;
`;

export const DecreaseImg = styled.img`
  opacity: ${props => props.color ? 0.33 : 1};
`;

export const GalleryItem = styled.div`
  height: 137px;
  width: 105px;
  background: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

export const ButtonsContainer = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  
  button {
    cursor: pointer;
  }
`;

export const ViewBagButton = styled.button`
  width: 140px;
  height: 43px;
  border: solid 1px #1D1F22;
  color: #1D1F22;
  outline: none;
  background-color: #FFFFFF;
  margin-right: 12px;
`;

export const CheckOutButton = styled.button`
  width: 140px;
  height: 43px;
  border: 1px solid #5ECE7B;
  color: #FFFFFF;
  background-color: #5ECE7B;
  outline: none;
  font-size: 14px;
`;