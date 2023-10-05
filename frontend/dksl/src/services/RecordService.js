// User API (Axios)
import Swal from 'sweetalert2';
import { record } from './api';

const getSearchData = async (word) => {
  try {
    const postRequest = await record.post(
      `/match-histories?summoner_name=${word}`
    );
    if (postRequest.status != 200) throw new Error('POST ERROR');
    const putRequest = await record.put(
      `/match-histories?summoner_name=${word}`
    );
    if (putRequest.status != 200) throw new Error('PUT ERROR');
    const response = await record.get(`/match-histories?summoner_name=${word}`);
    if (response.status != 200) {
      return 'NoData';
    }
    return response.data;
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: '이런!',
      text: '정확한 소환사명을 입력해주세요!',
      icon: 'error',
    }).then((result) => {
      if (result.isConfirmed) window.location.href = '/';
    });
  }
};

const getAnalyzeData = async (name) => {
  try {
    const response = await record.get(`/recommend?summoner_name=${name}`);
    if (response.status == 200) {
      return response.data;
    }
    return 'NoData';
  } catch (error) {
    console.error(error);
  }
};

export { getSearchData, getAnalyzeData };
