import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: '/auth',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await authApi.post('/refresh');
        return api(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
