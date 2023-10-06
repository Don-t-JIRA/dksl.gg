// Axios
import { record } from './api.js';

const getRankData = async () => {
  try {
    const response = await record.get('/challengers');
    if (response.status != 200) new Error('서버 오류');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getGroupRankData = async () => {
  try {
    const response = await record.get('/team/main');
    if (response.status != 200) new Error('서버 오류');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getRankData, getGroupRankData };
