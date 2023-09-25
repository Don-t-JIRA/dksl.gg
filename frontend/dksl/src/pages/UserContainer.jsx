// React
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Component
import SigninComponent from '../components/user/SigninComponent';
import SignupComponent from '../components/user/SignupComponent';

const UserContainer = () => {
  // 로그인 시 유저 정보 담을 상태 객체
  // id: string, pw: string
  const [signin, setSignin] = useState({});
  // 회원가입 시 유저 정보 담을 상태 객체
  // id: string, pw: string, name: string, email: string, group: string
  const [signup, setSignup] = useState({});
  const [path, setPath] = useState(null);
  const url = useLocation();

  useEffect(() => {
    if (path == null) {
      setPath(url.pathname);
    }
  }, [url]);
  
  return (
    <>
      {path == '/user/signin' ? (
        // 로그인 페이지
        <SigninComponent getter={signin} setter={setSignin} />
      ) : (
        // 회원가입 페이지
        <SignupComponent getter={signup} setter={setSignup} />
      )}
    </>
  );
};

export default UserContainer;
