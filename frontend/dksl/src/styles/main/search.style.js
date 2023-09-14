import styled from "styled-components";

export const SearchLayout = styled.div`
  width: 100%;
  height: 80vh;
  margin-top: 12.5vh;
  background-image: 
    linear-gradient(rgba(0, 0, 0, .5), 
    rgba(0, 0, 0, .5)), 
    url('src/assets/bg/main_bg_${Math.floor(Math.random() * 10)+1}.jpg');
  background-size: 100% 90vh;
  display: flex;

  & .container {
    width: 100%;
    margin: auto;
    text-align: center;
  }

  & .container .title {
    margin: 2rem;
    margin-top: -2rem;
    font-size: 2.75rem;
    font-weight: bold;
    color: #ffffff;
  }

  & .container .box {
    width: 30%;
    margin: auto;
    position: relative;
  }

  & .container .box input {
    width: 90%;
    height: 2rem;
    padding: 5px 5%;
    border-radius: 3px;
    filter: drop-shadow(2px 4px 4px hsl(0deg 0% 0% / 0.38));
  }

  & .container .box input:focus {
    transition: all 0.5s;
    height: 2.1rem;
    filter: drop-shadow(4px 8px 8px hsl(0deg 0% 0% / 0.25));
  }

  & .container .box img {
    position: absolute;
    width: 2rem;
    top: 5px;
    right: 15px;
    margin-top: 1px;
    margin-bottom: 1px;
  }
`;

export const TaggingContainer = styled.div`
  width: 100%;
  height: 12.5vh;
  background-color: #D7F0F4;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  & .title {
    margin: 0 1rem;
    font-size: x-large;
  }

  & .btn {
    font-size: medium;
  }
`