import Axios from 'axios';

const BASE_URL = 'http://192.168.0.11:8080';
// const BASE_URL = 'http://localhost:8080';

const api = Axios.create({
  baseURL: BASE_URL,
});

// api.interceptors.request.use(
//   function (config) {
//     // 요청 성공 직전 호출
//     const access = localStorage.getItem('accessToken');
//     if (access) {
//       config.headers.Authorization = `Bearer ${access}`;
//       console.log('인터셉트해서 토큰 추가', access)
//     } else {
//       console.log('토큰 없음')
//     }
//     return config;
//   },
//   function (error) {
//       // 요청 에러 직전 호출
//       return Promise.reject(error);
//   }
// );

export default api;
