import { useTelegram } from '../contexts/TelegramContext'
import { clsx } from 'clsx'

export function ToastContainer() {
  const { toasts } = useTelegram()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'fa-check-circle'
      case 'error':
        return 'fa-exclamation-circle'
      case 'warning':
        return 'fa-exclamation-triangle'
      default:
        return 'fa-info-circle'
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-500'
      case 'error':
        return 'text-red-500'
      case 'warning':
        return 'text-yellow-500'
      default:
        return 'text-[color:var(--tg-blue)]'
    }
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100000] flex flex-col gap-2.5 pointer-events-none w-full max-w-[90vw] sm:max-w-[400px]">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-[color:var(--tg-bg)] shadow-[0_4px_16px_var(--tg-shadow)] rounded-xl px-4 py-3 w-full animate-toast-up pointer-events-auto mx-4 sm:mx-auto"
        >
          <i className={clsx('fas text-xl', getIcon(toast.type), getColor(toast.type))}></i>
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-[color:var(--tg-text-primary)]">
              {toast.title}
            </div>
            {toast.message && (
              <div className="text-[13px] text-[color:var(--tg-text-secondary)] mt-0.5">
                {toast.message}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
