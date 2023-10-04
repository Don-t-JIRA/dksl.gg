// Styled
import * as S from '@/styles/record/tabanalyze.style';
// Chart
import { ResponsiveRadar } from '@nivo/radar';

const data = [
  {
    taste: 'fruity',
    carmenere1: 120,
    carmenere2: 60,
    carmenere3: 90,
    carmenere4: 50,
  },
  {
    taste: 'bitter',
    carmenere1: 35,
    carmenere2: 80,
    carmenere3: 20,
    carmenere4: 100,
  },
  {
    taste: 'heavy',
    carmenere1: 20,
    carmenere2: 30,
    carmenere3: 50,
    carmenere4: 40,
  },
  {
    taste: 'strong',
    carmenere1: 80,
    carmenere2: 2,
    carmenere3: 70,
    carmenere4: 40,
  },
];

const TabAnalyzeComponent = () => {
  return (
    <S.TabAnalyzeLayout>
      <S.LeftLayout>
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
          <p className="title">&#128195; 롤BTI 그래프</p>
          <div className="graph-box">
            <ResponsiveRadar
              data={data}
              keys={['carmenere1', 'carmenere2', 'carmenere3', 'carmenere4']}
              indexBy="taste"
              valueFormat=">-.2f"
              margin={{ top: -40, right: 80, bottom: 0, left: 80 }}
              borderColor={{ from: 'color' }}
              gridLevels={4}
              gridShape="linear"
              gridLabelOffset={36}
              dotSize={10}
              dotColor={{ theme: 'background' }}
              dotBorderWidth={2}
              colors={{ scheme: 'nivo' }}
              blendMode="multiply"
              motionConfig="wobbly"
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: '#999',
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </S.GraphCard>
      </S.LeftLayout>
      <S.RightLayout>
        <S.ChampionCard>
          <p className="title">&#128077; 이 챔피언을 추천해요!</p>
          <div className="champion-box">
            <div className="img">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Zed_0.jpg`}
                alt="champion_analyze"
              />
            </div>
            <div className="img">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Yasuo_0.jpg`}
                alt="champion_analyze"
              />
            </div>
            <div className="img">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Blitzcrank_0.jpg`}
                alt="champion_analyze"
              />
            </div>
          </div>
        </S.ChampionCard>
        <S.FamousCard>
          <p className="title">&#128071; 이 사람은 어때요?</p>
          <div className="content-box">
            <div className="img">
              <img src="/image/lbti-img.svg" alt="sample_img" />
            </div>
          </div>
        </S.FamousCard>
      </S.RightLayout>
    </S.TabAnalyzeLayout>
  );
};

export default TabAnalyzeComponent;
