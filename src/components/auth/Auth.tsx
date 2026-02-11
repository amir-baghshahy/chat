import { useAuthStore } from '../../store/authStore'
import { LoginPage } from './LoginPage'
import { RegisterPage } from './RegisterPage'

export function Auth() {
  const authMode = useAuthStore((state) => state.authMode)

  return (
    <div className="min-h-screen bg-[color:var(--tg-bg)]">
      {authMode === 'login' && <LoginPage />}
      {authMode === 'register' && <RegisterPage />}
    </div>
  )
}
