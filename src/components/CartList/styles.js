import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const CartList = styled.ul`
  height: 70%;
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
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  border-top: solid 1px #E5E5E5;
  padding: 20px;
  background-color: ${props => props.bgColor};
`;

export const CountCont = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;

  div {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  img {
    height: 100%;
  }
`;

export const CountSpan = styled.span`
  width: 100%;
  text-align: center;
  font-size: 15px;
  margin: 20px 0;
  height: 46px;
`;

export const ChangingInfo = styled.div`
  display: flex;
`;

export const GalleryItem = styled.div`
  height: 100px;
  width: 141px;
  background: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

export const ChevronLeft = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 87px;
  cursor: pointer;
`;

export const ChevronRight = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 87px;
  right: 0;
  cursor: pointer;
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
  display: flex;
  justify-content: space-around;

  
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