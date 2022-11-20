import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Edit from '../pages/Edit'
import Final from '../pages/Final'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'edit',
          element: <Edit />
        },
        {
          path: 'final',
          element: <Final />
        }
      ]
    }
  ],
  { basename: '/thef2e-2022-pdf-signing' }
)
