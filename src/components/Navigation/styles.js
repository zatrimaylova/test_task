import styled from 'styled-components';

export const Nav = styled.nav`
  position: relative;
`;

export const NavList = styled.ul`
  width: 202px;
  height: 100%;
  list-style: none;
  display: flex;
`;

export const NavItem = styled.li`
  height: 100%;
  font-size: 16px;
  padding: 0 16px 30px;
  text-align: center;
  vertical-align: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid #5ECE7B;
  }
`;