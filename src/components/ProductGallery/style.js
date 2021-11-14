import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  gap: 100px;
`;

export const ViewContainer = styled.div`
  display: flex;
  gap: 40px;
`;

export const ImageSlider = styled.div`
  width: 80px;
  height: 336px;
  overflow-y: hidden;
  position: relative;
`;

export const PreviewContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-right: 30px;
  width: 80px;
  position: absolute;
  top: 0;
  left: 0;
  transition: top 0.5s ease-in-out;
`;

export const Preview = styled.li`
  list-style: none;
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

  h1, h2, h3 {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 159.96%;
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 159.96%;
  }
`;