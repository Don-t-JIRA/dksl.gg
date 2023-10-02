// React
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Component
import ProfileComponent from '../components/record/ProfileComponent';
import HeaderComponent from '../components/common/HeaderComponent';
import RecordBodyComponent from '../components/record/RecordBodyComponent';
// 더미 데이터
import { laderData, sample } from '../data';
import { spell } from '../spell';

const sampleData = () => {
  let win = 0;
  const user = sample.profile[0].summoner_name;
  console.log(spell);
  const arr = sample.match_histories.map((e) => {
    win = 0;
    let cur;
    let summary = [[], []];
    e.forEach((v, i) => {
      if (v.win_or_lose == 0) {
        summary[1].push({
          name: v.summoner_name,
          champ: v.champion_name_en,
        });
      } else {
        summary[0].push({
          name: v.summoner_name,
          champ: v.champion_name_en,
        });
      }
      const spell_0 = v.spell_0_id;
      const spell_1 = v.spell_1_id;
      console.log(spell_0);
      // if (typeof number )
      v.spell_0_id = spell.data[spell_0].id;
      v.spell_1_id = spell.data[spell_1].id;
      const str = v.play_duration.split('');
      if (str.length < 5) {
        v.play_duration = str[0] + str[1] + ':' + str[2] + str[3];
      }
      // v.play_duration = duration;
      if (v.summoner_name == user) {
        cur = i;
        if (v.win_or_lose != 0) win = v.win_or_lose;
      }
    });
    return {
      win,
      cur,
      summary,
      data: e,
    };
  });

  return {
    profile: sample.profile[0],
    match_histories: arr,
  };
};

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

  useEffect(() => {
    const data = sampleData();
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
  }, [summoner]);

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
