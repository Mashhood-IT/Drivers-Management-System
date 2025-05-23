import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DriverListTable from "./DriverListTable";
import { toast, ToastContainer } from "react-toastify";
import AddDriver from "./AddDriver";
import EditDriver from "./EditDriver";
import UserDetails from "./DriverDetails";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./auth/LoginForm";
import Logout from "./auth/Logout";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./emptyPages/NotFound";
const App = () => {

  return (
    <div>
      
     <Logout />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route element={<ProtectedRoute/>}>

        <Route path="/UserDetails/:id" element={<UserDetails />} />
        <Route path="/EditDriver/:id" element={<EditDriver />} />
        <Route path="/AddDriver" element={<AddDriver />} />
        <Route path="/DriverListTable" element={<DriverListTable />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
