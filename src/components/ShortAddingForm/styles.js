import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  padding: 30px;
  background-color: white;
  position: relative;
`;

export const HeaderForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding-top: 15px;
  gap: 50px;
`;

export const ProductName = styled.h1`
  margin-bottom: 40px;
  display: inline-block;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
`;

export const Counter = styled.div`
  display: inline-block;
  width: 180px;
  display: flex;
  justify-content: left;
  height: 24px;
  margin-right: 12px;
  margin-top: 5px;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

export const DecreaseImg = styled.img`
  opacity: ${props => props.visibility > 1 ? 1 : 0.33};
`;

export const CountSpan = styled.span`
  height: 100%;
  text-align: center;
  font-size: 16px;
  margin: 0 17px;
  line-height: 25px;
`;

export const CloseImg = styled.img`
  width: 55px;
  height: 55px;
  cursor: pointer;
  padding: 15px;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
`;

export const ValidationTitle = styled.p`
  background-color: pink;
  padding: 10px;
  text-align: center;
  margin-bottom: 10px;
`;

export const OptionTitle = styled.h3`
  margin-bottom: 8px;
`;

export const VarietyList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-bottom: 30px;
`; 

export const OneSize = styled.li`
  height: 45px;
  border: black solid 1px;
  font-family: 'Source Sans Pro', sans-serif;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 42px;
  letter-spacing: 0.05em;
  padding: 0 15px;
  background-color: ${props => props.isActive ? 'black' : 'white'};
  color: ${props => props.isActive ? 'white' : 'black'};
`;

export const ListEl = styled.li`
  margin-right: 12px;
  height: 45px;
  width: 63px;
  border: black solid 1px;
  font-family: 'Source Sans Pro', sans-serif;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 42px;
  letter-spacing: 0.05em;
  background-color: ${props => props.isActive ? 'black' : props.color}; 
  color: ${props => props.isActive || props.color === '#000000' ? 'white' : 'black'};
  opacity: ${props => props.isActive ? 1 : 0.8};
  margin-bottom: 10px;
  cursor: pointer;

  :hover {
    background-color: black;
    color: white;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  gap: 10px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;

  h3 {
    padding-top: 4px;
  }
`;
export const Button = styled.button`
  height: 52px;
  width: 292px;
  display: block;
  border: none;
  padding: 16px 32px;
  background-color: #5ECE7B;
  color: #FFFFFF;
  margin: 0 auto;
  cursor: pointer;
  margin-top: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
`;