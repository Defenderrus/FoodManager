import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.tsx'
import Error from './pages/Error.tsx'
import Info from './pages/Info.tsx'
import Analytics from './pages/Analytics.tsx'
import Charts from './pages/Charts.tsx'
import Other from './pages/Other.tsx'
import Theme from './pages/Theme.tsx'
import Language from './pages/Language.tsx'
import Security from './pages/Security.tsx'


const router = createBrowserRouter([
  {
    path: "/account",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/account/info",
        element: <Info />,
      },
      {
        path: "/account/analytics",
        element: <Analytics />,
      },
      {
        path: "/account/charts",
        element: <Charts />,
      },
      {
        path: "/account/other",
        element: <Other />,
      },
      {
        path: "/account/theme",
        element: <Theme />,
      },
      {
        path: "/account/language",
        element: <Language />,
      },
      {
        path: "/account/security",
        element: <Security />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
