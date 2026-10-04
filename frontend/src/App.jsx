import './App.css'
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
     <Outlet/>  
    </> 
  )
}

export default App
