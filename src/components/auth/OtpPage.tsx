import { useState, useEffect, useRef } from 'react'

interface OtpPageProps {
  phoneNumber: string
  onOtpSubmit: (otp: string) => void
  onBack: () => void
}

export function OtpPage({ phoneNumber, onOtpSubmit, onBack }: OtpPageProps) {
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    const numValue = value.replace(/\D/g, '').slice(0, 1)

    const newOtp = [...otp]
    newOtp[index] = numValue
    setOtp(newOtp)

    // Auto-focus next input
    if (numValue && index < 4 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }

    // Submit if all digits filled
    if (newOtp.every(digit => digit !== '')) {
      onOtpSubmit(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5)

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus the next empty input or the last one
    const nextEmpty = newOtp.findIndex(digit => digit === '')
    if (nextEmpty !== -1) {
      inputRefs.current[nextEmpty]?.focus()
    } else if (newOtp.every(digit => digit !== '')) {
      inputRefs.current[4]?.focus()
      onOtpSubmit(newOtp.join(''))
    }
  }

  const isComplete = otp.every(digit => digit !== '')

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer mb-6 hover:text-[var(--tg-text-primary)] transition-colors"
        >
          <i className="fas fa-arrow-left text-xl"></i>
        </button>

        {/* Title */}
        <h1 className="text-[28px] font-semibold text-[var(--tg-text-primary)] mb-2">
          Enter your code
        </h1>
        <p className="text-[var(--tg-text-secondary)] mb-8">
          We've sent a code to <span className="text-[var(--tg-text-primary)] font-medium">{phoneNumber}</span>
        </p>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-8">
          {[0, 1, 2, 3, 4].map((index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-14 h-14 text-center text-2xl font-semibold bg-[color:var(--tg-bg-secondary)] border-2 rounded-xl outline-none transition-colors ${
                otp[index]
                  ? 'border-[color:var(--tg-blue)] text-[var(--tg-text-primary)]'
                  : 'border-[color:var(--tg-border)] text-[var(--tg-text-primary)]'
              }`}
            />
          ))}
        </div>

        {/* Timer / Resend */}
        <div className="text-center mb-6">
          {timeLeft > 0 ? (
            <p className="text-[13px] text-[var(--tg-text-secondary)]">
              Resend code in <span className="text-[var(--tg-blue)] font-medium">{timeLeft}s</span>
            </p>
          ) : (
            <button
              onClick={() => {
                setTimeLeft(60)
                setOtp(['', '', '', '', ''])
                inputRefs.current[0]?.focus()
              }}
              className="text-[var(--tg-blue)] text-[14px] font-medium hover:underline"
            >
              Resend code
            </button>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={() => isComplete && onOtpSubmit(otp.join(''))}
          disabled={!isComplete}
          className={`w-full py-3 rounded-lg font-semibold text-[15px] transition-colors ${
            isComplete
              ? 'bg-[color:var(--tg-blue)] text-white cursor-pointer hover:bg-[color:var(--tg-blue-dark)]'
              : 'bg-[color:var(--tg-bg-secondary)] text-[var(--tg-text-tertiary)] cursor-not-allowed'
          }`}
        >
          Verify
        </button>

        {/* Help Link */}
        <div className="mt-6 text-center">
          <button className="text-[var(--tg-blue)] text-[14px] font-medium hover:underline">
            <i className="fas fa-question-circle mr-2"></i>
            Didn't receive the code?
          </button>
        </div>
      </div>
    </div>
  )
}
