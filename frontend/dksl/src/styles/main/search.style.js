import styled from "styled-components";

export const SearchLayout = styled.div`
  width: 100%;
  height: 80vh;
  margin-top: 15vh;
  background-image: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('src/assets/bg/main_bg_3.jpg');
  background-size: 100% 90vh;
  display: flex;
`;

export const SearchContainer = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
`

export const SearchTitle = styled.div`
  font-size: 2.75rem;
  font-weight: bold;
  color: #ffffff;
`

export const SearchBox = styled.div`
  width: 30%;
  margin: auto;
  position: relative;
` 

export const SearchInput = styled.input`
  width: 90%;
  height: 2rem;
  padding: 5px 5%;
  filter: drop-shadow(2px 4px 4px hsl(0deg 0% 0% / 0.38));
  &:focus {
    transition: all 0.5s;
    height: 2.1rem;
  filter: drop-shadow(4px 8px 8px hsl(0deg 0% 0% / 0.25));
  }
`

export const SearchBtn = styled.img`
  position: absolute;
  width: 2rem;
  top: 5px;
  right: 15px;
  margin-top: 1px;
  margin-bottom: 1px;
`

export const TaggingContainer = styled.div`
  width: 100%;
  height: 12.5vh;
  background-color: #D7F0F4;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TaggingTitle = styled.p`
  margin: 0 1rem;
  font-size: x-large;
`

export const LbtiBtn = styled.button`
  font-size: medium;
`