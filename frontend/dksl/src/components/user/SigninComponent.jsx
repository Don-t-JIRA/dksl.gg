import * as S from '@/styles/user/signin.style';

const SigninComponent = ({ getter, setter }) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    setter({
      ...getter,
      [name]: value,
    });
  };

  /**
   * @value 
   * getter: {
   *  id: string,
   *  pw: string
   * }
  const getSignin = async () => {
    await signIn(getter).then((res) => {
      // 응답에 따라 처리 로직 분기
    }).catch((error) => {
      // 에러 메세지 출력이나 에러 컴포넌트로 이동 등 에러 처리
    });
  }
  */

  return (
    <S.SigninLayout>
      <S.SigninContainer>
        <div className="box">
          <img className="logo" src="../../src/assets/dkslhead.svg" />
          <h1> 로그인 </h1>
        </div>
        <hr />
        <S.SigninInputBox>
          <input
            type="text"
            name="id"
            onChange={(e) => onChange(e)}
            placeholder="본인의 라이엇 아이디를 입력하세요."
          />
          <input
            type="password"
            name="pw"
            onChange={(e) => onChange(e)}
            placeholder="본인의 라이엇 비밀번호를 입력하세요."
          />
          <S.SigninBtnBox>
            <a className="link" href="/user/signup">
              회원가입
            </a>
            <button>로그인</button>
          </S.SigninBtnBox>
        </S.SigninInputBox>
      </S.SigninContainer>
    </S.SigninLayout>
  );
};

export default SigninComponent;
