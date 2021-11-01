import styled from 'styled-components';

export const OverlayContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000;
  background: rgba(57, 55, 72, 0.12);
`;

export const Overlay = styled.div`
  width: 500px;
  height: 300px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -150px;
  padding: 50px 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: bold;
  }

  h3 {
    text-align: center;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ButtonConfirm = styled.button`
  color: #5ECE7B;
`;