// Styled
import * as S from '@/styles/record/tabanalyze.style';
// Select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// Chart
import { ResponsiveRadar } from '@nivo/radar';

const data = [
  {
    "taste": "fruity",
    "carmenere1": 120,
    "carmenere2": 60,
    "carmenere3": 90,
    "carmenere4": 50,
  },
  {
    "taste": "bitter",
    "carmenere1": 35,
    "carmenere2": 80,
    "carmenere3": 20,
    "carmenere4": 100,
  },
  {
    "taste": "heavy",
    "carmenere1": 20,
    "carmenere2": 30,
    "carmenere3": 50,
    "carmenere4": 40,
  },
  {
    "taste": "strong",
    "carmenere1": 80,
    "carmenere2": 2,
    "carmenere3": 70,
    "carmenere4": 40,
  }
];

const options = [{ value: 'default', label: '큐 타입' }];

const animatedComponent = makeAnimated();

const TabAnalyzeComponent = () => {
  return (
    <S.TabAnalyzeLayout>
      <div className="rank-type">
        <div className="radio-group">
          <input type="radio" name="rank-type" />
          <label>랭크 전체</label>
          <input type="radio" name="rank-type" />
          <label>솔로 랭크</label>
          <input type="radio" name="rank-type" />
          <label>자유 랭크</label>
        </div>
        <div className="select-group">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponent}
            defaultValue={options[0]}
            options={options}
          />
        </div>
      </div>
      <S.LeftLayout>
        <S.AnalyzeCard>
          <p className="title">&#128195; 롤BTI 분석</p>
          <div className="analyze-box">
            <img src="image/lbti-img.svg" />
            <p className="subtitle">
              <p>킹받는 티모 원챔</p>
              <p className="lbti">CVSD</p>
            </p>
            <div className="tag-box">
              <S.TagItem bg="red">
                <div className="text">
                  #<b>공격</b>적인
                </div>
              </S.TagItem>
              <S.TagItem bg="green">
                <div className="text">
                  #<b>올드</b>한
                </div>
              </S.TagItem>
              <S.TagItem bg="violet">
                <div className="text">
                  #많이<b>때린</b>
                </div>
              </S.TagItem>
              <S.TagItem bg="var(--maincolor-depth1)">
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
              keys={['carmenere1','carmenere2','carmenere3','carmenere4']}
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
      <S.RightLayout></S.RightLayout>
    </S.TabAnalyzeLayout>
  );
};

export default TabAnalyzeComponent;
