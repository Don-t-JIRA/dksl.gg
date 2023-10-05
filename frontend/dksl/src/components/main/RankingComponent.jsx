// Styled
import { useCallback } from 'react';
import * as S from '../../styles/main/ranking.style';
// Component
import LoadingComponent from '../common/LoadingComponent';

/**
 * @param props // 탭 상태 저장할, 변경할 hotTab, rankTab 받아올 프롭스 객체
 */
const RankingComponent = ({
  hofTab,
  setHofTab,
  hofData,
  rankTab,
  setRankTab,
  rankData,
}) => {

  const getByteToImage = useCallback((imgSrc) => {
    const binaryString = atob(imgSrc);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const img = new Blob([bytes], {
      type: 'image/jpg',
    });

    return URL.createObjectURL(img);
  }, []);

  return (
    <S.RankingLayout>
      <div className="container">
        <p className="title">&#127942; 명예의 전당</p>
        <S.TabBox>
          <S.TabItem $istab={hofTab == 0 ? 1 : 0} onClick={() => setHofTab(0)}>
            일간
          </S.TabItem>
          <S.TabItem $istab={hofTab == 1 ? 1 : 0} onClick={() => setHofTab(1)}>
            주간
          </S.TabItem>
          <S.TabItem $istab={hofTab == 2 ? 1 : 0} onClick={() => setHofTab(2)}>
            월간
          </S.TabItem>
        </S.TabBox>
        {hofData ? (
          <S.ContentTable>
            <S.ContentItem>
              <p className="idx">1</p>
              <img className="image" src="image/dkslhead.svg" />
              <p className="name">닉네임</p>
              <p className="tier">Challenger</p>
            </S.ContentItem>
            <S.ContentItem>
              <p className="idx">1</p>
              <img className="image" src="image/dkslhead.svg" />
              <p className="name">닉네임</p>
              <p className="tier">Challenger</p>
            </S.ContentItem>
          </S.ContentTable>
        ) : (
          <S.ContentTable>
            <LoadingComponent />
          </S.ContentTable>
        )}
      </div>
      <div className="container">
        <p className="title">&#127969; 소속 별 순위</p>
        <S.TabBox>
          <S.TabItem
            $istab={rankTab == 0 ? 1 : 0}
            onClick={() => setRankTab(0)}
          >
            평균 티어
          </S.TabItem>
          <S.TabItem
            $istab={rankTab == 1 ? 1 : 0}
            onClick={() => setRankTab(1)}
          >
            멤버 수
          </S.TabItem>
          <S.TabItem
            $istab={rankTab == 2 ? 1 : 0}
            onClick={() => setRankTab(2)}
          >
            최근 가입
          </S.TabItem>
        </S.TabBox>
            <S.ContentTable>
          <S.ContentItem>
          <p className="idx"></p>
          <p className="image"></p>
          <p className="name"><b>소속 이름</b></p>
          <p className="tier"><b>평균 티어</b></p>
        </S.ContentItem>
        {rankData && rankTab == 0 ? 
          rankData.tierTeamList.map((e, i) => (
              <S.ContentItem>
                <p className="idx">{i + 1}</p>
                <img className="image" src={getByteToImage(e.img)} />
                <p className="name">{e.name}</p>
                <p className="tier">{e.avgTier.name}</p>
              </S.ContentItem>
          )
        ) : rankData && rankTab == 1 ? 
        rankData.memberCountTeamList.map((e, i) => (
            <S.ContentItem>
              <p className="idx">{i + 1}</p>
              <img className="image" src={getByteToImage(e.img)} />
              <p className="name">{e.name}</p>
              <p className="tier">{e.avgTier.name}</p>
            </S.ContentItem>
        )
      ) : rankData && rankTab == 2 ? 
      rankData.recentTeamList.map((e, i) => (
          <S.ContentItem>
            <p className="idx">{i + 1}</p>
            <img className="image" src={getByteToImage(e.img)} />
            <p className="name">{e.name}</p>
            <p className="tier">{e.avgTier.name}</p>
          </S.ContentItem>
      )
    ) : (
            <LoadingComponent />
        )}
        </S.ContentTable>
      </div>
    </S.RankingLayout>
  );
};

export default RankingComponent;
