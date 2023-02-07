import './Logo.scss';

export default function Logo() {
  return (
    <div className="Logo">
      <img src="/assets/app-icon.svg" alt="logo" />
      <span className="Logo__name">PropertyPal</span>
    </div>
  );
}