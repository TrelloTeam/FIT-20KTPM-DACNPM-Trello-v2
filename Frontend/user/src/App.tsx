import { Provider } from 'react-redux'
import { store } from './store'
import { Outlet } from 'react-router'
import Header from './components/Header'
import { ThemeProvider } from './components/Theme/themeContext'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <div style={{ paddingTop: '50px' }}>
          <Outlet />
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default App
