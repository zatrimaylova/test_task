import styled from 'styled-components';

export const Nav = styled.nav`
  position: relative;
`;

export const NavList = styled.ul`
  width: 250px;
  height: 100%;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

export const NavItem = styled.li`
  height: 100%;
  font-size: 16px;
  padding: 0 16px 30px;
  text-align: center;
  vertical-align: center;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.color === '#5ECE7B' ? props.color : 'transparent'};
  color: ${props => props.color};
  font-style: normal;
  font-weight: ${props => props.color === '#5ECE7B' ? 600 : 'normal'};;
  font-size: 16px;
  line-height: 120%;
  text-transform: uppercase;
  transition: border 0.5s ease-in;

  &:hover {
    border-bottom: 2px solid #5ECE7B;
  }
`;