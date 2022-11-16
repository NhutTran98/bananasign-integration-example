import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import auth from '../auth';

export default function Login({ setData }) {
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem('data'))) {
      router.push('/');
    }
  }, []);
  
  const setLogoin = async () => {
    const authIns = await auth();
    const loginHandler = async (err, { data: code }) => {
      if (err) {
        setError(err.message);
        return;
      }
      const res = await fetch('/bananasign-integration-example/api/auth-lumin', {
        method: 'POST',
        body: JSON.stringify({
          authorizationCode: code,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setData(data);
      localStorage.setItem('data', JSON.stringify(data));
      authIns.off('login', loginHandler);
      router.push('/');
    }
    authIns.on('login', loginHandler)
    authIns.login('lumin');
  }
  return (
    <div>
       <button className="AppButton" onClick={setLogoin}>Login with Lumin</button>
       { error && <p>{error}</p> }
    </div>
  );
}