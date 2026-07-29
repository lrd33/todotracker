import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AssignmentsProvider } from './context/AssignmentsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AssignmentsProvider>
        <App />
      </AssignmentsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
