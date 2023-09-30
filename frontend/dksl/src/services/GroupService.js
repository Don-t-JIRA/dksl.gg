// Axios
import { common, auth } from './api.js';
// Swal
import Swal from 'sweetalert2';

const getGroupList = async () => {
  try {
    const response = await common.get('/team');
    if (response.status != 200) new Error('서버 오류');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const setNewGroup = async (formData) => {
  try {
    const response = await auth.post('/team/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': `http://127.0.0.1:3000/`,
        // 'Access-Control-Allow-Origin': `http://localhost:3000/`,
      },
      withCredentials: false,
    });

    return response;
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

const searchGroup = async (word) => {
  try {
    const response = await common.get(`/team/search?word=${word}`);

    return response;
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

const groupDetail = async (name, hasToken) => {
  console.log('service in : ', name, hasToken);
  try {
    if (hasToken) {
      const response = await auth.get(`/team/detail?name=${name}`);
      return response;
    } else {
      console.log('ajax start');
      const response = await common.get(`/team/detail?name=${name}`);
      return response;
    }
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

export { getGroupList, setNewGroup, searchGroup, groupDetail };
