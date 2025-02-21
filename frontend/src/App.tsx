import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
import './App.css'

function App() {
  return (
    <Router>
      <div className='bg-white'>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>

      

      </div>

    </Router>
    
  )
}

export default App
