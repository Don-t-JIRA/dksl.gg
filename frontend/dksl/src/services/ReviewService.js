// Axios
import { common, auth } from './api.js';
// Swal
import Swal from 'sweetalert2';

// 매치가 아닌 소환사별 리뷰가 있어야할듯.
const getReviews = async (match) => {
  try {
    const response = await common.get(`/review/${match}`);
    if (response.status != 200) new Error('서버 오류');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const setReview = async (data) => {
  try {
    const response = await auth.post('/review', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    return response;
  } catch (error) {
    Swal.fire('Error', error.response.data, 'error');
  }
};

export { getReviews, setReview };
