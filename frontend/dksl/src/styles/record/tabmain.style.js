import styled from 'styled-components';

export const TabMainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const LeftLayout = styled.div`
  width: 30%;
  height: 100%;
`;

export const RightLayout = styled.div`
  width: 70%;
  height: 100%;

  & .rank-type {
    margin-top: 2rem;
    display: flex;
    align-items: center;
  }

  & input {
    margin-left: 1rem;
    appearance: none;
    border: max(2px, .1em) solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    transition: 0.25s;
  }

  & input:checked {
    border: max(2px, .3em) solid #0fa0b8;
  }

  & .select-group {
    margin-left: 1.5rem;
    font-size: small;
  }
`;
