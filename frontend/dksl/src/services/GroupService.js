import api from './api.js';

const getGroupList = async () => {
  try {
    const response = await api.get('/team', {
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

// const setNewGroup = async (data) => {
//   try {
//     const response = await api.post('/create', JSON.stringify(data),  {
//       headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//         'Access-Control-Allow-Origin': `http://localhost:3000/`,
//       },
//     });
//     if (response.status != 200) new Error('서버 오류');
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export { getGroupList };
