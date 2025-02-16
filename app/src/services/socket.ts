import { io, Socket } from 'socket.io-client';

export const connectSocket = (socket: Socket) => {
  if (!socket) {
    socket = io(`${import.meta.env.VITE_API_URL}`, { withCredentials: true, autoConnect: false });
  }
};

export const disconnectSocket = (socket: Socket) => {
  if (socket) {
    socket.disconnect();
  }
};
