// router
import { useNavigate } from "react-router-dom"
// assets
import dkslLogo from '/src/assets/dkslhead.svg'
// Styled
import * as S from "@/styles/common/header.style"

const HeaderComponent = () => {
  const navigate = useNavigate();

  const setNavigate = (url) => {
    navigate(url);
  }

  return (
    <S.HeaderLayout>
      <div className="logoBox">
        <a href="/" target="_blank" rel="noreferrer">
          <img src={dkslLogo} className="logo" alt="Dksl logo" />
        </a>
      </div>
      <S.MenuContainer>
        <a>소속</a>
        <a>투기장</a>
        <a>매칭</a>
        <a>리뷰</a>
      </S.MenuContainer>
      <S.LogInConatiner>
        <button onClick={() => setNavigate('/user/signin')}>
          로그인
        </button>
      </S.LogInConatiner>
    </S.HeaderLayout>
  )
}

export default HeaderComponent;