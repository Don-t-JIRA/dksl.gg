import styled from "styled-components";

export const HeaderLayout = styled.div`
  width: 100%;
  height: 15vh;
  position: fixed;
  background-color: #FFFFFF;
  filter: drop-shadow(0 .5mm .75rem gray);
  display: flex;
  z-index: 99;
`;

export const LogoBox = styled.div`
  height: 75%;
  margin: auto;
  margin-right: 2rem;
  &:hover {
    filter: drop-shadow(0 0 .5rem black);
  }
  flex-basis: 20%;
  text-align: end;
`

export const Logo = styled.img`
  height: 100%;
`

export const MenuContainer = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
  flex-basis: 30%;
  align-items: center;
  text-align: center;

`

export const MenuItem = styled.a`
  font-size: x-large;
  font-weight: 600;
`

export const LogInConatiner = styled.div`
  flex-basis: 60%;
  margin: auto;
  margin-right: 5rem;
  text-align: end;
`

export const LoginBtn = styled.button`

`

export const LogoutContainer = styled.div`

`