import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 150px;
  max-width: 1240px;
  margin: 0 auto;
`;

export const CartTitle = styled.h1`
  margin-bottom: 60px;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
`;

export const CartEl = styled.li`
  width: 1094px;
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

  span {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 18px;
  }
`;

export const CartTitleCont = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  h3 {
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 27px;
  }

  button {
    border: none;
    background-color: transparent;
    padding: 5px 30px 10px;
    cursor: pointer;
    font-family: 'Source Sans Pro', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
  }
`;

export const ButtonsHolder = styled.div`
  display: flex;
  gap: 10px;
`;

export const AttributesList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ChoosedAttribute = styled.li`
  font-family: 'Source Sans Pro', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
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
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 160%;
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