import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const login = useAuthStore((state) => state.login)
  const setAuthMode = useAuthStore((state) => state.setAuthMode)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }

    const success = login(username, password)
    if (!success) {
      setError('Invalid username or password')
    }
  }

  const isValid = username.trim() && password.trim()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[color:var(--tg-blue)] rounded-full flex items-center justify-center">
            <i className="fab fa-telegram text-white text-5xl"></i>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-semibold text-center text-[var(--tg-text-primary)] mb-2">
          Sign in to Telegram
        </h1>
        <p className="text-center text-[var(--tg-text-secondary)] mb-8">
          Please enter your username and password.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-[13px] text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              className={`w-full px-4 py-3 bg-[color:var(--tg-bg-secondary)] border rounded-lg text-[15px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] outline-none transition-colors ${
                username ? 'border-[color:var(--tg-blue)]' : 'border-[color:var(--tg-border)]'
              }`}
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className={`w-full px-4 py-3 bg-[color:var(--tg-bg-secondary)] border rounded-lg text-[15px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] outline-none transition-colors pr-12 ${
                password ? 'border-[color:var(--tg-blue)]' : 'border-[color:var(--tg-border)]'
              }`}
            />
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-[var(--tg-text-tertiary)] cursor-pointer hover:text-[var(--tg-text-secondary)]"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            )}
          </div>

          {/* Forgot Password */}
          <div className="mb-6 text-right">
            <button type="button" className="text-[var(--tg-blue)] text-[13px] hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-lg font-semibold text-[15px] transition-colors ${
              isValid
                ? 'bg-[color:var(--tg-blue)] text-white cursor-pointer hover:bg-[color:var(--tg-blue-dark)]'
                : 'bg-[color:var(--tg-bg-secondary)] text-[var(--tg-text-tertiary)] cursor-not-allowed'
            }`}
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-[var(--tg-text-secondary)] text-[14px]">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className="text-[var(--tg-blue)] font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
