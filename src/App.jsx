import React from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Read from './components/Read'


function App() {


  return (
    
    <>
    <BrowserRouter>

     <Routes>
      <Route path='/' element={<Form/>}></Route>
      <Route path='/read' element={<Read/>}></Route>
      {/* <Route path="/edit/:id" element={<Edit />} /> */}
     </Routes>
     
     </BrowserRouter>
    
    </>
  )
}

export default App
