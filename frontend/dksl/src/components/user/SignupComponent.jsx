// React
import { useMemo } from 'react';
// Styled
import * as S from '@/styles/user/signup.style';
// Service
import { register } from '../../services/UserService';
// Sweetalert
import Swal from 'sweetalert2';

/**
 * @param getter // 회원가입 시 서버에 전송할 유저 객체
 * @param setter // 유저 객체에 값 저장할 Setter 메서드
 */
const SignupComponent = ({ getter, setter }) => {
  const num = useMemo(() => Math.floor(Math.random() * 5) + 1, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setter({
      ...getter,
      [name]: value,
    });
  };

  const onSubmit = () => {
    const data = register(getter);
    if (data.status == 200) {
      Swal.fire('알림', '회원가입에 성공하셨습니다.', 'success');

    }
  }

  return (
    <S.SignupLayout bgnum={num}>
      <S.SignupContainer>
        <div className="box">
          <img className="logo" src="../image/dkslhead.svg" />
          <h1> 회원가입 </h1>
        </div>
        <S.SignupInputBox>
          <input
            type="text"
            name="name"
            onChange={(e) => onChange(e)}
            placeholder="리그오브레전드 닉네임을 입력하세요."
          />
          <input
            type="text"
            name="clientId"
            onChange={(e) => onChange(e)}
            placeholder="아이디를 입력하세요."
          />
          <input
            type="password"
            name="password"
            onChange={(e) => onChange(e)}
            placeholder="비밀번호를 입력하세요."
          />
          <input
            type="password"
            name="passwordCheck"
            onChange={(e) => onChange(e)}
            placeholder="비밀번호를 다시 한번 입력하세요."
          />
          <input
            type="text"
            name="phone"
            onChange={(e) => onChange(e)}
            placeholder="전화번호를 입력하세요."
          />
          <input
            type="text"
            name="email"
            onChange={(e) => onChange(e)}
            placeholder="이메일을 입력하세요."
          />
          <S.SignupBtnBox>
            <button onClick={onSubmit}>회원가입</button>
          </S.SignupBtnBox>
        </S.SignupInputBox>
      </S.SignupContainer>
    </S.SignupLayout>
  );
};

export default SignupComponent;
