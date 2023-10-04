// React
import { useEffect, useState } from 'react';
// Styled
import * as S from '@/styles/record/tabgroup.style';
// Select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// Component
import LoadingComponent from '../../common/LoadingComponent';
// Jotai
import { useAuth } from '../../../jotai/auth';
import { useGroup } from '../../../jotai/group';

const animatedComponent = makeAnimated();

const TabGroupComponent = ({ leave, image }) => {
  const auth = useAuth();
  const group = useGroup();
  const [options, setOptions] = useState([{
    value: 'default', label: '가입 소속'
  }]);
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    if (group) {
      const arr = group.teamList.map((e, i) => {
        return {
          value: i,
          label: e.name
        }
      });
      setOptions(arr);
    }
  }, [group]);
  console.log(group);

  return (
    <S.TabGroupLayout>
      {group ? (
        group.teamList.length == 0 ? (
          <S.EmptyGroupLayout>
            <h1 className="icon">&#127969;</h1>
            <p className="head">소속이 존재하지 않습니다.</p>
            <p className="desc">해당 소환사는 소속에 가입하지 않았습니다.</p>
            <p className="desc">dkslgg에 가입하고 소속 서비스를 즐겨보세요!</p>
            <a className="link">소속 보러가기</a>
          </S.EmptyGroupLayout>
        ) : (
          <>
            <S.LeftLayout>
              <div className="select-box">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponent}
                  defaultValue={options[0]}
                  options={options}
                />
              </div>
              <div className="group-profile">
                <p className="title">&#127969; 소속</p>
                <div className="profile-body">
                  <div className="profile-img">
                    <img
                      className="image"
                      src={image(group.teamList[currentGroup].img)}
                      alt="group-profile_img"
                    />
                  </div>
                  <div className="profile-desc">
                    <p className="group-name">{group.teamList[currentGroup].name}</p>
                    <p className="group-personnel">
                      <b>인원</b> {group.teamList[currentGroup].summonerResponse.length}명
                    </p>
                    <p className="group-tier">
                      <b>평균티어</b> {group.teamList[currentGroup].avgTier.name}
                    </p>
                    <p className="group-leader">
                      <b>소속장</b> {group.teamList[currentGroup].chairman}
                    </p>
                    {(auth && group.teamList[currentGroup].joined) && (
                      <button
                        className="quit-btn"
                        onClick={() => leave('유한이')}
                      >
                        탈퇴
                      </button>
                    )}
                  </div>
                  <div className="group-desc">
                    <p className="desc-title">&#127775; <b>소속 소개</b></p>
                    <p className="desc-content">
                      {group.teamList[currentGroup].description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="group-ranking">
                <p className="title">&#128587; 소속 순위</p>
                <div className="ranking-table">
                  <div className="table-head">
                    <div className="table-row">
                      <p className="rank">등수</p>
                      <p className="group-name">소속 이름</p>
                      <p className="group-tier">평균 티어</p>
                    </div>
                  </div>
                  <div className="table-body">
                    {group.teamRankList.map((e, i) => (
                      <div className="table-row" key={`group_rank_${i}`}>
                      <p className="rank">{i+1}</p>
                      <div className="group-name">
                        <img
                          className="image"
                          src={image(e.img)}
                          alt="group-profile_img"
                        />
                        {e.name}
                      </div>
                      <p className="group-tier">{e.avgTier.name}</p>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </S.LeftLayout>
            <S.RightLayout>
              <div className="mygroup-ranking">
                <p className="title">&#127942; 우리 소속원 손위</p>

                <div className="radio-group">
                  <input type="radio" name="rank-type" />
                  <label>랭크 전체</label>
                  <input type="radio" name="rank-type" />
                  <label>솔로 랭크</label>
                </div>
                <div className="ranking-table">
                  <div className="table-head">
                    <div className="table-row">
                      <p className="rank">등수</p>
                      <p className="member-name">소속원 이름</p>
                      <p className="member-tier">티어</p>
                      <p className="member-persent">상위</p>
                    </div>
                  </div>
                  <div className="table-body">
                    <div className="table-row current">
                      <p className="rank">297</p>
                      <div className="member-name">
                        <img
                          className="image"
                          src="/image/lbti-img.svg"
                          alt="member-profile_img"
                        />
                        <p className="member-level">123레벨</p>
                        갓뎀뻑
                      </div>
                      <p className="member-tier">Unranked</p>
                      <p className="member-persent">99%</p>
                    </div>
                    <div className="table-row">
                      <p className="rank">1</p>
                      <div className="member-name">
                        <img
                          className="image"
                          src="/image/lbti-img.svg"
                          alt="member-profile_img"
                        />
                        <p className="member-level">400레벨</p>
                        롤진남
                      </div>
                      <p className="member-tier">챌린저</p>
                      <p className="member-persent">1%</p>
                    </div>
                  </div>
                </div>
              </div>
            </S.RightLayout>
          </>
        )
      ) : (
        <LoadingComponent />
      )}
    </S.TabGroupLayout>
  );
};

export default TabGroupComponent;
