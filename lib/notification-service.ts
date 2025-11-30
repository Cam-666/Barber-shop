export interface Toast {
  id: string
  type: "success" | "error" | "info" | "warning"
  message: string
  duration?: number
}

// Store for managing toasts (can be replaced with proper state management)
const toasts: Toast[] = []
const listeners: ((toasts: Toast[]) => void)[] = []

export function subscribe(listener: (toasts: Toast[]) => void) {
  listeners.push(listener)
  return () => {
    listeners.splice(listeners.indexOf(listener), 1)
  }
}

function notifyListeners() {
  listeners.forEach((listener) => listener([...toasts]))
}

export function addToast(toast: Omit<Toast, "id">) {
  const id = `toast-${Date.now()}`
  const newToast: Toast = { ...toast, id, duration: toast.duration || 4000 }

  toasts.push(newToast)
  notifyListeners()

  if (newToast.duration) {
    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)
  }

  return id
}

export function removeToast(id: string) {
  const index = toasts.findIndex((t) => t.id === id)
  if (index !== -1) {
    toasts.splice(index, 1)
    notifyListeners()
  }
}

export function showSuccess(message: string, duration?: number) {
  return addToast({ type: "success", message, duration })
}

export function showError(message: string, duration?: number) {
  return addToast({ type: "error", message, duration })
}

export function showInfo(message: string, duration?: number) {
  return addToast({ type: "info", message, duration })
}

export function showWarning(message: string, duration?: number) {
  return addToast({ type: "warning", message, duration })
}
