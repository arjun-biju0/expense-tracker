import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
// import './App.css'
import Dashboard from './pages/UserDashboard';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className=''>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/reports' element={<Reports/>}/>
        </Routes>

      

      </div>

    </Router>
    
  )
}

export default App
