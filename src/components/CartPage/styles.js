import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 100px;
`;

export const CartList = styled.ul`

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

export const ChangingInfo = styled.div`
  display: flex;
`;

export const GalleryItem = styled.div`
  height: 185px;
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

export const AttributesList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
`;

export const ChossedAttribute = styled.li`
  margin-top: 25px;
`;

export const ButtonsHolder = styled.div`
  display: flex;
  gap: 10px;
`;

export const LiContent = styled.div`
  width: 80%;
`;

// export const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(57, 55, 72, 0.12);


// `;
// export const OverlayBody = styled.div`
//   width: 600px;
//     //margin: 50%;
//     //margin-left: 300px;
//     //position: fixed;
//     //top: 50%;
//   margin: 10px auto 0;
//   max-height: 90%;
// `;