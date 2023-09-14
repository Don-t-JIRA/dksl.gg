import * as S from '@/styles/user/signup.style';

const SignupComponent = () => {
  return (
    <S.SignupLayout>
      <S.SignupContainer>
        <div className="box">
          <img className="logo" src="../../src/assets/dkslhead.svg" />
          <h1> 회원가입 </h1>
        </div>
        <hr />
        <S.SignupInputBox>
          <input placeholder="이름를 입력하세요." />
          <input placeholder="아이디를 입력하세요." />
          <input placeholder="비밀번호를 입력하세요." />
          <input placeholder="이메일을 입력하세요." />
          <input placeholder="본인의 소속을 입력하세요." />
          <S.SignupBtnBox>
            <button>회원가입</button>
          </S.SignupBtnBox>
        </S.SignupInputBox>
      </S.SignupContainer>
    </S.SignupLayout>
  );
};

export default SignupComponent;
