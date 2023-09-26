// User API (Axios)
import api from './api';
// Swal
import Swal from 'sweetalert2';

const register = async (data) => {
  // const response = await api.post(
  //   '/user/register',
  //   JSON.stringify(data), 
  //   {
  //     headers: {
  //       "Content-Type": "application/json;",
  //       "Access-Control-Allow-Origin": `http://localhost:3000/`,
  //     },
  //   }
  // ).catch((err) => {
  //   Swal.fire('Error', err.message, 'error');
  // });
  
  // return response.data;

  try {
    const response = await api.post(
      '/member/register',
      JSON.stringify(data), 
      {
        headers: {
          "Content-Type": "application/json;",
          "Access-Control-Allow-Origin": `http://localhost:3000/`,
        },
      }
    );

    if (response.status == 200) {
      sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('refreshToken', response.data.resfreshToken);
    }

    return response;
  } catch (error) {
    Swal.fire('Error', error.respnose.data, 'error');
  }
};

const signIn = async (data) => {
  // const response = await api.post(
  //   '/member/login',
  //   JSON.stringify(data),
  //   {
  //     headers: {
  //       "Content-Type": "application/json;charset=UTF-8",
  //       "Access-Control-Allow-Origin": `http://localhost:3000/`,
  //     },
  //   }
  // ).catch((err) => {
  //   Swal.fire('Error', err.message, 'error');
  // });

  // return response.data;

  try {
    const response = await api.post(
      '/member/login',
      JSON.stringify(data), 
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": `http://localhost:3000/`,
        },
      }
    );
    return response;
  } catch (error) {
    Swal.fire('Error', error.respnose.data, 'error');
  }
}

export { register, signIn };
