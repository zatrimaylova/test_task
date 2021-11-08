import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 30px 100px;
  display: flex;
`;

export const ViewContainer = styled.div`
  display: flex;
  margin-right: 100px;
`;

export const PreviewContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-right: 30px;
`;

export const Preview = styled.li`
  height: 80px;
  width: 80px;
  background: url(${props => props.url});
  background-size: cover;
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const View = styled.div`
  width: 610px;
  height: 511px;
  background: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TextContainer = styled.div`
  width: 290px;
  margin-top: 40px;

  p {
    font-size: 16px;
    line-height: 25.59px;
    text-align: left;
  }
`;