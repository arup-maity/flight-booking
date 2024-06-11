import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const axiosInstance = axios.create({
   baseURL: apiUrl,
   withCredentials: true
});
export const adminInstance = axios.create({
   baseURL: apiUrl + "/admin",
   withCredentials: true
});
export const authInstance = axios.create({
   baseURL: apiUrl + "/auth",
   withCredentials: true
});
export const flightInstance = axios.create({
   baseURL: apiUrl + "/flight",
   withCredentials: true
});