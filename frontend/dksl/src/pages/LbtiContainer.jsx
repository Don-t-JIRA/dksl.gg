// React
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Component
import LoadingComponent from '../components/common/LoadingComponent';
import HeaderComponent from "../components/common/HeaderComponent";
import LbtiTestComponent from "../components/lbti/LbtiTestComponent";

const LbtiContainer = () => {
  const [path, setPath] = useState(null);
  const url = useLocation();
  const [lbti, setLbti] = useState(null);

  useEffect(() => {
    setPath(url.pathname);
  }, [url]);

  return path == '/lbti/test' ? (
    <>
      <HeaderComponent />
      <LbtiTestComponent />
    </>
  ) : '/lbti/result' && lbti ? (
    <>
      <HeaderComponent />
    </>
  ) : (
    <LoadingComponent />
  );
}

export default LbtiContainer;