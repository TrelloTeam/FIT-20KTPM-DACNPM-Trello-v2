import { Provider } from 'react-redux'

import { HomePage, Board, AccountManagement } from './pages'
import { ToastProvider } from './providers'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <AccountManagement />
      </ToastProvider>
    </Provider>
  )
}

export default App
