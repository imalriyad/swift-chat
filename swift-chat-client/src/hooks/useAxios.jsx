import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://swift-chat-server.onrender.com/api/v1",
  withCredentials: true,
});

const useAxios = () => {
  return instance;
};

export default useAxios;
