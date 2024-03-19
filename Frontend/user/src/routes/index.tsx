import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomePage from '~/pages/Home'
import { Profile } from './../pages/Profile/components/Profile'
import { Templates } from './../pages/Templates/index'
import { BoardsPage } from '~/pages'
import { ActivityComponent } from './../pages/Profile/components/Activity'
import { WorkspaceBoardsPage } from '~/pages/WorkspaceBoardsPage'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/template',
        element: <Templates />
      },
      {
        path: '/board',
        element: <BoardsPage />
      },
      {
        path: '/activity',
        element: <ActivityComponent />
      },
      {
        path: '/workspaceboard',
        element: <WorkspaceBoardsPage />
      }
    ]
  }
])
