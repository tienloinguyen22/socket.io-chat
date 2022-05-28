import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth';
import { initializeFirebase } from './firebase'
import { Loading } from './loading';
import { useNavigate, Routes, Route } from "react-router-dom";
import { Auth } from './auth';
import { Chat } from './chat';

export function App() {
  const { auth } = initializeFirebase();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setInitialized(true);

      if (user) {
        setCurrentUser(user);
        navigate('/chat');
      } else {
        navigate('/auth');
      }
    });
  }, []);

  return (
    <>{initialized ? (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={
          <div>
            Not Found
          </div>
        } />
      </Routes>
    ) : (
      <Loading />
    )}</>
  );
}
