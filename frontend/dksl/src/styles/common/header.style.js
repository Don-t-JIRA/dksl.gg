import styled from "styled-components";

export const HeaderLayout = styled.div`
  width: 100vw;
  height: 12.5vh;
  position: fixed;
  background-color: #FFFFFF;
  filter: drop-shadow(0 .5mm .75rem gray);
  display: flex;
  z-index: 99;

  & .logoBox {
    height: 75%;
    margin: auto;
    margin-left: 2rem;
    &:hover {
      filter: drop-shadow(0 0 .1rem black);
    }
    flex-basis: 20%;
    text-align: center;
  }

  & .logoBox img {
    height: 100%;
  }

`;

export const MenuContainer = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-around;
  flex-basis: 30%;
  align-items: center;
  text-align: center;

  & a {
    font-size: large;
    font-weight: 600;
  }
`

export const LogInConatiner = styled.div`
  flex-basis: 60%;
  margin: auto;
  margin-right: 5rem;
  text-align: end;
`

export const LogoutContainer = styled.div`

`