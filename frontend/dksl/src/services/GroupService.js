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
      },
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
      const response = await auth.get(`/team/${name}`);
      return response;
    } else {
      const response = await common.get(`/team/${name}`);
      return response;
    }
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

const groupLeave = async (name) => {
  try {
    const response = await auth.post('/team/leave', { name });
    return response.data;
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
}

export { getGroupList, setNewGroup, searchGroup, groupDetail, groupLeave };
