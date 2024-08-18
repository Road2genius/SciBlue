import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
  extraHeaders: {
    Authorization: `Bearer ${sessionStorage.getItem("your_jwt_secret_key")}`,
  },
});

export default socket;
