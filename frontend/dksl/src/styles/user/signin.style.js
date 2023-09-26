import styled from 'styled-components';

export const SigninLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-image: 
    linear-gradient(rgba(0, 0, 0, .5), 
    rgba(0, 0, 0, .5)), 
    url('../image/bg/login_bg_${(props) => props.bgnum}.jpg');
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const SigninContainer = styled.div`
  min-width: 40vw;
  max-width: 80vw;
  min-height: 50vh;
  padding: 1rem;
  background-color: white;
  border-radius: .5rem;
  filter: drop-shadow(4px 8px 8px hsl(0deg 0% 0% / 0.5));
  text-align: center;

  & .box {
    flex-basis: 50%;
  }
  
  & .logo {
    width: 2.5rem;
    height: 3rem;
    margin-top: 2rem;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .logo {
      animation: logo-spin infinite 20s linear;
    }
  }

  & hr {
    margin: 1rem;
  }
`

export const SigninInputBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  & input {
    width: 100%;
    height: 2rem;
    margin: .5rem;
    padding: .25rem;
    padding-left: .5rem;
    background-color: #F2F2F2;
    border: none;
    border-radius: .25rem;
  }
`

export const SigninBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 1.25rem;
  margin-bottom: 2rem;

  & .link {
    height: fit-content;
    justify-content: center;
    align-self: center;
    font-weight: bold;
  }
  
  & button {
    margin-left: 1rem;
    margin-right: 0;
  }
`