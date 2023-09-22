import styled from 'styled-components';
import { Card } from '../globalStyles.style';

export const GroupMainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const MainContainer = styled.div`
  width: 80%;
  max-width: 826px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 12.5vh;
  background-color: inherit;
  justify-content: center;

  & .create-btn-box {
    width: 90%;
    height: 32vh;
    max-height: 260px;
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
    padding: 5%;
    justify-content: center;
    border-radius: 2px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
      url('image/bg/group_create_banner.svg');
    filter: drop-shadow(1px 2px 2px hsl(0deg 0% 0% / 0.38));
    color: white;

    & .title {
      font-size: x-large;
      font-weight: bold;
    }

    & .create-btn {
      margin-left: 1rem;
      color: white;
      font-size: large;

      &:hover {
        color: var(--maincolor-depth2);
        text-decoration: underline;
      }
    }
  }

  & .current-group {
    ${Card}
    width: 100%;
    height: 30vh;
    min-height: 220px;
    box-sizing: border-box;
    margin-top: 1rem;

    & .title {
      margin-bottom: 0;
    }

    & .profile-box {
      width: 100%;
      height: 60%;
      position: relative;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }

  & .search-box {
    & .search-input {
      width: 100%;
      margin: auto;
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
      font-size: medium;
      border: none;
      transition: all 0.5s;
      filter: drop-shadow(1px 2px 2px hsl(0deg 0% 0% / 0.38));
    }

    & .search-input input:focus {
      border-radius: 5px;
      filter: drop-shadow(2px 4px 4px hsl(0deg 0% 0% / 0.25));
    }

    & .search-input img {
      position: absolute;
      z-index: 10;
      width: 4%;
      top: 5px;
      right: 15px;
      margin-top: 1.5rem;
      margin-bottom: auto;
      align-items: center;
    }

    & .result-box {
      ${Card}
      width: 100%;
      height: fit-content;
      box-sizing: border-box;
      margin-top: 0;
      margin-bottom: 3rem;

      & .result-body {
        margin: 0 3%;
        margin-bottom: 3%;

        & .result-row {
          height: fit-content;
          display: flex;
          margin: 0;

          & div {
            padding: 0 1rem;
          }

          & p {
            padding: 2px;
            margin: 0;
          }

          & .image-area {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-basis: 10%;

            & img {
              width: 70%;
            }
          }

          & .name-area {
            display: flex;
            flex-basis: 20%;
            align-items: center;
            font-size: large;
            font-weight: bold;
          }

          & .desc-area {
            display: flex;
            flex-basis: 70%;
            align-items: center;
          }
        }
      }
    }
  }
`;

export const GroupProfile = styled.div`
  width: 25%;
  height: fit-content;
  display: flex;

  & .image {
    display: flex;
    flex-basis: 40%;
    justify-content: center;

    & img {
      width: 90%;
    }
  }

  & .description {
    display: flex;
    flex-direction: column;
    flex-basis: 60%;
    justify-content: end;

    & p {
      margin: 2px;
    }

    & .name {
      font-size: x-large;
      font-weight: bolder;
    }

    & .personnel {
      font-size: smaller;
      color: var(--text-gray);
    }
  }
`;
