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
    max-width: 560px;
    margin-top: 64px;
    margin-bottom: 24px;
    text-align: center;
    font-weight: normal;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;