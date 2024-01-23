import { createContext, PropsWithChildren, useState } from 'react'

import { Alert, AlertColor, Snackbar } from '@mui/material'

interface ToastProps {
  message: string
  status: AlertColor
}

export interface ToastContextProps {
  (data: ToastProps): void
}

const defaultValue: ToastContextProps = () => null

export const ToastContext = createContext<ToastContextProps>(defaultValue)

export function ToastProvider({ children }: PropsWithChildren) {
  const [toastData, setToastData] = useState<ToastProps | null>(null)
  const toast = (data: ToastProps) => setToastData(data)
  const onClose = () => setToastData(null)

  return (
    <ToastContext.Provider value={toast}>
      {toastData && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={true}
          autoHideDuration={4000}
          onClose={onClose}
        >
          <Alert severity={toastData?.status} sx={{ width: '100%' }} onClose={onClose}>
            {toastData?.message}
          </Alert>
        </Snackbar>
      )}
      {children}
    </ToastContext.Provider>
  )
}
