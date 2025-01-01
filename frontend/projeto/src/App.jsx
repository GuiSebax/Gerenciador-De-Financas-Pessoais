import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Transactions from './pages/Transactions'
import Goals from './pages/Goals'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import TransactionDetails from './pages/TransactionDetails'
import GoalsDetails from './pages/GoalsDetails'
import AllTransactions from './pages/AllTransactions'
import AllGoals from './pages/AllGoals'
import EditProfile from './pages/EditProfile'

// componentS
import NavBar from './components/NavBar'
import Footer from './components/Footer'


function App() {


  return (
    <div className="flex flex-col min-h-screen bg-light-green-50">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path= "/transactions" element={<Transactions />} />
          {/* Adicionar rota específica para uma transação */}
          <Route path="/transactions/:id" element={<TransactionDetails />} />
          <Route path="/transactions/all" element={<AllTransactions />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/goals/:id" element={<GoalsDetails />} />
          <Route path="/goals/all" element={<AllGoals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit/:id" element={<EditProfile />} />
          <Route path="/users" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
