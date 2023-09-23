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
      title: '<b>&#129309; 소속 만들기</b>',
      html: <GroupCreateComponent />,
      width: '50%',
      heightAuto: true,
      padding: '2.5% 5%',
      confirmButtonColor: '#3E7CB1',
      confirmButtonText: '생성 요청',
      focusConfirm: false,
      preConfirm: async () => {
        const values = [
          document.getElementById('swal-input').value,
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
        ];
        // const data = await setNewGroup(values);
        await console.log(values);

        return values;
      },
    }).catch((err) => {
      Swal.fire({
        title: '생성 실패',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#3E7CB1',
        confirmButtonText: '확인',
      });
    });

    if (formValues) {
      Swal.fire({
        title: '생성 성공',
        text: '소속이 성공적으로 생성되었습니다!',
        iconColor: '#3E7CB1',
        icon: 'success',
        confirmButtonColor: '#3E7CB1',
        confirmButtonText: '확인',
      });
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
