import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  background-color: white;
  padding: 20px 20px 80px;
  margin-top: 20px;
  position: relative;

  h1, h3 {
    text-align: center;
  }
`;

export const CartList = styled.ul`
  max-height: 430px;
  overflow-y: scroll;
`;

export const CartTitleCont = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    background-color: transparent;
    padding: 5px 30px 10px;
    cursor: pointer;
  }
`;

export const CartTitle = styled.h1`
  margin: 10px 0;
`;

export const CartEl = styled.li`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  border-top: solid 1px #E5E5E5;
  padding: 10px;
  background-color: ${props => props.bgColor};
`;

export const CountCont = styled.div`
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 12px;

  div {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  img {
    height: 100%;
    width: 100%;
  }
`;

export const DecreaseImg = styled.img`
  opacity: ${props => props.visibility > 1 ? 1 : 0.33};
`;

export const CountSpan = styled.span`
  width: 100%;
  text-align: center;
  font-size: 15px;
`;

export const ChangingInfo = styled.div`
  display: flex;
`;

export const GalleryItem = styled.div`
  height: 100%;
  width: 141px;
  background: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

export const AttributesList = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const ChossedAttribute = styled.div`
  //margin-top: 25px;
`;

export const ButtonsHolder = styled.div`
  display: flex;
  gap: 10px;
`;

export const LiContent = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: inline-flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0px;
  left: 20px;
  width: 560px;

  
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const ButtonConfirm = styled.button`
  color: #5ECE7B;
`;