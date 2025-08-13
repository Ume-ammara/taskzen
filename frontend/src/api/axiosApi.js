// import axios from "axios"; 

// const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// const apiClient = axios.create({
//   baseURL: `${backendUrl}/api/v1`,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// const refreshClient = axios.create({
//   baseURL: `${backendUrl}/api/v1`,
//   withCredentials: true,
// });

// axiosApi.interceptors.request.use(
//   (config) => {
//     console.log("request config.url :", config.url);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const status = error?.response?.status;
//     const message = error?.response?.data?.message;
//     const originalRequest = error.config;

//     const isTokenExpired =
//       status === 401 &&
//       message === "Access token expired" &&
//       !originalRequest._retry;

//     if (isTokenExpired) {
//       originalRequest._retry = true;

//       try {
//         await refreshClient.post("/auth/refresh-token");
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         window.location.href = "/auth/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error); 
//   }
// );

// export { apiClient  };


import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

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

let failedRequests = [];
let isRefreshing = false;

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log("Request URL:", `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;
    const originalRequest = error.config;

    const isTokenExpired =
      status === 401 &&
      message === "Access token expired" &&
      !originalRequest._retry;

    if (isTokenExpired) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await refreshClient.post("/auth/refresh-token");

          failedRequests.forEach((cb) => cb());
          failedRequests = [];
        } catch (refreshError) {
          failedRequests = [];
          window.location.href = "/auth/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        failedRequests.push(() => {
          resolve(apiClient(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export { apiClient };
