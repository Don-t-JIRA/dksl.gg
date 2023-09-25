import styled from 'styled-components';
import { Card } from '../globalStyles.style';

export const TabReviewLayout = styled.div`
  width: 100%;
  height: 100%;
`;

export const EmptyReviewLayout = styled.div`
  ${Card}
  width: 80%;
  height: fit-content;
  text-align: center;
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  & .icon {
    font-size: 4rem;
  }

  & .head {
    font-weight: bolder;
    font-size: x-large;
    margin-bottom: 0;
  }

  & .desc {
    margin: 0;
    color: var(--text-gray);
  }

  & .desc:last-of-type {
    margin-bottom: 2rem;
  }

  & .search-input {
    width: 70%;
    margin: 0.75rem auto;
    margin-top: 0;
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
    margin-top: 1rem;
    font-size: medium;
    border: 1px solid black;
    border-radius: 10px;
  }

  & .search-input img {
    position: absolute;
    z-index: 10;
    width: 5%;
    top: 10px;
    right: 15px;
    margin-top: 1rem;
    margin-bottom: auto;
    align-items: center;
    transition: all 0.5s;

    &:hover {
      width: 6%;
      top: 5px;
      right: 12.5px;
    }
  }
`;

export const TabReviewContainer = styled.div``;
