import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'

export function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const register = useAuthStore((state) => state.register)
  const setAuthMode = useAuthStore((state) => state.setAuthMode)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!firstName.trim() || !lastName.trim() || !username.trim() || !password.trim()) {
      setError('Please fill in all required fields')
      return
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const success = register(firstName, lastName, username, password)
    if (!success) {
      setError('Username already exists')
    }
  }

  const isValid =
    firstName.trim() &&
    lastName.trim() &&
    username.trim() &&
    username.length >= 3 &&
    password.trim() &&
    password.length >= 6 &&
    password === confirmPassword

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[color:var(--tg-blue)] rounded-full flex items-center justify-center">
            <i className="fab fa-telegram text-white text-4xl"></i>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[26px] font-semibold text-center text-[var(--tg-text-primary)] mb-2">
          Create your account
        </h1>
        <p className="text-center text-[var(--tg-text-secondary)] mb-6">
          Join Telegram to start messaging.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-[13px] text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name *"
              autoComplete="given-name"
              className={`w-full px-4 py-3 bg-[color:var(--tg-bg-secondary)] border rounded-lg text-[15px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] outline-none transition-colors ${
                firstName ? 'border-[color:var(--tg-blue)]' : 'border-[color:var(--tg-border)]'
              }`}
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name *"
              autoComplete="family-name"
              className={`w-full px-4 py-3 bg-[color:var(--tg-bg-secondary)] border rounded-lg text-[15px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] outline-none transition-colors ${
                lastName ? 'border-[color:var(--tg-blue)]' : 'border-[color:var(--tg-border)]'
              }`}
            />
          </div>

          {/* Username */}
          <div className="mb-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              placeholder="Username *"
              autoComplete="username"
              className={`w-full px-4 py-3 bg-[color:var(--tg-bg-secondary)] border rounded-lg text-[15px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] outline-none transition-colors ${
                username && username.length >= 3
                  ? 'border-[color:var(--tg-blue)]'
                  : 'border-[color:var(--tg-border)]'
              }`}
            />
            {username && username.length > 0 && username.length < 3 && (
              <p className="text-[11px] text-[var(--tg-text-tertiary)] mt-1">Username must be at least 3 characters</p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password *"
              autoComplete="new-password"
              className={`w-full px-4 py-3 bg-[color:var(--tg-bg-secondary)] border rounded-lg text-[15px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] outline-none transition-colors pr-12 ${
                password && password.length >= 6
                  ? 'border-[color:var(--tg-blue)]'
                  : 'border-[color:var(--tg-border)]'
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

          {/* Confirm Password */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password *"
              autoComplete="new-password"
              className={`w-full px-4 py-3 bg-[color:var(--tg-bg-secondary)] border rounded-lg text-[15px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] outline-none transition-colors pr-12 ${
                confirmPassword && confirmPassword === password && password.length >= 6
                  ? 'border-[color:var(--tg-blue)]'
                  : confirmPassword && confirmPassword !== password
                  ? 'border-red-500'
                  : 'border-[color:var(--tg-border)]'
              }`}
            />
            {confirmPassword && (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-[var(--tg-text-tertiary)] cursor-pointer hover:text-[var(--tg-text-secondary)]"
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            )}
            {confirmPassword && confirmPassword !== password && (
              <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-lg font-semibold text-[15px] transition-colors ${
              isValid
                ? 'bg-[color:var(--tg-blue)] text-white cursor-pointer hover:bg-[color:var(--tg-blue-dark)]'
                : 'bg-[color:var(--tg-bg-secondary)] text-[var(--tg-text-tertiary)] cursor-not-allowed'
            }`}
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-[var(--tg-text-secondary)] text-[14px]">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="text-[var(--tg-blue)] font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
