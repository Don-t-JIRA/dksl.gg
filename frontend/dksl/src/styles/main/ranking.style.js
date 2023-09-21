import styled from 'styled-components';
import { Card } from '../globalStyles.style';

export const RankingLayout = styled.div`
  width: 100%;
  min-height: 50vh;
  height: 100%;
  display: flex;
  justify-content: center;

  & .container {
    ${Card}
    width: 25vw;
    height: 50%;
    margin: 2rem;
  }
`;

export const TabBox = styled.div`
  width: 80%;
  display: flex;
  margin: auto;
  justify-content: space-between;
`;

export const TabItem = styled.button`
  width: 100%;
  margin: 2px;
  font-size: small;
  padding: 3px;
  border-radius: 4px;
  font-weight: ${(props) => (props.istab == 1 ? `bold` : `500`)};
  color: #000;
  background-color: ${(props) => (props.istab == 1 ? `var(--maincolor-depth2)` : `inherit`)};
  transition: all 0.25s;
`;

export const ContentTable = styled.div`
  width: 100%;
  padding-top: 1rem;
`;

export const ContentItem = styled.div`
  display: flex;
  margin: 1rem;
  margin-top: 5px;
  margin-bottom: 5px;

  & .idx {
    flex-basis: 5%;
    margin-top: 0;
    margin-bottom: 0;
  }

  & .image {
    flex-basis: 10%;
    max-width: 1.5rem;
    max-height: 1.5rem;
    border-radius: 50%;
    margin-top: 0;
    margin-bottom: 0;
    margin: auto;
  }

  & .name {
    flex-basis: 60%;
    margin-left: 1rem;
    margin-top: 0;
    margin-bottom: 0;
  }

  & .tier {
    flex-basis: 25%;
    margin-top: 0;
    margin-bottom: 0;
  }
`;
