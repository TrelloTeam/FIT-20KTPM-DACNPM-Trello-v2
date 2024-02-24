import { Provider } from 'react-redux'

import { HomePage } from './pages'
import { ToastProvider } from './providers'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    </Provider>
  )
}

export default App
