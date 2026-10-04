import React, { useState, useEffect } from "react";
import Techsidebar from "./Techsidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function TechnicianDashboard() {
  
  return (
    <>
    <Navbar/>
    <div className="sideb">
      <Techsidebar />
      <Outlet/>
    </div>
    </>
  );
}
