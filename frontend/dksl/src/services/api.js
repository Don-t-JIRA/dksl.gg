import Axios from 'axios';

// const BASE_URL = 'http://192.168.0.11:8080';
const BASE_URL = 'http://70.12.247.95:8080';

const auth = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": 'http://localhost:3000/',
  }
});

const api = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": `http://localhost:3000/`,
  },
});

api.interceptors.request.use(
  function (config) {
    // 요청 성공 직전 호출
    const access = sessionStorage.getItem('accessToken');
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
      console.log('인터셉트해서 토큰 추가', access)
    } else {
      console.log('토큰 정보 없음, Login | Singup 둘 중 하나인지');
    }
    return config;
  },
  function (error) {
    // 요청 에러 직전 호출
    return Promise.reject(error);
  }
);

export { api, auth };
