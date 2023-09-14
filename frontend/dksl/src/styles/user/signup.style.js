import styled from 'styled-components';

export const SignupLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-image: 
    linear-gradient(rgba(0, 0, 0, .5), 
    rgba(0, 0, 0, .5)), 
    url('../../src/assets/bg/signup_bg_${Math.floor(Math.random() * 5)+1}.jpg');
  background-size: 100%;
  justify-content: center;
  align-items: center;
  display: flex;

  & hr {
    width: .2rem;
    background-color: gray;
    border-radius: 1rem;
  }
`

export const SignupContainer = styled.div`
  min-width: 50vw;
  max-width: 80vw;
  min-height: 50vh;
  padding: 1rem;
  background-color: white;
  border-radius: .5rem;
  filter: drop-shadow(4px 8px 8px hsl(0deg 0% 0% / 0.5));
  text-align: center;
  display: flex;

  & .box {
    flex-basis: 30%;
    align-self: center;
    margin-bottom: 3rem;
  }
  
  & .logo {
    width: 2.5rem;
    height: 3rem;
    margin-top: 2rem;
  }

  & hr {
    margin: 1rem;
  }
`

export const SignupInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-basis: 60%;
  align-items: center;
  margin: 2rem;

  & input {
    width: 70%;
    height: 2rem;
    margin: .5rem;
    padding: .25rem;
    padding-left: .5rem;
    background-color: #F2F2F2;
    border: none;
  }
`

export const SignupBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
  margin-bottom: 2rem;
`