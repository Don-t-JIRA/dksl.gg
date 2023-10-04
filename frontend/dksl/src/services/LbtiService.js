// Axios
import { common, auth } from './api.js';
// Swal
import Swal from 'sweetalert2';

const getQuestionList = async () => {
  try {
    const response = await common.get('/lbti/question');
    if (response.status != 200) new Error('서버 오류');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getLbti = async (data) => {
  try {
    const response = await common.post('/lbti', JSON.stringify(data));
    if (response.status != 200) new Error('서버 오류');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getQuestionList, getLbti };
