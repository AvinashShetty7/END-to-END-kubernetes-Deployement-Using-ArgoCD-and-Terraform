import React, { useState, useEffect } from "react";
import CreateTicket from "./CreateTicket";
import MyTickets from "./MyTickets";
import { Link } from "react-router-dom";
import EmpSidebar from "./EmpSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
export default function EmployeeDashboard() {
  return (
    <>
      <Navbar />
      <div className="sideb">
        <EmpSidebar />
        <Outlet />
      </div>
    </>
  );
}
