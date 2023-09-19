// Styled
import * as S from '@/styles/record/tabmain.style';
// Select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// Nivo
import { ResponsivePie } from '@nivo/pie';

const options = [{ value: 'default', label: '큐 타입' }];

const animatedComponent = makeAnimated();

const TabMainComponent = ({ data }) => {
  return (
    <S.TabMainLayout>
      <S.LeftLayout>
        <S.TierCard>
          <p className="title">&#127941; 티어</p>
          <div>
            <div className="result-box">
              <div className="rank-type">솔로 랭크</div>
              <div className="rank-detail">
                <img src="src/assets/tier.png" />
                <div className="description">
                  <p className="tier">Master</p>
                  <p className="point">68P</p>
                </div>
              </div>
            </div>
            <div className="result-box">
              <div className="rank-type">자유 랭크</div>
              <div className="rank-detail">
                <img src="src/assets/tier.png" />
                <div className="description">
                  <p className="tier">Master</p>
                  <p className="point">22P</p>
                </div>
              </div>
            </div>
            <div className="result-box">
              <div className="rank-type">전략적 팀 전투</div>
              <div className="rank-detail">
                <img src="src/assets/tier.png" />
                <div className="description">
                  <p className="tier">Master</p>
                  <p className="point">1P</p>
                </div>
              </div>
            </div>
          </div>
        </S.TierCard>
        <S.DuoCard>
          <p className="title">&#128080; 함께 한 소환사들</p>
          <table className="duo-table">
            <thead>
              <tr className="table-header">
                <td className="summoner">소환사</td>
                <td className="game">게임</td>
                <td className="result">승-패</td>
                <td className="percentage">승률</td>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="summoner">
                  <img className="image" src="src/assets/dkslhead.svg" />
                  <p>NickName</p>
                </td>
                <td className="game">4</td>
                <td className="result">2-2</td>
                <td className="percentage">50%</td>
              </tr>
              <tr className="table-row">
                <td className="summoner">
                  <img className="image" src="src/assets/dkslhead.svg" />
                  <p>NickName</p>
                </td>
                <td className="game">4</td>
                <td className="result">2-2</td>
                <td className="percentage">50%</td>
              </tr>
            </tbody>
          </table>
        </S.DuoCard>
      </S.LeftLayout>
      <S.RightLayout>
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
        <S.RecentCard>
          <p className="title">&#128202; 최근 20게임 분석</p>
          <div className="card-body">
            <div className="circle-graph">
              <p className="sub-title">20전 9승 11패</p>
              <div className="percentage-pie">
                <ResponsivePie
                  data={data}
                  margin={{ top: 5, right: 5, bottom: 5, left: 10 }}
                  innerRadius={0.75}
                  padAngle={0.7}
                  cornerRadius={1}
                  colors={['#5858ffd2', '#ff5858']}
                  activeOuterRadiusOffset={3}
                  borderWidth={1}
                  borderColor={{
                    from: 'color',
                    modifiers: [['darker', '0.2']],
                  }}
                  enableArcLinkLabels={false}
                  enableArcLabels={false}
                />
                <div className="description">
                  <p className="kda">
                    5.7/<p className="death">5.4</p>/6.4
                  </p>
                  <p className="middle">2.24:1</p>
                  <p>킬관여 51%</p>
                </div>
              </div>
            </div>
            <div className="recent-played">
              <p className="sub-title">플레이한 챔피언&nbsp;(최근 20게임)</p>
              <div className="most-champ">
                <img className="image" src="src/assets/dkslhead.svg" />
                <p className="percent">56%</p>
                <p className="score">(5승 4패)</p>
                <p className="grade">2.88&nbsp;평점</p>
              </div>
              <div className="most-champ">
                <img className="image" src="src/assets/dkslhead.svg" />
                <p className="percent">56%</p>
                <p className="score">(5승 4패)</p>
                <p className="grade">2.88&nbsp;평점</p>
              </div>
              <div className="most-champ">
                <img className="image" src="src/assets/dkslhead.svg" />
                <p className="percent">56%</p>
                <p className="score">(5승 4패)</p>
                <p className="grade">2.88&nbsp;평점</p>
              </div>
            </div>
            <div className="favo-position">
              <p className="sub-title">선호 포지션&nbsp;(랭크)</p>
              <div className="position-area">
                <div className="line">
                  <S.LineGraph gray={90} blue={10}>
                    <div className="gray-area"></div>
                    <div className="blue-area"></div>
                  </S.LineGraph>
                  <p>TOP</p>
                </div>
                <div className="line">
                  <S.LineGraph gray={90} blue={10}>
                    <div className="gray-area"></div>
                    <div className="blue-area"></div>
                  </S.LineGraph>
                  <p>JUG</p>
                </div>
                <div className="line">
                  <S.LineGraph gray={30} blue={70}>
                    <div className="gray-area"></div>
                    <div className="blue-area"></div>
                  </S.LineGraph>
                  <p>MID</p>
                </div>
                <div className="line">
                  <S.LineGraph gray={100} blue={0}>
                    <div className="gray-area"></div>
                    <div className="blue-area"></div>
                  </S.LineGraph>
                  <p>AD</p>
                </div>
                <div className="line">
                  <S.LineGraph gray={90} blue={10}>
                    <div className="gray-area"></div>
                    <div className="blue-area"></div>
                  </S.LineGraph>
                  <p>SUP</p>
                </div>
              </div>
            </div>
          </div>
        </S.RecentCard>
        <S.RecordTable>
          
        </S.RecordTable>
      </S.RightLayout>
    </S.TabMainLayout>
  );
};

export default TabMainComponent;
