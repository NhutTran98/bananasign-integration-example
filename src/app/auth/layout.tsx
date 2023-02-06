import Logo from '@shared/Logo';
import './auth.scss';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="Auth__Header">
          <Logo />
        </div>
        {children}</body>
    </html>
  )
}
