// React
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Swal
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Component
import HeaderComponent from '../components/common/HeaderComponent';
import GroupMainComponent from '../components/group/GroupMainComponent';
import GroupCreateComponent from '../components/group/GroupCreateComponent';
import GroupDetailComponent from '../components/group/GroupDetailComponent';
// Service
import { getGroupList } from '../services/GroupService';

const GroupContainer = () => {
  const [teamList, setTeamList] = useState();
  const [path, setPath] = useState(null);

  const url = useLocation();

  const MySWal = withReactContent(Swal);

  const getNewGroup = async () => {
    const { value: formValues } = await MySWal.fire({
      title: '<b>&#129309; 소속 만들기</b>',
      html: <GroupCreateComponent />,
      width: '60%',
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
    if (path == null) {
      setPath(url.pathname);
    }
  }, [url])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGroupList();
      setTeamList(data);
    };

    if (path == '/group/main') {
      fetchData();
    } else {
      console.log(url);
    }
  }, [path]);

  return (
    <>
      <HeaderComponent />
      {path == '/group/main' ? (
        <GroupMainComponent groupList={teamList} createGroup={getNewGroup} />
      ) : (
        <GroupDetailComponent />
      )}
    </>
  );
};

export default GroupContainer;
