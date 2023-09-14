import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SigninComponent from '../components/user/SigninComponent';
import SignupComponent from '../components/user/SignupComponent';

const UserContainer = () => {
  const [signin, setSignin] = useState({});
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
        <SignupComponent />
      )}
    </>
  );
};

export default UserContainer;
