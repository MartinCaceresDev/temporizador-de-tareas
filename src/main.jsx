import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TasksContextProvider } from './Context/TasksContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <TasksContextProvider>
    <App />
  </TasksContextProvider>
  // </React.StrictMode>
)

