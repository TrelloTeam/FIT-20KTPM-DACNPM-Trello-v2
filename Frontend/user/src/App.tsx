import { Provider } from 'react-redux'
import { store } from './store'
import { Outlet } from 'react-router'
import Header from './components/Header'

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div style={{ paddingTop: '50px' }}>
        <Outlet />
      </div>
    </Provider>
  )
}

export default App
