import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    Authorization: `Bearer ${sessionStorage.getItem("your_jwt_secret_key")}`,
  },
});

export default socket;
