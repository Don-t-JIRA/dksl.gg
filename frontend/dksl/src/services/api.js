import Axios from 'axios';
import { useUpdateAuth } from '../jotai/auth';
import Swal from 'sweetalert2';

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
      const response = useUpdateAuth();

      if (response) {
        config.headers.Authorization = `Bearer ${access}`;
        console.log('인터셉트해서 토큰 추가', access)
      } else {
        Swal.fire('이런!', '로그인이 필요합니다', 'info');
      }
    }
    return config;
  },
  function (error) {
    // 요청 에러 직전 호출
    return Promise.reject(error);
  }
);

export { auth, api };
