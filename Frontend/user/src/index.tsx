import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain='dev-c6gupwgleqny83mz.us.auth0.com'
    clientId='t1z0u9bL0VZvCbylMUAtA88NpalXKUTb'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Auth0Provider>
)
