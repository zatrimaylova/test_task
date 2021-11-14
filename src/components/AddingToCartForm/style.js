import styled from 'styled-components';

export const Container = styled.div`
  width: 300px;
`;

export const HeaderForm = styled.div`
  margin-bottom: 30px;
`;

export const ProductName = styled.h1`
  margin-bottom: 10px;
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
  margin-right: 5px 12px 0 0;
  
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
  font-size: 16px;
  margin: 0 17px;
  min-width: 20px;
  padding-top: 4px;
`;

export const ValidationTitle = styled.p`
  background-color: pink;
  padding: 10px;
  text-align: center;
  margin-bottom: 10px;
`;

export const OptionTitle = styled.h3`
  margin-bottom: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
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

  :hover {
    background-color: black;
    color: white;
  }
`;

export const OneSize = styled.li`
  height: 45px;
  border: black solid 1px;
  font-family: 'Source Sans Pro', sans-serif;
  text-align: center;
  line-height: 42px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
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

  h2 {
    margin-bottom: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 18px;
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
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
`;