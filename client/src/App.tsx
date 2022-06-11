import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth';
import { Loading } from './loading';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Auth } from './auth';
import { Chat } from './chat';
import { auth } from './firebase';
import { CurrentUserContextProvider, SocketContextProvider } from './context';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/chat');
      } else {
        navigate('/auth');
      }
      setInitialized(true);
    });
  }, []);

  return (
    <CurrentUserContextProvider>
      <SocketContextProvider>
        {initialized ? (
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
        )}
        <ToastContainer />
      </SocketContextProvider>
    </CurrentUserContextProvider>
  );
}
