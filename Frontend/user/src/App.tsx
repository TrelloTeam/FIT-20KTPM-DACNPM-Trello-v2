import { Provider } from 'react-redux'
import { store } from './store'
import { Outlet } from 'react-router'
import Header from './components/Header'
import { AccountManagement } from './pages'

function App() {
  return (
    <Provider store={store}>
      {/* <Header /> */}
      <AccountManagement/>
    </Provider>
  )
}

export default App
