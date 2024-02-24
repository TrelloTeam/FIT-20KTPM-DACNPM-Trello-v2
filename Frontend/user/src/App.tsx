import { Provider } from 'react-redux'

import { BoardsPage, HomePage } from './pages'
import { ToastProvider } from './providers'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <BoardsPage />
      </ToastProvider>
    </Provider>
  )
}

export default App
