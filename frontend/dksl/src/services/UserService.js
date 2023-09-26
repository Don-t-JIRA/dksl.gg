// User API (Axios)
import auth from './api';
// Swal
import Swal from 'sweetalert2';

const register = async (data) => {
  try {
    const response = await auth.post(
      '/member/register',
      JSON.stringify(data)
    );

    return response;
  } catch (error) {
    Swal.fire('Error', error.respnose.data, 'error');
  }
};

const signIn = async (data) => {
  try {
    const response = await auth.post(
      '/member/login',
      JSON.stringify(data)
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
    const response = await auth.get('/member');
    return response;
  } catch (error) {
    console.log(error.response.data);
  }
}

export { register, signIn, getMember };
