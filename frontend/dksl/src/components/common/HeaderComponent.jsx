// React
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Styled
import * as S from '@/styles/common/header.style';
import { useAuth } from '../../jotai/auth';

const HeaderComponent = () => {
  const auth = useAuth();
  const search = useRef();
  const navigate = useNavigate();
  const token = auth ? auth.name : null;
  // const token = null;

  const setNavigate = (url) => {
    navigate(url);
  };

  const onSearch = () => {
    console.log(search.current.value);
  };

  return (
    <S.HeaderLayout>
      <div className="logoBox">
        <a href="/" rel="noreferrer">
          <img src="/image/dkslhead.svg" className="logo" alt="Dksl logo" />
        </a>
      </div>
      <S.MenuContainer>
        <a href="/group/main" rel="noreferrer">소속</a>
        <div className="search-input">
          <input placeholder="소환사명 입력하기" ref={search} />
          <img src="/image/search.svg" onClick={() => onSearch()} />
        </div>
      </S.MenuContainer>
      {!token ? (
        <S.LogInConatiner>
          <button onClick={() => setNavigate('/user/signin')}>로그인</button>
        </S.LogInConatiner>
      ) : (
        <S.LogoutContainer>
          <div className="profile">
            <img src="/image/Riot.svg" alt="profile" className="image" />
            <p className="name">롤 닉네임</p>
            <button onClick={() => console.log('logout')}>로그아웃</button>
          </div>
        </S.LogoutContainer>
      )}
    </S.HeaderLayout>
  );
};

export default HeaderComponent;
