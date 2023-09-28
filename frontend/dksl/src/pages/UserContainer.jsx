// React
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Component
import SigninComponent from '../components/user/SigninComponent';
import SignupComponent from '../components/user/SignupComponent';
// Service
import { register } from '../services/UserService';
import { signIn } from '../services/UserService';
// Sweetalert
import Swal from 'sweetalert2';
// Jotai
import { useAuth, useUpdateAuth } from '../jotai/auth';

const UserContainer = () => {
  const navigate = useNavigate();
  // 로그인 시 유저 정보 담을 상태 객체
  // id: string, pw: string
  const [signin, setSignin] = useState({});
  // 회원가입 시 유저 정보 담을 상태 객체
  // id: string, pw: string, name: string, email: string, group: string
  const [signup, setSignup] = useState({});

  const [path, setPath] = useState(null);
  const url = useLocation();

  const auth = useAuth();
  const updateAuth = useUpdateAuth();

  // const onSubmit = async () => {
  //   const data = await register(signup);
  //   if (data.status == 200) {
  //     Swal.fire('알림', '회원가입에 성공하셨습니다.', 'success');
  //     navigate('/');
  //   }
  // }

  const onSignup = useCallback(async () => {
    const data = await register(signup);
    if (data.status == 200) {
      Swal.fire({
        title: '알림',
        text: '회원가입에 성공하셨습니다.',
        icon: 'success',
        iconColor: 'var(--maincolor-depth1)',
        confirmButtonColor: 'var(--maincolor-depth1)',
      });
      navigate('/');
    }
  }, [navigate, signup]);

  // const onSignIn = async () => {
  //   const data = await signIn(signin);
  //   if (data.status == 200) {
  //     console.log(data);
  //     updateAuth();
  //     Swal.fire('알림', '로그인에 성공하셨습니다.', 'success');
  //     navigate('/');

  //   }
  // }

  const onSignin = useCallback(async () => {
    const data = await signIn(signin);
    if (data.status == 200) {
      await updateAuth();
      Swal.fire({
        title: '알림',
        text: '로그인에 성공하셨습니다.',
        icon: 'success',
        iconColor: 'var(--maincolor-depth1)',
        confirmButtonColor: 'var(--maincolor-depth1)',
      });
      navigate('/');
    }
  }, [navigate, signin, updateAuth]);

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
    if (path == null) {
      setPath(url.pathname);
    }
  }, [auth, url, path, navigate]);

  return (
    <>
      {path == '/user/signin' ? (
        // 로그인 페이지
        <SigninComponent
          getter={signin}
          setter={setSignin}
          onSignIn={onSignin}
        />
      ) : (
        // 회원가입 페이지
        <SignupComponent
          getter={signup}
          setter={setSignup}
          onSubmit={onSignup}
        />
      )}
    </>
  );
};

export default UserContainer;
