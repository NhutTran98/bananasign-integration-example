'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Verify() {
  const router = useRouter();

  useEffect(() => {
    const parsedHash = new URLSearchParams(
      window.location.hash.substring(1)
    );
    const access_token = parsedHash.get('access_token');
    const id_token = parsedHash.get('id_token');

    if (access_token && id_token) {
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('id_token', id_token);
      router.push('/documents');
    } else {
      router.push('/auth/signin');
    }
  }, []);
  return (
    <div></div>
  )
}
