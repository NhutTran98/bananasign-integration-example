import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";

import auth from '../auth';
import '../styles/App.css'

function MyApp({ Component, pageProps }) {
  const [data, setData] = useState({});
  const router = useRouter();
  useEffect(() => {
    const localData = JSON.parse(window.localStorage.getItem('data'));
    if (localData) {
      setData(localData);
    } 
  }, []);

  const logout = async () => {
    const authIns = await auth();
    const logoutHandler = (err) => {
      // return error when logout, receive error which mean logout lumin service success
      if (err) {
        setData({});
        localStorage.removeItem('data');
        router.push('/login');
      }
      authIns.off('logout', logoutHandler)
    }
    authIns.on('logout', logoutHandler)
    authIns.logout('lumin');
  }

  return (
    <div className="App" style={{ overflow: 'hidden' }}>
      <h1>Lumin 3rd Party Integrate</h1>
      <h2>Third party integrate demo app</h2>
      <Component data={data} setData={setData} {...pageProps} />
      { data.accessToken && <button className="AppButton" style={{ marginTop: 10 }} onClick={logout}>Logout</button> }
    </div>
  )
}

export default MyApp
