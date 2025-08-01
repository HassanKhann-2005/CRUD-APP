import React from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import Read from './components/Read'


function App() {


  return (
    
    <>
   

     <Routes>
      <Route path='/' element={<Form/>}></Route>
      <Route path='/read' element={<Read/>}></Route>
      {/* <Route path="/edit/:id" element={<Edit />} /> */}
     
     <Route path="*" element={<h1>404 Not Found</h1>} />
 
     </Routes>
    
    </>
  )
}

export default App
