import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomePage from '~/pages/Home'
import { Templates } from './../pages/Templates/index'
import { AccountManagement, Board, BoardsPage } from '~/pages'
import CardDetailWindow from '~/components/CardDetailWindow'
import { CategoryWorkspace } from '~/pages/CategoryWorkspace'
import PageMembers from '~/pages/Members'
import Login from '~/pages/Login'
import { WorkspaceSetting } from '~/pages/WorkspaceSetting'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <BoardsPage />
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
        element: <CategoryWorkspace />
      },
      {
        path: '/board/:id?',
        element: <BoardsPage />
      },
      {
        path: '/activity/:id',
        element: <AccountManagement page={`activity`} />
      },
      {
        path: '/carddetail',
        element: <CardDetailWindow />
      },
      {
        path: '/cardlist',
        element: <Board />
      },
      {
        path: '/workspace/:workspaceId/members',
        element: <PageMembers />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/workspaceSetting',
        element: <WorkspaceSetting />
      }
    ]
  }
])
