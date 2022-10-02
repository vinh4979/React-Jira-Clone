import { ThemeProvider } from '@emotion/react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme, CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout'
import Board from './pages/Board'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AppLayout from './components/layout/AppLayout'
import { useSelector } from 'react-redux'
import Main from './components/common/Main'

function App() {
  const { modeSystem } = useSelector(state => state.stateReducer)
  const theme = createTheme({
    palette: { mode: !modeSystem ? 'light' : 'dark' }
  })
  console.log('defaut theme:', theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="boards" element={<Home />} />
            <Route path="boards/:boardId" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
