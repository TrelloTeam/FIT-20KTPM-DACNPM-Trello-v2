import { Provider } from 'react-redux'

import { HomePage, Templates } from './pages'
import { ToastProvider } from './providers'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Templates />
      </ToastProvider>
    </Provider>
  )
}

export default App
