import styled from 'styled-components';

export const Container = styled.div`
  width: 300px;
`;

export const HeaderForm = styled.div`
  margin-bottom: 10px;
`;

export const ProductName = styled.h1`
  margin-bottom: 10px;
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
  opacity: ${props => props.color ? 1 : 0.33};
`;

export const CountSpan = styled.span`
  height: 100%;
  text-align: center;
  font-size: 20px;
  margin: 0 17px;
  min-width: 20px;
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

export const ListEl = styled.li`
  margin-right: 12px;
  height: 45px;
  width: 63px;
  border: black solid 1px;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  letter-spacing: 0.05em;
  background-color: ${props => props.isActive ? 'black' : props.color}; 
  color: ${props => props.isActive || props.color === '#000000' ? 'white' : 'black'};
  margin-bottom: 10px;

  :hover {
    background-color: black;
    color: white;
  }
`;

export const OneSize = styled.li`
  height: 45px;
  border: black solid 1px;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  letter-spacing: 0.05em;
  padding: 0 15px;
  background-color: ${props => props.isActive ? 'black' : 'white'};
  color: ${props => props.isActive ? 'white' : 'black'};
`;

export const PriceContainer = styled.div`
  margin-bottom: 20px;

  h3 {
    margin-bottom: 10px;
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
`;