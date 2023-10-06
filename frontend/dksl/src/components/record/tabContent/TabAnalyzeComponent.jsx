// React
import { useEffect, useState } from 'react';
// Styled
import * as S from '@/styles/record/tabanalyze.style';
// Chart
import { ResponsiveBar } from '@nivo/bar';
// Component
import LoadingComponent from '../../common/LoadingComponent';
// Jotai
import { useAnalyze } from '../../../jotai/analyze';
// Data
import { star } from '../../../star';
import { useGroup } from '../../../jotai/group';

const openLink = (url) => {
  window.open(url, '_blank');
};

const TabAnalyzeComponent = ({ fetchData }) => {
  const analyze = useAnalyze();
  // LBTI Data get
  const group = useGroup();
  const [champ, setChamp] = useState(null);
  const [chart, setChart] = useState(null);
  const [lbti, setLbti] = useState(
    
      {
          "id": 16,
          "name": "원딜보다 딜 더 넣으려 하는 파이크",
          "description": "허깅이나 한타 같은 안정적인 플레이를 좋아하는 당신!\n 챔프 폭이 넓고, 상향된 챔피언은 그때 그때 즐겨야 하는 성격입니다.\n\n후반 한타에서는 더욱 집중하고,\n결국 본인의 캐리로 게임을 승리로 이끄는 성향이군요!",
          "championName": "Pyke",
          "firstTendency": {
              "id": "stable",
              "name": "#안정적인",
              "initial": "S"
          },
          "secondTendency": {
              "id": "mz",
              "name": "#MZ한",
              "initial": "M"
          },
          "thirdTendency": {
              "id": "lately",
              "name": "#후반형",
              "initial": "L"
          },
          "fourthTendency": {
              "id": "killer",
              "name": "#장의사",
              "initial": "K"
          },
          "lbtiStr": "SMLK"
      }
  
  );
  useEffect(() => {
    console.log('analyze: ', analyze);
    if (analyze && analyze != 'NoData') {
      const data = analyze.cluster;
      console.log(typeof parseInt(data.cs));
      setChart([
        {
          id: 'CS',
          value: parseInt(data.cs),
        },
        {
          id: '딜량',
          value: parseInt(data.dealt),
        },
        {
          id: '분당 딜량',
          value: parseInt(data.dpm),
        },
        {
          id: 'KDA',
          value: parseFloat(data.kda),
        },
        {
          id: '레벨',
          value: parseInt(data.level),
        },
        {
          id: '받은 피해량',
          value: parseInt(data.receive),
        },
        {
          id: '솔로킬',
          value: parseInt(data.soloKill),
        },
        {
          id: '시야점수',
          value: parseInt(data.vision),
        },
        {
          id: '핑크 와드',
          value: parseInt(data.ward),
        },
      ]);
    }
  }, [analyze]);
  useEffect(() => {
    const arr = analyze.chapmions;

    const fetchChampionData = async () => {
      const newArr = [];

      for (const championName of arr) {
        const championData = await fetchData(championName);
        if (championData) {
          newArr.push(championData);
        }
      }

      setChamp(newArr);
    };

    if (champ === null) {
      fetchChampionData();
    }
  }, [analyze, champ, fetchData]);

  useEffect(() => {
    if (group && group.lbti) {
      const newObj = {
        ...group.lbti,
        lbtiStr: group.lbti.firstTendency.initial +
        group.lbti.secondTendency.initial +
        group.lbti.thirdTendency.initial +
        group.lbti.fourthTendency.initial
      }
      setLbti((prevLbti) => {
        if (prevLbti == newObj) {
          return prevLbti;
        }
        return newObj;
      });
    }
  }, [group]);

  if (analyze == null) return <LoadingComponent />;

  return analyze == 'NoData' ? (
    <S.TabAnalyzeLayout>
      <S.CenterLayout>
        <S.NoDataLayout>
          <p className="info">분석 데이터가 존재하지 않습니다.</p>
        </S.NoDataLayout>
      </S.CenterLayout>
    </S.TabAnalyzeLayout>
  ) : (
    <S.TabAnalyzeLayout>
      <S.CenterLayout>
        <S.AnalyzeCard>
          <p className="title">&#128195; 롤BTI 분석</p>
          {lbti ? (
            <div className="analyze-box">
              <img src={`https://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${lbti.championName}.png`} />
              <div className="subtitle">
                <p>{lbti.name}</p>
                <p className="lbti">💡 {lbti.lbtiStr}</p>
              </div>
              <div className="tag-box">
                <S.TagItem $bg="red">
                  <div className="text">
                    {lbti.firstTendency.name}
                  </div>
                </S.TagItem>
                <S.TagItem $bg="green">
                  <div className="text">
                    {lbti.secondTendency.name}
                  </div>
                </S.TagItem>
                <S.TagItem $bg="violet">
                  <div className="text">
                    {lbti.thirdTendency.name}
                  </div>
                </S.TagItem>
                <S.TagItem $bg="var(--maincolor-depth1)">
                  <div className="text">
                    {lbti.fourthTendency.name}
                  </div>
                </S.TagItem>
              </div>
            </div>
          ) : (
            <LoadingComponent />
          )}
        </S.AnalyzeCard>
        <S.GraphCard>
          <p className="title">&#128195; 소환사 분석 그래프</p>
          <div className="graph-box">
            {chart ? (
              <div className="graph">
                <ResponsiveBar
                  data={chart}
                  keys={['value']}
                  indexBy="id"
                  margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
                  padding={0.3}
                  layout="vertical"
                  colors={{ scheme: 'nivo' }}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 0,
                    tickRotation: 0,
                  }}
                  enableGridX={false}
                  enableGridY={true}
                  enableLabel={false}
                />
              </div>
            ) : (
              <LoadingComponent />
            )}
            <div className="desc">
              <p className="cluster-name">{analyze.cluster.name}</p>
              <p className="minion">
                평균 <b>미니언</b> 처치 수: <b>{analyze.cluster.minion_avg}</b>
              </p>
            </div>
          </div>
        </S.GraphCard>
        <S.ChampionCard>
          <p className="title">&#128077; 이 챔피언을 추천해요!</p>
          <div className="champion-box">
            {champ ? (
              champ.map((e, i) => (
                <div className="container" key={`champion_card_${i}`}>
                  <div
                    className="card front"
                    style={{
                      backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${e.en_name}_0.jpg)`,
                    }}
                  ></div>
                  <div className="card back">
                    <div className="name">{e.name}</div>
                    <p className="tags">
                      {e.tags.map((v, j) => {
                        if (j == e.tags.length - 1) return v;
                        else return v + ', ';
                      })}
                    </p>
                    <p className="tips">
                      {e.tips[Math.floor(Math.random() * e.tips.length)]}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <LoadingComponent />
            )}
          </div>
        </S.ChampionCard>
        <S.FamousCard>
          <p className="title">&#128071; 이 사람은 어때요?</p>

          {analyze ? (
            <div className="content-box">
              <div className="img">
                <img
                  src={`/image/star/${star[analyze.celeb.name].img}`}
                  alt="star_img"
                  onClick={() => openLink(analyze.celeb.url)}
                />
              </div>
              <div className="desc">
                <p className="name">이름: {analyze.celeb.name}</p>
                <p className="line">라인: {analyze.celeb.line}</p>
                <p className="description">{analyze.celeb.desc}</p>
              </div>
            </div>
          ) : (
            <LoadingComponent />
          )}
        </S.FamousCard>
      </S.CenterLayout>
    </S.TabAnalyzeLayout>
  );
};

export default TabAnalyzeComponent;
