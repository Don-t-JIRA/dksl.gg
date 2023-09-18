// React
import { useState } from 'react';
// Component
import ProfileComponent from '../components/record/ProfileComponent';
import HeaderComponent from '../components/common/HeaderComponent';
import RecordBodyComponent from '../components/record/RecordBodyComponent';

const RecordContainer = () => {
  const [recordTab, setRecordTab] = useState(0);
  return (
    <>
      <HeaderComponent />
      <ProfileComponent />
      <RecordBodyComponent tab={recordTab} setTab={setRecordTab} />
    </>
  );
}

export default RecordContainer;