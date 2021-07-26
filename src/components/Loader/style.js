import styled from 'styled-components';

export const LoaderEl = styled.div`
  width: 150px;
  height: 150px;
  border: 10px solid rgba(57, 55, 72, 0.1);  
  border-top: 10px solid #5ECE7B;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  margin: 150px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;