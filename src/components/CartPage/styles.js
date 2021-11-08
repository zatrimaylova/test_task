import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 100px;
`;

export const CartTitle = styled.h1`
  margin: 80px 0 60px;
`;

export const CartEl = styled.li`
  width: 100%;
  min-height: 225px;
  display: flex;
  justify-content: space-between;
  border-top: solid 1px #E5E5E5;
  padding: 20px 0;
`;

export const LiContent = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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

export const ButtonsHolder = styled.div`
  display: flex;
  gap: 10px;
`;

export const AttributesList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
`;

export const ChoosedAttribute = styled.li`
  margin-top: 25px;
`;

export const ChangingInfo = styled.div`
  display: flex;
`;

export const CountCont = styled.div`
  height: 185px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;

  div {
    width: 45px;
    height: 45px;
    cursor: pointer;
  }
`;

export const CountSpan = styled.span`
  width: 100%;
  text-align: center;
  font-size: 24px;
  margin: 30px 0;
  height: 46px;
`;

export const GalleryItem = styled.div`
  height: 185px;
  width: 141px;
  background: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

export const DecreaseImg = styled.img`
  opacity: ${props => props.color > 1 ? 1 : 0.33};
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