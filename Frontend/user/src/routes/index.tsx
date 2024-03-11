import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomePage from '~/pages/Home'
import { Templates } from './../pages/Templates/index'
import { AccountManagement, Board, BoardsPage } from '~/pages'
import { ActivityComponent } from './../pages/Profile/components/Activity'
import CardDetailWindow from '~/components/CardDetailWindow'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/profile/:id',
        element: <AccountManagement page={`profile`} />
      },
      {
        path: '/template',
        element: <Templates />
      },
      {
        path: '/workspace/:workspaceId',
        element: <BoardsPage />
      },
      {
        path: '/activity',
        element: <ActivityComponent />
      },
      {
        path: '/carddetail',
        element: <CardDetailWindow />
      },
      {
        path: '/board/:id',
        element: <Board />
      }
    ]
  }
])
