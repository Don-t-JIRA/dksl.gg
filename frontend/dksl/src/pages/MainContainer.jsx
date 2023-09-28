// React
import { useState, useCallback } from 'react';
// Component
import HeaderComponent from '../components/common/HeaderComponent';
import RankingComponent from '../components/main/RankingComponent';
import SearchComponent from '../components/main/SearchComponent';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const onSearch = useCallback(
    async (name) => {
      // const data = await searchUser(name);
      // if (data.status == 200) {
      //   navigate(`/record?name=${name}`);
      // }
      // 검색 이벤트 시 유저 검색 후 데이터를 클라이언트에 저장해두고 넘어가는게 나을까
      // 내 생각엔 record 페이지로 소환사명만 파라미터로 가져간 후
      // 해당 소환사 정보 요청하는게 나을듯 한데
      console.log('검색 소환사 명 : ', name);
      navigate('/record');
    },
    [navigate]
  );

  return (
    <>
      <HeaderComponent onSearch={onSearch} />
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
