import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function AdminDashboard() {


  const renderSection = () => {
    
          
  };

  return (
    <>
     <Navbar/>
    <div className="sideb">
    <Sidebar/>
    <Outlet/>
    </div>
    </>
  );
}
















































