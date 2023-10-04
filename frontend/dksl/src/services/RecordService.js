// User API (Axios)
import { record } from './api';
// Swal
import Swal from 'sweetalert2';

const getSearchData = async (word) => {
  try {
    console.log(record.defaults);
    const postRequest = await record.post(`/match-histories?summoner_name=${word}`);
    if (postRequest.status != 200) throw new Error('POST ERROR');
    const putRequest = await record.put(`/match-histories?summoner_name=${word}`);
    if (putRequest.status != 200) throw new Error('PUT ERROR');
    const response = await record.get(`/match-histories?summoner_name=${word}`);
    if (response.status != 200) {
      return 'NoData';
    }
    return response.data;
  } catch(error) {
    Swal.fire('Error', error.response, 'error');
  }
}

export { getSearchData };
