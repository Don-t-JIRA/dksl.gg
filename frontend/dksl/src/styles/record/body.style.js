import styled from 'styled-components';

export const RecordLayout = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #f5f5f5;
`;

export const TabLayout = styled.div`
  width: 100%;
  height: 100%;
  /* display: flex; */
  margin-left: auto;
  margin-right: auto;
  
  & .tab {
    width: 100%;
    background-color: white;
  }

  & .tab .tab-title {
    width: 40%;
    height: 8vh;
    display: flex;
    margin: .2rem;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
  }

  & .tab-body {
    width: 75%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
  }
  `;

export const TabItem = styled.button`
  width: 100%;
  height: 6vh;
  margin: .25rem;
  font-size: medium;
  padding: 3px;
  border-radius: 4px;
  font-weight: ${(props) => (props.istab == 1 ? `bold` : `500`)};
  color: #000;
  background-color: ${(props) => (props.istab == 1 ? `#D7F0F4` : `#fff`)};
  transition: all 0.25s;
`;
