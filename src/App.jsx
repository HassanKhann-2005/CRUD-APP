import React from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Read from './components/Read'

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/read' element={<Read />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </HashRouter>
  )
}

export default App
