import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard.jsx'
import AdminDashboard from './components/Admindashboard/AdminDashboard.jsx'
import Register from './components/Admindashboard/Register.jsx'
import Edituser from './components/Admindashboard/Edituser.jsx'
import Tickets from './components/Admindashboard/Tickets.jsx'
import Login from './components/Login.jsx'
import CreateTicket from './components/EmployeeDashboard/CreateTicket.jsx'
import MyTickets from './components/EmployeeDashboard/MyTickets.jsx'
import TechnicianDashboard from './components/TechnicianDashboard/TechnicianDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import TechTickets from './components/TechnicianDashboard/TechTickets.jsx'
  

const router=createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<App/>}>
      <Route path="" element={<Login/>}/>
      <Route path="Admin" element={<AdminDashboard />}>
        <Route path="register" element={<Register/>}/>
        <Route path="edituser" element={<Edituser/>}/>
        <Route path="viewtickets" element={<Tickets/>}/>
      </Route>
      <Route path="Employee" element={<EmployeeDashboard/>}>
        <Route path="createticket" element={<CreateTicket/>}/>
        <Route path="mytickets" element={<MyTickets/>}/>
      </Route>
      <Route path="Technician" element={<TechnicianDashboard/>}>
        <Route path="tickets" element={<TechTickets/>}/>
      </Route>
    </Route>
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RouterProvider router={router}/>
  </StrictMode>,
)
