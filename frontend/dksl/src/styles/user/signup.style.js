import styled from 'styled-components';

export const SignupLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-image: 
    linear-gradient(rgba(0, 0, 0, .5), 
    rgba(0, 0, 0, .5)), 
    url('../../src/assets/bg/signup_bg_${(props) => props.bgnum}.jpg');
  background-size: 100%;
  justify-content: center;
  align-items: center;
  display: flex;

  & hr {
    width: .1rem;
    background-color: gray;
    border-radius: 1rem;
  }
`

export const SignupContainer = styled.div`
  min-width: 40vw;
  max-width: fit-content;
  min-height: 50vh;
  padding: 1rem;
  background-color: white;
  border-radius: .5rem;
  filter: drop-shadow(4px 8px 8px hsl(0deg 0% 0% / 0.5));
  text-align: center;
  display: flex;

  & .box {
    flex-basis: 50%;
    align-self: center;
    margin-bottom: 3rem;
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

export const SignupInputBox = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  align-items: center;
  margin: 4rem 6rem;
  margin-left: .5rem;

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

export const SignupBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  ;
`