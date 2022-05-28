import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { initializeFirebase } from './firebase'
import './App.css'
import { Loading } from './loading';

export function App() {
  const { auth } = initializeFirebase();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setInitialized(false);

      if (user) {
        // Do sth
      } else {
        // User is signed out
      }
    });
  }, []);

  return (
    <div className="initializing">
      <Loading />
    </div>
  );
}
