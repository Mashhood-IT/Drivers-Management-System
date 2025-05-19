import React from "react";
import { Route, Routes } from "react-router-dom";
import DriverListTable from "./DriverListTable";
import { ToastContainer } from "react-toastify";
import AddDriver from "./AddDriver";
import EditDriver from "./EditDriver";
import UserDetails from "./DriverDetails";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/UserDetails/:id" element={<UserDetails />} />
        <Route path="/EditDriver/:id" element={<EditDriver />} />
        <Route path="/AddDriver" element={<AddDriver />} />
        <Route path="/" element={<DriverListTable />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
      <div className=" flex items-center justify-center space-x-5"></div>
    </div>
  );
};

export default App;
