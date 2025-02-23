import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
// import './App.css'
import Dashboard from './pages/UserDashboard';
import Reports from './pages/Reports';
import Budgeting from './pages/Budgeting';

function App() {
  return (
    <Router>
      <div className=''>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/reports' element={<Reports/>}/>
          <Route path='/budgeting' element={<Budgeting/>}/>
        </Routes>

      

      </div>

    </Router>
    
  )
}

export default App
