import styled from 'styled-components';

export const CreateLayout = styled.div`
  width: 100%;
  height: 50vh;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .input-area-1 {
    display: flex;
    flex-basis: 35%;
    justify-content: center;

    & .input-image {
      flex-basis: 40%;
    }

    & .input-title {
      display: flex;
      flex-direction: column;
      flex-basis: 60%;
    }
  }

  & .input-area-2 {
    display: flex;
    flex-direction: column;
    flex-basis: 65%;
    justify-content: center;

    & input {
      width: 100%;
      resize: none;
      overflow-y: auto;
    }
  }
`;
