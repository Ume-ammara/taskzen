// import axios from "axios";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// const apiClient = axios.create({
//   baseURL: `${BACKEND_URL}/api/v1`,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error?.response?.data?.message === "ACCESS_TOKEN_EXPIRED") {
//       const originalRequest = error.config;

//       if (originalRequest._retry) {
//         return Promise.reject(error);
//       }

//       originalRequest._retry = true;
//       try {
//         await apiClient.post("/auth/refresh");
//         return apiClient(originalRequest);
//       } catch (error) {
//         window.location.href = "/auth/login";
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export { apiClient };

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.data?.message === "ACCESS_TOKEN_EXPIRED") {
      const originalRequest = error.config;

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      try {
        await apiClient.post("/auth/refresh");
        return apiClient(originalRequest);
      } catch (refreshError) {
        // ✅ Only redirect if NOT on auth pages
        const authRoutes = ["/auth/login", "/auth/signup", "/auth/verify"];
        const isAuthPage = authRoutes.some((route) =>
          window.location.pathname.startsWith(route),
        );

        if (!isAuthPage) {
          window.location.href = "/auth/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { apiClient };
