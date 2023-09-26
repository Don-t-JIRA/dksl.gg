// User API (Axios)
import api from './api';
// Swal
import Swal from 'sweetalert2';

const register = async (data) => {
  try {
    const response = await api.post(
      '/member/register',
      JSON.stringify(data), {
        withCredentials: false
      }
    );

    return response;
  } catch (error) {
    Swal.fire('Error', error.respnose.data, 'error');
  }
};

const signIn = async (data) => {
  try {
    const response = await api.post(
      '/member/login',
      JSON.stringify(data), {
        withCredentials: false
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
}

const getMember = async () => {
  try {
    const response = await api.get('/member');
    return response;
  } catch (error) {
    console.log(error.response.data);
  }
}

export { register, signIn, getMember };
