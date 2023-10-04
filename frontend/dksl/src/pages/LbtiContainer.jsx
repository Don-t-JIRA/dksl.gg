// React
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Component
import LoadingComponent from '../components/common/LoadingComponent';
import HeaderComponent from "../components/common/HeaderComponent";
import LbtiTestComponent from "../components/lbti/LbtiTestComponent";
// Service
import { getQuestionList, setLbti } from '../services/LbtiService';

const LbtiContainer = () => {
  const [path, setPath] = useState(null);
  const url = useLocation();
  const [index, setIndex] = useState(0);
  const [questionList, setQuestionList] = useState(null);
  const [lbti, setLbti] = useState(null);
  const [selectList, setSelectList] = useState([]);

  useEffect(() => {
    const fetchAllQuestionData = async () => {
      setQuestionList(await getQuestionList());
    };

    setPath(url.pathname);
    if(url.pathname == '/lbti/test' && !questionList) {
      fetchAllQuestionData();
    }
  }, [url]);

  const fetchLbtiData  = async () => {
    setLbti(await setLbti(selectList));
  };


  return path == '/lbti/test' ? (
    <>
      <HeaderComponent />
      <LbtiTestComponent questionList={questionList} index={index} setIndex={setIndex} fetchLbtiData={fetchLbtiData} selectList={selectList} />
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