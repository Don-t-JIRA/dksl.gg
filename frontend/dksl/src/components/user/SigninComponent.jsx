// React
import { useEffect, useMemo } from 'react';
// Styled
import * as S from '@/styles/user/signin.style';
// Service
import { signIn } from '../../services/UserService';
// Sweetalert
import Swal from 'sweetalert2';

/**
 * @param getter // 로그인 시 서버에 전송할 유저 객체
 * @param setter // 유저 객체에 값 저장할 Setter 메서드
 */
const SigninComponent = ({ getter, setter }) => {
  const num = useMemo(() => Math.floor(Math.random() * 5) + 1, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setter({
      ...getter,
      [name]: value,
    });
  };

  const onSignIn = () => {
    const data = signIn(getter);
    if (data.status == 200) {
      Swal.fire('알림', '회원가입에 성공하셨습니다.', 'success');
      
    }
  }

  useEffect(() => {
    console.log(getter);
  }, [getter])

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
    <S.SigninLayout bgnum={num}>
      <S.SigninContainer>
        <div className="box">
          <img className="logo" src="image/dkslhead.svg" />
          <h1> 로그인 </h1>
        </div>
        <S.SigninInputBox>
          <input
            type="text"
            name="clientId"
            onChange={(e) => onChange(e)}
            placeholder="본인의 라이엇 아이디를 입력하세요."
          />
          <input
            type="password"
            name="password"
            onChange={(e) => onChange(e)}
            placeholder="본인의 라이엇 비밀번호를 입력하세요."
          />
          <S.SigninBtnBox>
            <a className="link" href="/user/signup">
              회원가입
            </a>
            <button onClick={onSignIn}>로그인</button>
          </S.SigninBtnBox>
        </S.SigninInputBox>
      </S.SigninContainer>
    </S.SigninLayout>
  );
};

export default SigninComponent;
