import { Provider } from 'react-redux'

import { HomePage, Board } from './pages'
import { ToastProvider } from './providers'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Board />
      </ToastProvider>
    </Provider>
  )
}

export default App
