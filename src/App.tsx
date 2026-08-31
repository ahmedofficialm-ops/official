import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { SkillPage } from './pages/SkillPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skills/:name" element={<SkillPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
