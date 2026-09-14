import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { StudentProvider } from './context/StudentContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <StudentProvider>
        <App />
      </StudentProvider>
    </HashRouter>
  </React.StrictMode>,
)
