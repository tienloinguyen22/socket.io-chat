import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { auth } from '../firebase';
import { initializeSocket } from '../socket';

const SocketContext = React.createContext<Socket | undefined>(undefined);

export const useSocket = (): Socket | undefined => {
  return useContext(SocketContext)
};

export const SocketContextProvider = (props: { children?: any }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSocket(initializeSocket());
      }
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};