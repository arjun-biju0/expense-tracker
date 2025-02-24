import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
// import './App.css'
import Dashboard from './pages/UserDashboard';
import Reports from './pages/Reports';
import Budgeting from './pages/Budgeting';
import SplitExpenses from './pages/SplitExpense';


function App() {
  return (
    <Router>
      <div className=''>
        {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/reports' element={<Reports/>}/>
          <Route path='/budgeting' element={<Budgeting/>}/>
          <Route path='/splitExpenses' element={<SplitExpenses/>}/>
        </Routes>

      

      </div>

    </Router>
    
  )
}

export default App
