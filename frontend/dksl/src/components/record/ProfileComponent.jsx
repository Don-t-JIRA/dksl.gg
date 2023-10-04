// React
import { useMemo } from 'react';
// Styled
import * as S from '@/styles/record/profile.style';
// Component
import LoadingComponent from '../common/LoadingComponent';

const ProfileComponent = ({ data }) => {
  const num = useMemo(() => Math.floor(Math.random() * 6) + 1, []);

  return (
    <S.ProfileLayout $bgnum={num}>
      {data ? (
        <S.ProfileContainer>
          <img
            className="logo"
            src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/profileicon/${data.profile_icon_id}.png`}
          />
          <div className="userBox">
            <div className="title">
              <h1>{data.summoner_name}</h1>
              <img
                src={`/image/rank-icons/${
                  data.tier_name ? data.tier_name.toLowerCase() : `unranked`
                }.png`}
              />
            </div>
            <p className="lbti">CVSD</p>
            <div className="record-update">
              <button onClick={() => location.reload()}>전적 갱신</button>
              <p className="desc">최근 업데이트 : {data.last_updated_at}</p>
            </div>
          </div>
        </S.ProfileContainer>
      ) : (
        <S.ProfileContainer>
          <LoadingComponent white={true} />
        </S.ProfileContainer>
      )}
    </S.ProfileLayout>
  );
};

export default ProfileComponent;
