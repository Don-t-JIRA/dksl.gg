// React
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Component
import ProfileComponent from '../components/record/ProfileComponent';
import HeaderComponent from '../components/common/HeaderComponent';
import RecordBodyComponent from '../components/record/RecordBodyComponent';
// 더미 데이터
import { laderData } from '../data';
// Jotai
import { useRecord } from '../jotai/record';

const recorddumydata = [
  {
    id: '승리',
    label: '승리',
    value: 9,
    // color: '#237ac5',
    // color: '#ffffff',
  },
  {
    id: '패배',
    label: '패배',
    value: 11,
    // color: '#ef3d3d',
  },
];

const RecordContainer = () => {
  const [recordTab, setRecordTab] = useState(0);
  const [recorddata, setRecorddata] = useState(null);
  const [profile, setProfile] = useState({
    name: '유 용',
    level: '800',
    lbti: 'CVSD',
    iconId: 6,
    tier: 'master',
  });
  const { summoner } = useParams();
  const data = useRecord();

  useEffect(() => {
    console.log(summoner);
    console.log(data);
    setProfile(data.profile);
    if (summoner == 'noname') {
      console.log('noname enter');
    }
    setRecorddata(data);
    // const fetchData = async () => {
    //   const data = await getSearchData(summoner);
    //   setRecorddata(data);
    // }
    // fetchData();
  }, [summoner, data]);

  /**
   * 여기서는 search 메서드를 통해 소환사명 입력 받으면
   * 소환사명으로 전적 요청을 FastAPI 서버로 보내서
   * 불러온 전적을 RecordBodyComponent에 레코드 데이터로 보내주기
   * 해당 소환사에 대한 정보도 받아와서 ProfileComponent에 보내주기
   */

  return (
    <>
      <HeaderComponent />
      <ProfileComponent data={profile} />
      <RecordBodyComponent
        recorddata={recorddata}
        piedata={recorddumydata}
        analyzedata={laderData}
        tab={recordTab}
        setTab={setRecordTab}
      />
    </>
  );
};

export default RecordContainer;
