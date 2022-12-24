import { TOAST_TIMEOUT } from '@/constants'
import Toastify from 'toastify-js'

function createToast() {
  const toast = {
    error: (title: string, message?: string) => {
      Toastify({
        text: `${title} ${message || ''}`,
        duration: TOAST_TIMEOUT,
        newWindow: true,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: '#dc2626'
        }
      }).showToast()
    },
    success: (title: string, message?: string) => {
      Toastify({
        text: `${title} ${message || ''}`,
        duration: TOAST_TIMEOUT,
        newWindow: true,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: '#22c55e'
        }
      }).showToast()
    }
  }
  return toast
}

export default createToast
