import styled from 'styled-components';
import { Card, Tag } from '../globalStyles.style';

export const TabAnalyzeLayout = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;

  & .rank-type {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
  }

  & input {
    margin-left: 1rem;
    appearance: none;
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
  }

  & input:checked {
    border: max(2px, 0.3em) solid var(--maincolor-depth1);
  }

  & .select-group {
    margin-left: 1.5rem;
    font-size: small;
  }
`;

export const LeftLayout = styled.div`
  width: 30%;
  height: 100%;
`;

export const RightLayout = styled.div`
  width: 70%;
  height: 100%;
`;

export const AnalyzeCard = styled.div`
  ${Card}
  width: 95%;
  height: fit-content;
  padding-bottom: 1rem;
  text-align: center;

  & .title {
    text-align: start;
  }

  & .analyze-box {
    & img {
      width: 90%;
    }

    & .subtitle {
      display: flex;
      justify-content: center;
      margin-top: .1rem;

      & p {
        margin: 0 .2rem;
        font-size: large;
        font-weight: bold;
      }

      & .lbti {
        color: var(--maincolor-depth1)
      }
    }

    & .tag-box {
      display: flex;
      justify-content: space-around;
      margin: 0 .5rem;
      margin-bottom: 1rem;
    }
  }
`;

export const TagItem = styled.div`
  ${Tag};
  background-color: ${(props) => props.bg};
  
`

export const GraphCard = styled.div`
  ${Card}
  width: 95%;
  height: 50vh;
  margin-top: 1rem;

  & .title {
    margin-bottom: 0;
  }

  & .graph-box {
    width: 100%;
    height: 100%;
  }
  
`;

export const RecentCard = styled.div`
  ${Card}
  width: 95%;
  height: fit-content;
  color: var(--text-gray);
  text-align: center;
  font-size: small;

  & .sub-title {
    font-size: 12pt;
    font-weight: 600;
  }

  & .title {
    color: black;
    margin-bottom: 0;
    text-align: start;
  }

  & .card-body {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1rem;
    padding-top: 0;
  }

  & .card-body .circle-graph {
    flex-basis: 33%;

    & .sub-title {
      margin-left: 1rem;
      margin-bottom: 0;
    }

    & p {
      text-align: start;
    }

    & .percentage-pie {
      width: 100%;
      height: 10vw;
      display: flex;
      align-items: center;

      & div {
        flex-basis: 50%;
      }

      & p {
        margin-top: 0;
        margin-bottom: 0;
        text-align: center;
        font-size: medium;
      }
      & .kda {
        display: inline-flex;
      }
      & .death {
        color: red;
      }

      & .middle {
        font-size: large;
        font-weight: 600;
      }
    }
  }

  & .card-body .recent-played {
    flex-basis: 33%;

    & .most-champ {
      width: 80%;
      display: flex;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 0.5rem;
      align-items: center;

      & .image {
        max-width: 2rem;
        max-height: 2rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }

      & p {
        margin: 0;
        margin-left: 0.5rem;
      }
    }
  }

  & .card-body .favo-position {
    flex-basis: 30%;

    & .position-area {
      width: 90%;
      height: 70%;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: space-around;
      text-align: center;

      & .line {
        width: 15%;
      }
    }
  }
`;
