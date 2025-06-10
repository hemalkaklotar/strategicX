import api from '../lib/axios';

export const registerUser = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post('/auth/register', payload);
      resolve(res); 
    } catch (error) {
      reject(error);
    }
  });
};

export const loginUser = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post('/auth/login', payload);
      localStorage.setItem('token', res.data.token);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
