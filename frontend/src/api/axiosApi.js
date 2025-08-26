// import axios from "axios";

// const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// const apiClient = axios.create({
//   baseURL: `${backendUrl}/api/v1`,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const refreshClient = axios.create({
//   baseURL: `${backendUrl}/api/v1`,
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue = [];

// apiClient.interceptors.request.use(
//   (config) => {
//     console.log("Request URL:", `${config.baseURL}${config.url}`);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     const isAccessTokenMissing =
//       error?.response?.status === 401 &&
//       error.response.data?.message === "Unauthorized request" &&a
//       !originalRequest._retry;
   
      
//     if (isAccessTokenMissing) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => apiClient(originalRequest));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         await refreshClient.get("/auth/refresh-token");

//         failedQueue.forEach(({ resolve }) => resolve());
//         failedQueue = [];

//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         failedQueue.forEach(({ reject }) => reject(refreshError));
//         failedQueue = [];

//         window.location.href = "/auth/login";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export { apiClient };

import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: `${backendUrl}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: `${backendUrl}/api/v1`,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

apiClient.interceptors.request.use(
  (config) => {
    console.log("Request URL:", `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("Response Error:", error);

    if (
      error?.response?.status === 401 &&
      error.response.data?.message === "ACCESS_TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshClient.get("/auth/refresh-token");

        failedQueue.forEach(({ resolve }) => resolve());
        failedQueue = [];

        return apiClient(originalRequest);
      } catch (refreshError) {
        failedQueue.forEach(({ reject }) => reject(refreshError));
        failedQueue = [];

        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };