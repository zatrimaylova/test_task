import styled from 'styled-components';

export const CartManagingCont = styled.div`
  height: 77px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ContentHolder = styled.div`
  width: 30%;
  opacity: ${props => props.visibility > 0 ? '1' : '0.33'};

  h3 {
    text-align: center;
    margin-bottom: 10px;
  }

  div {
    display: flex;
    justify-content: space-around;
  }
`;

export const CartButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: ${props => props.visibility > 0 ? 'pointer' : 'auto'};
  width: 40%;
  padding: 15px 0;
`;