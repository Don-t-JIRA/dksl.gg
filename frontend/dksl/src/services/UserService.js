// User API (Axios)
import api from './api';
// Swal
import Swal from 'sweetalert2';

const register = async (data) => {
  const response = await api.post(
    '/user/register',
    JSON.stringify(data), 
    {
      headers: {
        "Content-Type": "application/json;",
        "Access-Control-Allow-Origin": `http://localhost:3000/`,
      },
    }
  ).catch((err) => {
    Swal.fire('Error', err.message, 'error');
  });
  
  return response.data;
};

const signIn = async (data) => {
  const response = await api.post(
    '/user/login',
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": `http://localhost:3000/`,
      },
    }
  ).catch((err) => {
    Swal.fire('Error', err.message, 'error');
  });

  return response.data;
}

export { register, signIn };
