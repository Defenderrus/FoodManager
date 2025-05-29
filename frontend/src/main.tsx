import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import App from './App'
import Error from './pages/Error'
import Auth from './pages/Auth'
import RequireAuth from "./RequireAuth";
import Info from './pages/Info'
import Analytics from './pages/Analytics'
import Charts from './pages/Charts'
import Other from './pages/Other'
import Language from './pages/Language'
import Security from './pages/Security'
import { UserProvider } from './pages/UserContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme='dark'>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={<Error />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<App />}>
                <Route path="account/info" element={<Info />}/>
                <Route path="account/analytics" element={<Analytics />}/>
                <Route path="account/charts" element={<Charts />}/>
                <Route path="account/other" element={<Other />}/>
                <Route path="account/language" element={<Language />}/>
                <Route path="account/security" element={<Security />}/>
              </Route>
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
)
