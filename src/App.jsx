import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Setup from './pages/Setup'
import Dashboard from './pages/Dashboard'
import MessCoupon from './pages/MessCoupon'
import Scanner from './pages/Scanner'
import VideoResult from './pages/VideoResult'

function App() {
  return (
    <Routes>
      <Route path="/setup" element={<Setup />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/mess" element={<MessCoupon />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/video" element={<VideoResult />} />
    </Routes>
  )
}

export default App
