import styled from "styled-components";

export const RankingLayout = styled.div`
  width: 100%;
  min-height: 50vh;
  height: 100%;
  display: flex;
  justify-content: center;
`

export const HOFContainer = styled.div`
  width: 25vw;
  height: 50%;
  background-color: white;
  margin: 2rem;
  border: .5px solid gray;
`

export const RankContainer = styled.div`
  width: 25vw;
  height: 50%;
  background-color: white;
  margin: 2rem;
  border: .5px solid gray;
`

export const SectionTitle = styled.p`
  margin-top: 0;
  padding: 1rem 0;
  padding-left: 1rem;
  border-bottom: .5px solid gray;
  font-size: medium;
  font-weight: bolder;
`

export const TabBox = styled.div`
  width: 80%;
  display: flex;
  margin: auto;
  justify-content: space-between;
`

export const TabItem = styled.button`
  width: 100%;
  margin: 2px;
  font-size: small;
  padding: 3px;
  border-radius: 4px;
  font-weight: ${(props) => props.isActive ? (`bold`) : (`500`)};
  /* font-weight: 400; */
  color: #000;
  background-color: ${(props) => props.isActive ? (`#D7F0F4`) : (`#F5F5F5`)};
  transition: all .25s;
`