// Axios
import Axios from 'axios';
// Swal
import Swal from 'sweetalert2';
/// Service
import { reAccessToken } from './UserService';

// 맥북
// const BASE_URL = VITE_NOTEBBOOK_SPRING_URL;
// 싸피
const BASE_URL = import.meta.env.VITE_DEVELOP_SPRING_URL;
// FastAPI
const RECORD_URL = import.meta.env.VITE_DEVELOP_FAST_URL;

const common = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

const auth = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

const record = Axios.create({
  baseURL: RECORD_URL,
})

auth.interceptors.request.use(
  async function (config) {
    const access = sessionStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    } else {
      if (refresh) {
        const response = await reAccessToken(refresh);
        if (response.status == 200) {
          sessionStorage.setItem('accessToken', response);
          config.headers.Authorization = `Bearer ${response}`;
        } else {
          Swal.fire('이런!', '재로그인이 필요합니다', 'warning');
        }
      } else {
        Swal.fire('이런!', '로그인이 필요합니다', 'info');
      }
    }
    // config.withCredentials = false;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// // 응답 인터셉터 추가
// auth.interceptors.response.use(
//   function (response) {
//     // 응답 데이터를 가공
//     // ...
//     return response;
//   },
//   function (error) {
//     // 오류 응답을 처리
//     // ...
//     return Promise.reject(error);
//   });

export { auth, common, record };
