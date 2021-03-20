import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ebebeb;

  img {
    width: 300px;
  }

  h1 {
    margin-top: 64px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;