// React
import { useState } from 'react';
// Styled
import * as S from '@/styles/record/tabmain.style';
// Select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// Nivo
import { ResponsivePie } from '@nivo/pie';
import LoadingComponent from '../../common/LoadingComponent';

const options = [{ value: 'default', label: '큐 타입' }];

const animatedComponent = makeAnimated();

const RecordCardComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDetail = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <S.RecordCard win={props.win}>
        <div className="record-info">
          <div className="left-section">
            <div className="area-1">
              <p className="win">승리</p>
              <p>솔로랭크</p>
              <p>26:09</p>
              <p>1시간 전</p>
            </div>
            <div className="area-2">
              <div className="champ">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
              </div>
              <div className="another">
                <img className="image" src="image/dkslhead.svg" />
                <img className="image" src="image/dkslhead.svg" />
                <img className="image" src="image/dkslhead.svg" />
                <img className="image" src="image/dkslhead.svg" />
              </div>
            </div>
            <div className="area-3">
              <div className="kda">
                <p>9</p>/<p className="red">1</p>/<p>4</p>
              </div>
              <p className="red">
                <b>13.00</b> 평점
              </p>
              <p className="tag">
                <b>더블킬</b>
              </p>
            </div>
            <div className="area-4">
              <p>
                킬 관여 <b>62</b>%
              </p>
              <p>
                CS <b>279</b>
              </p>
              <p>
                시야점수 <b>31</b>
              </p>
            </div>
            <div className="area-5">
              <img className="image" src="image/dkslhead.svg" />
              <img className="image" src="image/dkslhead.svg" />
              <img className="image" src="image/dkslhead.svg" />
              <img className="image" src="image/dkslhead.svg" />
              <img className="image" src="image/dkslhead.svg" />
              <img className="image" src="image/dkslhead.svg" />
              <img className="image" src="image/dkslhead.svg" />
            </div>
          </div>
          <div className="right-section">
            <div className="team-1">
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
            </div>
            <div className="team-2">
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
              <div className="summoner">
                <img
                  className="image"
                  src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                />
                <p>nickname</p>
              </div>
            </div>
          </div>
        </div>
        <div className="arrow-area">
          <img
            className="image"
            src={`image/arrow_${isOpen ? 'up' : 'down'}.svg`}
            onClick={openDetail}
          />
        </div>
      </S.RecordCard>
      <div className={`start ${isOpen && `end`}`}>
        {isOpen && (
          <S.RecordDetail>
            <S.TeamDetail win>
              <div className="title">
                <p>승리</p>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
            </S.TeamDetail>
            <S.TeamDetail>
              <div className="title">
                <p>패배</p>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
              <div className="detail-body">
                <div className="area-1">
                  <div className="champ">
                    <img
                      className="image"
                      src="http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Aatrox.png"
                    />
                  </div>
                  <div className="another">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                  <div className="summoner">
                    <p className="tier">
                      <b>Silver1</b>
                    </p>
                    <p className="name">바보개</p>
                  </div>
                </div>
                <div className="area-2">
                  <div className="desc">
                    <div className="kda">
                      <p>5</p>/<p className="red">4</p>/<p>2</p>
                    </div>
                    <p className="score">1.75</p>
                  </div>
                  <div className="result">
                    <div className="text">
                      <p>
                        <b>C</b>:201
                      </p>
                      <p>
                        <b>G</b>:1.2만
                      </p>
                      <p>
                        <b>W</b>:6
                      </p>
                    </div>
                    <S.HorizenGraph red={30} gray={70}>
                      <div className="red"></div>
                      <div className="gray"></div>
                    </S.HorizenGraph>
                  </div>
                </div>
                <div className="area-3">
                  <div className="item-list">
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                    <img className="image" src="image/dkslhead.svg" />
                  </div>
                </div>
              </div>
            </S.TeamDetail>
          </S.RecordDetail>
        )}
      </div>
    </>
  );
};

const TabMainComponent = ({ data }) => {
  if (data == null) {
    return <LoadingComponent />;
  }
  return (
    <S.TabMainLayout>
      <S.LeftLayout>
        <S.TierCard>
          <p className="title">&#127941; 티어</p>
          <div>
            <div className="result-box">
              <div className="rank-type">솔로 랭크</div>
              <div className="rank-detail">
                <img src="image/tier.png" />
                <div className="description">
                  <p className="tier">Master</p>
                  <p className="point">68P</p>
                </div>
              </div>
            </div>
            <div className="result-box">
              <div className="rank-type">자유 랭크</div>
              <div className="rank-detail">
                <img src="image/tier.png" />
                <div className="description">
                  <p className="tier">Master</p>
                  <p className="point">22P</p>
                </div>
              </div>
            </div>
            <div className="result-box">
              <div className="rank-type">전략적 팀 전투</div>
              <div className="rank-detail">
                <img src="image/tier.png" />
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
                  <img className="image" src="image/dkslhead.svg" />
                  <p>NickName</p>
                </td>
                <td className="game">4</td>
                <td className="result">2-2</td>
                <td className="percentage">50%</td>
              </tr>
              <tr className="table-row">
                <td className="summoner">
                  <img className="image" src="image/dkslhead.svg" />
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
                  colors={['#5393CA', '#ff5858']}
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
                <img className="image" src="image/dkslhead.svg" />
                <p className="percent">56%</p>
                <p className="score">(5승 4패)</p>
                <p className="grade">2.88&nbsp;평점</p>
              </div>
              <div className="most-champ">
                <img className="image" src="image/dkslhead.svg" />
                <p className="percent">56%</p>
                <p className="score">(5승 4패)</p>
                <p className="grade">2.88&nbsp;평점</p>
              </div>
              <div className="most-champ">
                <img className="image" src="image/dkslhead.svg" />
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
          <RecordCardComponent key={1} win />
          <RecordCardComponent key={2} />
        </S.RecordTable>
      </S.RightLayout>
    </S.TabMainLayout>
  );
};

export default TabMainComponent;
