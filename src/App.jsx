import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import {MainLayout} from './components/MainLayout'
import { HomePage } from './pages/homepage'
import { NotFound } from './pages/notFound'
import { QuestionPage } from './pages/questionPage'
import {AddQuestionPageLazy} from './pages/addQuestionPage'
import { EditQuestionPageLazy } from './pages/editQuestionPage'
import { AuthProvider } from './auth/AuthProvider'
import { useAuth } from './hooks/isAuth'
import { ForbiddenPage } from './pages/forbiddenPage'
import { ThemeProvider } from './theme'

const ProtectedRoutes = () => {
  const {isAuth} = useAuth();
  const location = useLocation();


  return isAuth  ? <Outlet /> : <Navigate to="/forbidden" state={{from: location.pathname}} replace/>
}


function App() {

  // return (
  //   <>
  //     <MainLayout />
  //   </>
  // )
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element ={<HomePage/>} />
              <Route path='/forbidden' element ={<ForbiddenPage />} />
              <Route path='/question/:id' element ={<QuestionPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/addquestion' element ={<AddQuestionPageLazy />} />
                <Route path='/editquestion/:id' element ={<EditQuestionPageLazy />} />
              </Route>
              <Route path='*' element ={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
