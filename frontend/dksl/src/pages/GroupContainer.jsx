// Component
import { useEffect, useState } from 'react';
import HeaderComponent from '../components/common/HeaderComponent';
import GroupMainComponent from '../components/group/GroupMainComponent';
import { getGroupList } from '../services/GroupService';

const GroupContainer = () => {
  const [teamList, setTeamList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGroupList();
      setTeamList(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <HeaderComponent />
      <GroupMainComponent groupList={teamList} />
    </>
  );
};

export default GroupContainer;
