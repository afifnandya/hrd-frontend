import { TOAST_TIMEOUT } from '@/constants'
import { useToast } from 'primevue/usetoast'

function createToast() {
  const toastInstance = useToast()
  const toast = {
    error: (title: string, message?: string) => {
      toastInstance.add({
        severity: 'error',
        detail: title,
        summary: message,
        life: TOAST_TIMEOUT
      })
    },
    success: (title: string, message?: string) => {
      toastInstance.add({
        severity: 'success',
        detail: title,
        summary: message,
        life: TOAST_TIMEOUT
      })
    }
  }
  return toast
}

export default createToast
