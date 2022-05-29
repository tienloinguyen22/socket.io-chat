import React, { useState } from 'react';
import { Button } from '@chatscope/chat-ui-kit-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import './Auth.css';
import { auth } from '../firebase';
import { apiService } from '../axios';

export const Auth = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const continueWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const signInResult = await signInWithPopup(auth, provider)
      const idToken = await signInResult.user.getIdToken();
      await apiService.authenticate({ idToken });
    } catch (error: any) {
      console.log('🚀 ~ file: Auth.tsx ~ line 20 ~ continueWithGoogle ~ error', error);

      if (error.code) {
        if (error.code !== 'auth/popup-closed-by-user') {
          toast(error.code);
        }
      } else {
        toast(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth'>
      <Button border disabled={loading} onClick={continueWithGoogle}>Continue with Google</Button>
    </div>
  );
};