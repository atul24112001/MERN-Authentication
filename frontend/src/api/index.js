import axios from "axios";

const url = "http://localhost:5000"

// export const GetChats = async () => await axios.get(`${url}/chats`);
export const AxiosSingup = async (data, config) => await axios.post(`${url}/api/user`, data, config);
export const AxiosLogin = async (data, config) => await axios.post(`${url}/api/user/login`, data, config);