// React
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Component
import ProfileComponent from '../components/record/ProfileComponent';
import HeaderComponent from '../components/common/HeaderComponent';
import RecordBodyComponent from '../components/record/RecordBodyComponent';
// 더미 데이터
import { laderData } from '../data';
// Jotai
import { useRecord } from '../jotai/record';
import { groupLeave } from '../services/GroupService';
import Swal from 'sweetalert2';

const RecordContainer = () => {
  const [recordTab, setRecordTab] = useState(0);
  const [recorddata, setRecorddata] = useState(null);
  const [piedata, setPiedata] = useState([{ id: '', label: '', value: 0 }]);
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
    if (summoner == 'noname') {
      console.log('noname enter');
    }
    if (data != null) {
      setProfile(data.profile);
      setRecorddata(data);
      setPiedata([
        {
          id: '승리',
          label: '승리',
          value: data.recent.win,
        },
        {
          id: '패배',
          label: '패배',
          value: data.recent.lose,
        },
      ]);
    }
    // const fetchData = async () => {
    //   const data = await getSearchData(summoner);
    //   setRecorddata(data);
    // }
    // fetchData();
  }, [summoner, data]);

  const leaveTeam = useCallback(async (name) => {
    if (name == 'test') {
      console.log('Call leaveTeam');
      return;
    }
    const result = await groupLeave(name);

    if (result) {
      Swal.fire('Success', name + '소속에서 탈퇴되셨습니다.', 'success');
    }
  }, []);

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
        piedata={piedata}
        analyzedata={laderData}
        tab={recordTab}
        setTab={setRecordTab}
        leaveTeam={leaveTeam}
      />
    </>
  );
};

export default RecordContainer;
