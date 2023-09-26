// React
import { useState } from 'react';
// Component
import HeaderComponent from '../components/common/HeaderComponent';
import RankingComponent from '../components/main/RankingComponent';
import SearchComponent from '../components/main/SearchComponent';

const MainContainer = () => {
  const [hofTab, setHofTab] = useState(0);
  const [rankTab, setRankTab] = useState(0);
  /**
   * 플레이어의 순위 데이터 요청해야하고
   * 소속 순위 데이터 요청해야함.
   * 플레이어 순위 데이터는 세 가지 탭으로 나뉘기
   * 일간 주간 월간
   * 소속 순위는
   * 랭킹 최다플레이 내 순위
   */

  return (
    <>
      <HeaderComponent />
      <SearchComponent />
      <RankingComponent
        hofTab={hofTab}
        setHofTab={setHofTab}
        hofData={null}
        rankTab={rankTab}
        setRankTab={setRankTab}
        rankData={null}
      />
    </>
  );
};

export default MainContainer;
