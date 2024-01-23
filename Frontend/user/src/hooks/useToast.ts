import { useContext } from 'react'
import { ToastContext } from '~/providers'

export function useToast() {
  return useContext(ToastContext)
}
