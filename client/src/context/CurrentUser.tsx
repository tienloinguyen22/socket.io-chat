import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const CurrentUserContext = React.createContext<User | undefined>(undefined);

export const useCurrentUser = (): User | undefined => {
  return useContext(CurrentUserContext)
};

export const CurrentUserContextProvider = (props: { children?: any }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || undefined);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};