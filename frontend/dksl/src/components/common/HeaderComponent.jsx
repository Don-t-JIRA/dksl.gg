import * as S from "@/styles/common/header.style"
import dkslLogo from '/src/assets/dkslhead.svg'

const HeaderComponent = () => {
  return (
    <S.HeaderLayout>
      <S.LogoBox>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <S.Logo src={dkslLogo} className="logo" alt="Dksl logo" />
        </a>
      </S.LogoBox>
      <S.MenuContainer>
        <S.MenuItem>소속</S.MenuItem>
        <S.MenuItem>투기장</S.MenuItem>
        <S.MenuItem>매칭</S.MenuItem>
        <S.MenuItem>리뷰</S.MenuItem>
      </S.MenuContainer>
      <S.LogInConatiner>
        <S.LoginBtn>
          로그인
        </S.LoginBtn>
      </S.LogInConatiner>
    </S.HeaderLayout>
  )
}

export default HeaderComponent;