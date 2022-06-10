import { io, Socket } from "socket.io-client";

const socketConnections = new Map<string, Socket>();

export const initializeSocket = (server?: string): Socket => {
  const serverUrl = server || "ws://localhost:3001";
  const existedSocketConnection = socketConnections.get(serverUrl);
  if (existedSocketConnection) {
    return existedSocketConnection;
  }

  const newSocketConnection = io(serverUrl);
  socketConnections.set(serverUrl, newSocketConnection);
  return newSocketConnection;
};