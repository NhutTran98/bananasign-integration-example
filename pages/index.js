import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
import BananasignWidget from '@bananasign/integrate';

function AppTest({ token }) {
  const [file, setFile] = useState(null);
  const inputFile = useRef(null) 

  const closeWidget = () => {
    inputFile.current.value = '';
    setFile(null);
  }

  const onPick = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }

  const onClick = () => {
   inputFile.current.click();
  };

  const signers = [];
  const viewers = [{email: 'example4@gmail.com', name: 'example 4'}];

  return (
    <div>
      <input style={{ display: 'none' }} type="file" accept="application/pdf" ref={inputFile} onChange={onPick} />
      <button className="AppButton" onClick={onClick}>Start flow</button>
      <BananasignWidget
        isOpen={Boolean(file)}
        onClose={closeWidget}
        signers={signers}
        viewers={viewers}
        fileName={file?.name}
        bananasignUrl={process.env.NEXT_PUBLIC_BANANASIGN_WEB_URL} // For development only
        bananasignBaseUrl={process.env.NEXT_PUBLIC_BANANASIGN_END_POINT_URL} // For development only
        fileData={file}
        accessToken={token}
      />
    </div>
  );
}

export default function Info({ data }) {
  const router = useRouter();

  useEffect(() => {
    if (!data.accessToken) {
      router.push('/login');
    }
  }, []);
  return (
    <div>
      <h2 style={{ lineBreak: 'anywhere' }}>Access Token: {data.accessToken}</h2>
      <h2>Email: {data.email}</h2>
      <AppTest token={data.accessToken}/>
    </div>
  );
}