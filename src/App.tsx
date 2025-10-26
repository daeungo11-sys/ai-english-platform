import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Speaking from './pages/Speaking'
import Writing from './pages/Writing'
import Reading from './pages/Reading'
import Calendar from './pages/Calendar'
import { Home as HomeIcon, Mic, PenTool, BookOpen, Calendar as CalendarIcon } from 'lucide-react'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <Mic size={28} />
              <h1>AI English Tutor</h1>
            </div>
            <div className="nav-links">
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <HomeIcon size={20} />
                <span>Home</span>
              </NavLink>
              <NavLink to="/speaking" className={({ isActive }) => isActive ? 'active' : ''}>
                <Mic size={20} />
                <span>말하기</span>
              </NavLink>
              <NavLink to="/writing" className={({ isActive }) => isActive ? 'active' : ''}>
                <PenTool size={20} />
                <span>쓰기</span>
              </NavLink>
              <NavLink to="/reading" className={({ isActive }) => isActive ? 'active' : ''}>
                <BookOpen size={20} />
                <span>읽기</span>
              </NavLink>
              <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active' : ''}>
                <CalendarIcon size={20} />
                <span>학습 기록</span>
              </NavLink>
            </div>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
