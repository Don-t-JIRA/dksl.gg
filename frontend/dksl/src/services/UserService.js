// User API (Axios)
import axios from 'axios';
import Swal from 'sweetalert2';

const register = async (data) => {
  const response = await axios.post(
    'http://70.12.247.95:8080/user/register',
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
  const response = await axios.post(
    'http://70.12.247.95:8080/user/login',
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
}

export { register, signIn };
