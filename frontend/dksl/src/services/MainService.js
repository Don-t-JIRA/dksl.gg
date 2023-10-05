// Axios
import { common, auth } from './api.js';

const getRankData = async () => {
    try {
        const response = await common.get('/team/main');
        if (response.status != 200) new Error('서버 오류');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { getRankData };