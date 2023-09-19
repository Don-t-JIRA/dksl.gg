import styled from 'styled-components';
import { Card } from '../globalStyles.style';

export const TabMainLayout = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 3rem;
  display: flex;
`;

export const LeftLayout = styled.div`
  width: 30%;
  height: 100%;
  padding-top: 4.3rem;
`;

export const RightLayout = styled.div`
  width: 70%;
  height: 100%;

  & .rank-type {
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
    transition: 0.25s;
  }

  & input:checked {
    border: max(2px, 0.3em) solid #0fa0b8;
  }

  & .select-group {
    margin-left: 1.5rem;
    font-size: small;
  }
`;

export const TierCard = styled.div`
  ${Card}
  width: 95%;
  height: fit-content;
  padding-bottom: 1rem;

  & .result-box {
    width: 90%;
    margin: 1rem;
  }

  & .result-box .rank-type {
    margin-left: 1.5rem;
    color: #858585;
    font-size: medium;
    font-weight: bold;
  }

  & .result-box .rank-detail {
    display: flex;
    align-items: center;
  }

  & .result-box .rank-detail .description {
    margin-left: 1rem;
  }

  & .result-box .rank-detail .description .tier {
    margin: 0;
    font-size: x-large;
    font-weight: bold;
  }

  & .result-box .rank-detail .description .point {
    margin: 0;
    font-size: medium;
    font-weight: 500;
  }
`;

export const DuoCard = styled.div`
  ${Card}
  width: 95%;
  height: fit-content;
  margin-top: 1rem;

  & .title {
    margin-bottom: 0;
  }

  & .duo-table {
    width: 100%;
    margin-bottom: 1rem;
    text-align: center;
    border-radius: 5px;
  }

  & .duo-table .table-header {
    background-color: #f7f7f9;
    font-size: small;
    font-weight: 500;
  }

  & .duo-table tbody .table-row {
    margin: 0.25rem;
    border-bottom: 2px solid #000;
  }

  & .duo-table .table-row .summoner {
    display: flex;
    margin-left: 0.5rem;
    text-align: start;
  }

  & .duo-table .table-row .summoner .image {
    max-width: 1.5rem;
    max-height: 1.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  & .duo-table .table-row .summoner p {
    margin: 0;
  }
`;

export const RecentCard = styled.div`
  ${Card}
  width: 95%;
  height: fit-content;
  color: #758592;
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
    }
  }
`;

export const LineGraph = styled.div`
  width: 70%;
  height: 75%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;

  & .gray-area {
    flex-basis: ${(props) => props.gray}%;
    background-color: #dbe0e4;
  }

  & .blue-area {
    flex-basis: ${(props) => props.blue}%;
    background-color: #5383e8;
  }
`;

export const RecordTable = styled.div``;
