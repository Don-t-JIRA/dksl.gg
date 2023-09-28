// Axios
import { api, auth } from './api.js';
// Swal
import Swal from 'sweetalert2';

const getGroupList = async () => {
  try {
    const response = await auth.get('/team', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': `http://localhost:3000/`,
      },
    });
    if (response.status != 200) new Error('서버 오류');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const setNewGroup = async (formData) => {
  try {
    const response = await api.post('/team/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': `http://localhost:3000/`,
      },
    });

    return response;
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

const searchGroup = async (word) => {
  try {
    const response = await auth.get(`/team/search?word=${word}`);

    return response;
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

const groupDetail = async (name, hasToken) => {
  try {
    if (hasToken) return await api.get(`/team/detail?name=${name}`);
    else return await auth.get(`/team/detail?name=${name}`);
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

export { getGroupList, setNewGroup, searchGroup, groupDetail };
