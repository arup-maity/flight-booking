import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const axiosInstance = axios.create({
   baseURL: apiUrl + '/api',
   withCredentials: true
});
export const adminInstance = axios.create({
   baseURL: apiUrl + "/api/admin",
   withCredentials: true
});
export const authInstance = axios.create({
   baseURL: apiUrl + "/api/auth",
   withCredentials: true
});
export const flightInstance = axios.create({
   baseURL: apiUrl + "/api/flight",
   withCredentials: true
});