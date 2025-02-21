import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
// import './App.css'
import Dashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <div className=''>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>

      

      </div>

    </Router>
    
  )
}

export default App
