import styled from 'styled-components';

export const SearchLayout = styled.div`
  width: 100%;
  height: 80vh;
  margin-top: 12.5vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('image/bg/main_bg_${(props) => props.bgnum}.jpg');
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
    font-weight: bold;
    color: #ffffff;
    display: grid;
    place-items: center;

    & .typing {
      width: 22ch;
      animation:
        typing 2s steps(22),
        blink 0.5s step-end infinite alternate;
      white-space: nowrap;
      overflow: hidden;
      border-right: 3px solid;
      font-size: 2em;
    }
  }

  & .container .box {
    width: 30%;
    margin: auto;
    position: relative;
  }

  & .container .box input {
    width: 90%;
    height: 2.25rem;
    padding: 5px 5%;
    border-radius: 5px;
    filter: drop-shadow(2px 4px 4px hsl(0deg 0% 0% / 0.38));
  }

  & .container .box input:focus {
    transition: all 0.5s;
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
  background-color: var(--maincolor-depth2);
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
`;
