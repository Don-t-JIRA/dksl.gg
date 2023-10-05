// React
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Component
import ProfileComponent from '../components/record/ProfileComponent';
import HeaderComponent from '../components/common/HeaderComponent';
import RecordBodyComponent from '../components/record/RecordBodyComponent';
// 더미 데이터
// import { laderData } from '../data';
// Jotai
import { useRecord, useUpdateRecord } from '../jotai/record';
import { useGroup, useUpdateGroup } from '../jotai/group';
import { groupLeave } from '../services/GroupService';
// Swal
import Swal from 'sweetalert2';
// Axios
import axios from 'axios';
import { useUpdateAnalyze } from '../jotai/analyze';

// eslint-disable-next-line react/display-name
const MemoizedProfileComponent = React.memo(({ data }) => {
  return <ProfileComponent data={data} />;
});

// eslint-disable-next-line react/display-name
const MemoizedRecordBodyComponent = React.memo(
  ({
    recorddata,
    piedata,
    tab,
    setTab,
    leaveTeam,
    getByteToImage,
    fetchChampData,
  }) => {
    return (
      <RecordBodyComponent
        recorddata={recorddata}
        piedata={piedata}
        tab={tab}
        setTab={setTab}
        leaveTeam={leaveTeam}
        getByteToImage={getByteToImage}
        fetchChampData={fetchChampData}
      />
    );
  }
);

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
  const navigate = useNavigate();
  const data = useRecord();
  const setRecord = useUpdateRecord();
  const setAnalyze = useUpdateAnalyze();
  // LBTI 뽑기 위한 group Atom
  // const group = useGroup();
  // const [lbti, setLbti] = useState(null);
  const setGroup = useUpdateGroup();

  const fetchChampData = useCallback(async (championName) => {
    try {
      const response = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/10.6.1/data/ko_KR/champion/${championName}.json`
      );
      const data = response.data.data[championName];
      return {
        en_name: championName,
        name: data.name,
        title: data.title,
        tags: data.tags,
        tips: data.allytips,
      };
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (data != null) {
      if (data == 'NoData') {
        Swal.fire('이런!', '정보가 없는 소환사입니다!', 'info');
        navigate('/');
      }
      setRecorddata(data);
      setProfile(data.profile);
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
    // if (group && group.summoner_lbti) {
    //   setLbti(group.summoner_lbti);
    // }
  }, [data, navigate]);

  useEffect(() => {
    if (summoner != null || summoner != undefined) {
      setGroup(summoner);
      setRecord(summoner);
      setAnalyze(summoner);
    }
  }, [summoner, setGroup, setRecord, setAnalyze]);

  const getByteToImage = useCallback((imgSrc) => {
    const binaryString = atob(imgSrc);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const img = new Blob([bytes], {
      type: 'image/jpg',
    });

    return URL.createObjectURL(img);
  }, []);

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

  return (
    <>
      <HeaderComponent />
      <MemoizedProfileComponent data={profile} />
      <MemoizedRecordBodyComponent
        recorddata={recorddata}
        piedata={piedata}
        tab={recordTab}
        setTab={setRecordTab}
        leaveTeam={leaveTeam}
        getByteToImage={getByteToImage}
        fetchChampData={fetchChampData}
        // lbti={lbti}
      />
    </>
  );
};

export default RecordContainer;
