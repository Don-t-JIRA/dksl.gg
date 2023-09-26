// React
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Component
import SigninComponent from '../components/user/SigninComponent';
import SignupComponent from '../components/user/SignupComponent';
// Service
import { register } from '../services/UserService';
// Service
import { signIn } from '../services/UserService';
// Sweetalert
import Swal from 'sweetalert2';

const UserContainer = () => {
  // 로그인 시 유저 정보 담을 상태 객체
  // id: string, pw: string
  const [signin, setSignin] = useState({});
  // 회원가입 시 유저 정보 담을 상태 객체
  // id: string, pw: string, name: string, email: string, group: string
  const [signup, setSignup] = useState({});
  const [path, setPath] = useState(null);
  const url = useLocation();

  const onSubmit = async () => {
    const data = await register(signup);
    if (data.status == 200) {
      Swal.fire('알림', '회원가입에 성공하셨습니다.', 'success');
      window.location('/');
    }
  }

  const onSignIn = async () => {
    const data = await signIn(signin);
    if (data.status == 200) {
      Swal.fire('알림', '로그인에 성공하셨습니다.', 'success');
      window.location('/');
      
    }
  }

  useEffect(() => {
    if (path == null) {
      setPath(url.pathname);
    }
  }, [url]);
  
  return (
    <>
      {path == '/user/signin' ? (
        // 로그인 페이지
        <SigninComponent getter={signin} setter={setSignin} onSignIn={onSignIn} />
      ) : (
        // 회원가입 페이지
        <SignupComponent getter={signup} setter={setSignup} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default UserContainer;
