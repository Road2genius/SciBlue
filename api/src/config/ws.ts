import { io } from "../server";

export const setupSocketConnection = () => {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {});
  });
};
