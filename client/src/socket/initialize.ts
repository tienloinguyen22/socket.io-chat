import { io, Socket } from "socket.io-client";

type SocketOptions = {
  server?: string;
  authToken?: string;
};

const socketConnections = new Map<string, Socket>();

export const initializeSocket = (options: SocketOptions = {}): Socket => {
  const serverUrl = options.server || "ws://localhost:3001";
  const existedSocketConnection = socketConnections.get(serverUrl);
  if (existedSocketConnection) {
    return existedSocketConnection;
  }

  const newSocketConnection = io(serverUrl, {
    extraHeaders: {
      authorization: options.authToken || '',
    },
  });
  newSocketConnection.on("disconnect", (reason) => {
    console.log(`Socket disconnect "${reason}"`);
    socketConnections.delete(serverUrl);
  });
  socketConnections.set(serverUrl, newSocketConnection);
  return newSocketConnection;
};