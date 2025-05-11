import axios from "axios";

export const axiosInstance: any = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:11000/api" : "/api",
  withCredentials: true,
});



