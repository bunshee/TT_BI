import axios, { AxiosResponse } from "axios";
import { Auth, User } from "../../redux/models/models";

const url = "http://127.0.0.1:3080";

const login = async (user: {
  email: string;
  password: string;
}): Promise<AxiosResponse<Auth>> => {
  return axios.post(`${url}/login`, user);
};

const register = async (user: User): Promise<AxiosResponse<Auth>> => {
  return axios.post(`${url}/register`, user);
};

const getUsers = async (): Promise<AxiosResponse<User[]>> => {
  return axios.get(`${url}/users`);
};

const deleteUser = async (email: string): Promise<AxiosResponse<User>> => {
  return axios.delete(`${url}/user/${email}`);
};

const updateUser = async (user: User): Promise<AxiosResponse<User>> => {
  return axios.put(`${url}/user/${user.email}`, user);
};

const uploadFile = async (formData: FormData): Promise<AxiosResponse> => {
  return axios.post(`${url}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getColumns = async (): Promise<AxiosResponse<string[]>> => {
  return axios.get(`${url}/columns`);
};

const getData = async (): Promise<AxiosResponse> => {
  return axios.get(`${url}/data`);
};

const deleteData = async (): Promise<AxiosResponse> => {
  return axios.delete(`${url}/data`);
};

const getOccuuranceTotal = async (): Promise<AxiosResponse> => {
  return axios.get(`${url}/occuranceTotal`);
};

export {
  login,
  register,
  getUsers,
  deleteUser,
  updateUser,
  uploadFile,
  getColumns,
  getData,
  deleteData,
  getOccuuranceTotal,
};
