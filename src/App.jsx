import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {MainLayout} from './components/MainLayout'
import { HomePage } from './pages/homepage'
import { NotFound } from './pages/notFound'
import { QuestionPage } from './pages/questionPage'


function App() {

  // return (
  //   <>
  //     <MainLayout />
  //   </>
  // )
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element ={<HomePage/>} />
          <Route path='/forbidden' element ={<div>forbidden</div>} />
          <Route path='/addquestion' element ={<div>addquestion</div>} />
          <Route path='/question/:id' element ={<QuestionPage />} />
          <Route path='*' element ={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
