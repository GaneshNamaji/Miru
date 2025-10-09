import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Routes from './routes/AllRoutes'
function App() {

  return (
    <div className="flex w-screen h-screen bg-gray-800 overflow-x-hidden">
     <Navbar />
    
     <Routes/>
    </div>
  )
}

export default App
