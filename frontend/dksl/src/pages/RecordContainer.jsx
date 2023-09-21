// React
import { useState } from 'react';
// Component
import ProfileComponent from '../components/record/ProfileComponent';
import HeaderComponent from '../components/common/HeaderComponent';
import RecordBodyComponent from '../components/record/RecordBodyComponent';
// 더미 데이터
import { laderData } from "../data";

const recorddumydata = [
  {
    "id": "승리",
    "label": "승리",
    "value": 9,
    "color": "#237ac5"
  },
  {
    "id": "패배",
    "label": "패배",
    "value": 11,
    "color": "#ef3d3d"
  }
]

const RecordContainer = () => {
  const [recordTab, setRecordTab] = useState(0);
  return (
    <>
      <HeaderComponent />
      <ProfileComponent />
      <RecordBodyComponent recorddata={recorddumydata} analyzedata={laderData} tab={recordTab} setTab={setRecordTab} />
    </>
  );
}

export default RecordContainer;