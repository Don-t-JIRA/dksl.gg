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

const openLink = (url) => {
  window.open(url, '_blank');
};

const TabAnalyzeComponent = ({ fetchData }) => {
  const analyze = useAnalyze();
  const [champ, setChamp] = useState(null);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    console.log('analyze: ', analyze);
    if (analyze && analyze != 'NoData') {
      const data = analyze.cluster;
      console.log(typeof parseInt(data.cs));
      setChart([
        {
          id: 'cs',
          value: parseInt(data.cs),
        },
        {
          id: 'dealt',
          value: parseInt(data.dealt),
        },
        {
          id: 'dpm',
          value: parseInt(data.dpm),
        },
        {
          id: 'kda',
          value: parseFloat(data.kda),
        },
        {
          id: 'level',
          value: parseInt(data.level),
        },
        {
          id: 'no',
          value: parseInt(data.no),
        },
        {
          id: 'receive',
          value: parseInt(data.receive),
        },
        {
          id: 'soloKill',
          value: parseInt(data.soloKill),
        },
        {
          id: 'vision',
          value: parseInt(data.vision),
        },
        {
          id: 'ward',
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

  return (
    <S.TabAnalyzeLayout>
      <S.CenterLayout>
        <S.AnalyzeCard>
          <p className="title">&#128195; 롤BTI 분석</p>
          <div className="analyze-box">
            <img src="/image/lbti-img.svg" />
            <div className="subtitle">
              <p>킹받는 티모 원챔</p>
              <p className="lbti">CVSD</p>
            </div>
            <div className="tag-box">
              <S.TagItem $bg="red">
                <div className="text">
                  #<b>공격</b>적인
                </div>
              </S.TagItem>
              <S.TagItem $bg="green">
                <div className="text">
                  #<b>올드</b>한
                </div>
              </S.TagItem>
              <S.TagItem $bg="violet">
                <div className="text">
                  #많이<b>때린</b>
                </div>
              </S.TagItem>
              <S.TagItem $bg="var(--maincolor-depth1)">
                <div className="text">
                  #<b>철거</b>반장
                </div>
              </S.TagItem>
            </div>
          </div>
        </S.AnalyzeCard>
        <S.GraphCard>
          <p className="title">&#128195; 소환사 분석 그래프</p>
          <div className="graph-box">
            {chart ? (
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
                  legend: `${analyze.cluster.name}`,
                  legendPosition: 'middle',
                  legendOffset: 40,
                  legendSize: 10,
                }}
                enableGridX={false}
                enableGridY={true}
                enableLabel={false}
              />
            ) : (
              <LoadingComponent />
            )}
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
