import React from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Read from './components/Read'

function App() {
  return (
    <BrowserRouter basename="/CRUD-APP">
      <Navbar />
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/read' element={<Read />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
