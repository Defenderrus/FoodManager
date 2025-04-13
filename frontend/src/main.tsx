import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import App from './App.tsx'
import Error from './pages/Error.tsx'
import Auth from './pages/Auth.tsx'
import RequireAuth from "./RequireAuth";
import Info from './pages/Info.tsx'
import Analytics from './pages/Analytics.tsx'
import Charts from './pages/Charts.tsx'
import Other from './pages/Other.tsx'
import Language from './pages/Language.tsx'
import Security from './pages/Security.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme='dark'>
      <BrowserRouter>
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={<Error />} />
            <Route path="/" element={<App />}>
            <Route
              path="account/info"
              element={
                <RequireAuth>
                  <Info />
                </RequireAuth>
              }
            />
            <Route
              path="account/analytics"
              element={
                <RequireAuth>
                  <Analytics />
                </RequireAuth>
              }
            />
            <Route
              path="account/charts"
              element={
                <RequireAuth>
                  <Charts />
                </RequireAuth>
              }
            />
            <Route
              path="account/other"
              element={
                <RequireAuth>
                  <Other />
                </RequireAuth>
              }
            />
            <Route
              path="account/language"
              element={
                <RequireAuth>
                  <Language />
                </RequireAuth>
              }
            />
            <Route
              path="account/security"
              element={
                <RequireAuth>
                  <Security />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
)
