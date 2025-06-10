import api from '../lib/axios';

export const getProducts = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(`/products${query ? `?${query}` : ''}`);
      resolve(res); 
    } catch (error) {
      reject(error);
    }
  });
};


export const createProduct = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post(`/products`, payload); 
      resolve(res); 
    } catch (error) {
      reject(error);
    }
  });
};
export const upsertProduct = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post(`/products`, payload); 
      resolve(res); 
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.delete(`/products/${id}`); 
      resolve(res); 
    } catch (error) {
      reject(error);
    }
  });
};