// React
import { useEffect, useState } from 'react';
// Swal
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Component
import HeaderComponent from '../components/common/HeaderComponent';
import GroupMainComponent from '../components/group/GroupMainComponent';
// Service
import { getGroupList } from '../services/GroupService';
import GroupCreateComponent from '../components/group/GroupCreateComponent';

const GroupContainer = () => {
  const [teamList, setTeamList] = useState();

  const MySWal = withReactContent(Swal);

  const getNewGroup = async () => {
    const { value: formValues } = await MySWal.fire({
      title: '&#129309; 소속 만들기',
      html: <GroupCreateComponent />,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
        ];
      },
    });

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGroupList();
      setTeamList(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <HeaderComponent />
      <GroupMainComponent groupList={teamList} createGroup={getNewGroup} />
    </>
  );
};

export default GroupContainer;
