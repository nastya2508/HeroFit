import axios from 'axios';

const api = axios.create({
  // Обов'язково з /api в кінці
  baseURL: "https://herofit-backend-2.onrender.com/api", 
});

// 1. Перед кожним запитом додаємо Access Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    // ТУТ МАЮТЬ БУТИ ЗВОРОТНІ ЛАПКИ ` `
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Якщо прийшла помилка 401 — оновлюємо токен
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        // Тут теж повна адреса до токена
        const res = await axios.post('https://herofit-backend-2.onrender.com/api/token/refresh/', {
          refresh: refreshToken,
        });

        if (res.status === 200) {
          localStorage.setItem('access_token', res.data.access);
          api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Якщо навіть Refresh токен не спрацював — на вихід
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;