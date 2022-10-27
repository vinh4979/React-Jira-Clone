import { ThemeProvider } from '@emotion/react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme, CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AppLayout from './components/layout/AppLayout'
import { useSelector } from 'react-redux'
import CreateProject from './pages/CreateProject'
import CreateTask from './components/common/CreateTask'
import MyProject from './pages/MyProject'
import ProjectDetail from './pages/ProjectDetail'
import TaskDetail from './pages/TaskDetail'
import CreateProject2 from './pages/CreateProject2'
import EditProjectLayout from './components/layout/EditProjectLayout'
import EditTask from './components/layout/EditTask'
import TableProject from './components/common/TableProject'

function App() {
  const { modeSystem } = useSelector(state => state.stateReducer)
  const theme = createTheme({
    palette: { mode: !modeSystem ? 'light' : 'dark' }
  })

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
            <Route index element={<MyProject />} />
            <Route path="project" element={<TableProject />} />
            <Route path="my-project" element={<MyProject />} />
            <Route path="project/:id" element={<ProjectDetail />} />
            <Route path="task/:id" element={<TaskDetail />} />
            <Route path="edit-task/:id" element={<EditTask />} />
            <Route path="create-project" element={<CreateProject2 />} />
            <Route path="edit-project/:id" element={<EditProjectLayout />} />
            <Route path="create-task/:id" element={<CreateTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
