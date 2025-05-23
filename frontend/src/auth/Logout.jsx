import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleDelete = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Successfully logged out.");

    navigate("/", { replace: true });

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div>
      {user && (
        <div className="flex items-center justify-end px-12 py-4">
          <button
            onClick={handleDelete}
            className="rounded-md bg-blue-500 cursor-pointer font-semibold text-white px-4 py-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
