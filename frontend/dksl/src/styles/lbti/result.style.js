import styled from 'styled-components';
import { Card } from '../globalStyles.style';

export const LbtiResultLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;


export const ResultContainer = styled.div`
  width: 80%;
  max-width: 826px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  margin-top: 12.5vh;
  background-color: inherit;
  text-align: center;
  height: 87.5vh;

  & .result-box {
    ${Card}
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & img {
        height: 40vh;
        margin: 2vh 0;
    }

    & .result-title {
        font-size: xx-large;
        font-weight: bold;
        margin-bottom: 2vh;
    }
    & .result-content {
        margin-top: 5vh;
    }
    & .tag-box {
        margin-bottom: 5vh;
        & button {
            margin-right: 1rem;
        }
        & button:last-child {
            margin-right: 0;
        }
    }

    & .description-content {
        width: 50%;
        margin-bottom: 5vh;
        text-align: left;
    }
  }
`;