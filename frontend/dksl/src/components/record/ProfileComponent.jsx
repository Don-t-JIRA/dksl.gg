// React
import { useMemo } from 'react';
// Styled
import * as S from '@/styles/record/profile.style';
import LoadingComponent from '../common/LoadingComponent';

const ProfileComponent = ({ data }) => {
  const num = useMemo(() => Math.floor(Math.random() * 6) + 1, []);

  return (
    <S.ProfileLayout bgnum={num}>
      {data ? (
        <S.ProfileContainer>
          <img className="logo" src="image/dkslhead.svg" />
          <div className="userBox">
            <div className="title">
              <h1>닉네임</h1>
              <img src="image/tier.png" />
            </div>
            <p className="lbti">CVSD</p>
            <div className="record-update">
              <button>전적 갱신</button>
              <p className="desc">최근 업데이트 : 5분 전</p>
            </div>
          </div>
        </S.ProfileContainer>
      ) : (
        <S.ProfileContainer>
          <LoadingComponent white />
        </S.ProfileContainer>
      )}
    </S.ProfileLayout>
  );
};

export default ProfileComponent;
