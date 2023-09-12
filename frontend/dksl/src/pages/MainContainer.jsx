import { useState } from 'react';
import HeaderComponent from "../components/common/HeaderComponent";
import RankingComponent from "../components/main/RankingComponent";
import SearchComponent from "../components/main/SearchComponent";

const MainContainer = () => {
  const [hofTab, setHofTab] = useState(0);
  
  return (
    <>
      <HeaderComponent />
      <SearchComponent />
      <RankingComponent hofTab={hofTab} setHofTab={setHofTab} />
    </>
  );
};

export default MainContainer;
