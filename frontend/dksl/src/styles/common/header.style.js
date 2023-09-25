import styled from 'styled-components';

export const HeaderLayout = styled.div`
  width: 100vw;
  height: 12.5vh;
  min-height: 105.5px;
  position: fixed;
  background-color: #ffffff;
  filter: drop-shadow(0 0.5mm 0.75rem gray);
  display: flex;
  z-index: 99;

  & .logoBox {
    height: 75%;
    margin: auto;
    margin-left: 2rem;
    transition: all 0.5s;
    flex-basis: 20%;
    text-align: end;

    &:hover {
      filter: drop-shadow(0 0 0.2rem var(--maincolor-depth1));
    }
  }

  & .logoBox img {
    height: 100%;
    margin-right: 1rem;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  width: 30%;
  height: inherit;
  justify-content: space-around;
  flex-basis: 50%;
  align-items: center;
  text-align: center;

  & a {
    font-size: large;
    font-weight: 600;
  }

  & .search-input {
    width: 70%;
    margin: 0.75rem 0;
    margin-top: 0;
    position: relative;
    display: flex;
    align-self: center;
  }

  & .search-input input {
    width: 100%;
    height: 3rem;
    padding: 0 2.5%;
    margin: 1.5rem 0.5%;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    font-size: medium;
    border: none;
    border-bottom: 1px solid black;
  }

  & .search-input img {
    position: absolute;
    z-index: 10;
    width: 8%;
    top: 5px;
    right: 15px;
    margin-top: 1rem;
    margin-bottom: auto;
    align-items: center;
    transition: all 0.5s;

    &:hover {
      width: 9%;
      top: 4px;
      right: 12.5px;
    }
  }
`;

export const LogInConatiner = styled.div`
  flex-basis: 60%;
  margin: auto;
  margin-right: 5rem;
  text-align: end;
`;

export const LogoutContainer = styled.div`
  flex-basis: 60%;
  height: inherit;
  margin: auto;
  margin-right: 5rem;
  text-align: start;

  & .profile {
    display: flex;
    height: inherit;
    justify-content: end;
    align-items: center;

    & .image {
      height: 50%;
      margin-right: 1rem;
    }

    & .name {
      font-size: large;
      font-weight: bolder;
      color: var(--text-gray);
    }

    & button {
      margin-left: 1rem;
    }
  }
`;
