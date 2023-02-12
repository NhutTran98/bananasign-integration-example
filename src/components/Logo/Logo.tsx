import { useRouter } from 'next/navigation'
import './Logo.scss';

export default function Logo() {
  const router = useRouter();
  return (
    <div style={{ cursor: 'pointer' }} className="Logo" onClick={() => router.push('/documents')}>
      <img src="/assets/app-icon.svg" alt="logo" />
      <span className="Logo__name">PropertyPal</span>
    </div>
  );
}