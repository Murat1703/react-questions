import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {MainLayout} from './components/MainLayout'
import { HomePage } from './pages/homepage'
import { NotFound } from './pages/notFound'

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
          <Route path='/question/:id' element ={<div>QuestionPage</div>} />
          <Route path='*' element ={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
