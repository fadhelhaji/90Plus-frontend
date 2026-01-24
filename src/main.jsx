import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { UserProvider } from './Contexts/UserContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)