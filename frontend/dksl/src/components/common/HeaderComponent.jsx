// router
import { useNavigate } from 'react-router-dom';
// assets
import dkslLogo from '/src/assets/dkslhead.svg';
// Styled
import * as S from '@/styles/common/header.style';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const token = null;

  const setNavigate = (url) => {
    navigate(url);
  };

  return (
    <S.HeaderLayout>
      <div className="logoBox">
        <a href="/" target="_blank" rel="noreferrer">
          <img src={dkslLogo} className="logo" alt="Dksl logo" />
        </a>
      </div>
      <S.MenuContainer>
        <a href="/group">소속</a>
        <a>투기장</a>
        <a>매칭</a>
        <a>리뷰</a>
      </S.MenuContainer>
      {token ? (
        <S.LogInConatiner>
          <button onClick={() => setNavigate('/user/signin')}>로그인</button>
        </S.LogInConatiner>
      ) : (
        <S.LogoutContainer>
          <div className="profile">
            <img src="src/assets/Riot.svg" alt="profile" className="image" />
            <p className="name">롤 닉네임</p>
          </div>
        </S.LogoutContainer>
      )}
    </S.HeaderLayout>
  );
};

export default HeaderComponent;
