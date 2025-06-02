import React, { useState, useEffect } from "react";
import { Search, Eye, Trash, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteDriver, getAllDrivers } from "./utilities/Api";
import { downloadCSV } from "./utilities/downloadCSV";
import { toast } from "react-toastify";

export default function DriverListTable() {
  const [drivers, setDrivers] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const handleDelete = async (id) => {
    try {
      const driver = drivers.find((d) => d._id === id);
      if (!driver) return;

      if (driver.status === "Deleted") {
        const confirmed = window.confirm(
          "Are you sure you want to delete this driver?"
        );
        if (!confirmed) return;
      }
      await deleteDriver(id);
      toast.success("Driver deleted successfully");
      setDrivers((prevDrivers) =>
        prevDrivers.filter((driver) => driver._id !== id)
      );
    } catch (error) {
      toast.error("Error deleting Driver");

      console.error("Error deleting driver:", error);
    }
  };

  useEffect(() => {
    getAllDrivers()
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => console.error("Error fetching driver data:", error));
  }, [handleDelete]);

  const filteredDrivers = drivers.filter((driver) => {
    if (driver.status !== activeTab && activeTab !== "All") return false;

    if (searchQuery) {
      return (
        driver.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.carMake?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.carModal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.employeeNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.carRegistration
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDownloadCSV = () => {
    const selectedDrivers = filteredDrivers.filter((driver) =>
      selectedRows.includes(driver._id)
    );

    const carHeaders = ["VRM", "Vehicle Make", "Vehicle License Number"];
    const carKeys = ["carRegistration", "carMake", "carPrivateHireLicense"];
    downloadCSV(selectedDrivers, carHeaders, carKeys, "CarDetails.csv");

    const driverHeaders = [
      "Private Hire Driver License No.",
      "Forename",
      "Surname",
    ];
    const driverKeys = ["privateHireCardNo", "firstName", "surName"];
    downloadCSV(
      selectedDrivers,
      driverHeaders,
      driverKeys,
      "DriverDetails.csv"
    );
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const handleCheckboxToggle = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Status options
  const statusOptions = ["Active", "Suspended", "Pending", "Deleted"];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Driver List - {activeTab}
      </h1>

      {/* Tabs */}
      <div className="flex flex-nowrap border-b  border-gray-200 mb-6">
        {["All", ...statusOptions].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 font-medium lg:text-sm text-xs transition-colors duration-200
            ${
              activeTab === status
                ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg"
            }`}
            onClick={() => handleTabClick(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md pl-3 pr-10 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th></th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">
                No.
              </th>
              <th className="py-3 px-4 text-nowrap text-left lg:text-md text-sm  font-semibold text-gray-600 border-b">
                Empployee No.
              </th>
              <th className="py-3 px-4 text-nowrap text-left lg:text-md text-sm font-semibold text-gray-600 border-b">
                First Name
              </th>
              <th className="py-3 px-4 text-nowrap text-left lg:text-md text-sm font-semibold text-gray-600 border-b">
                Email
              </th>
              <th className="py-3 px-4 text-nowrap text-left lg:text-md text-sm font-semibold text-gray-600 border-b">
                Car Make
              </th>
              <th className="py-3 px-4 text-nowrap text-left lg:text-md text-sm font-semibold text-gray-600 border-b">
                Car Model
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">
                Status
              </th>
              <th className="py-3 px-4 text-center font-semibold text-gray-600 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver, index) => (
              <tr
                key={driver._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(driver._id)}
                    onChange={() => handleCheckboxToggle(driver._id)}
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-medium">
                  {driver.employeeNumber}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-medium">
                  {driver.firstName}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-blue-600">
                  {driver.email}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {driver.carMake}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {driver.carModal}
                </td>

                <td className="py-3 px-4 border-b border-gray-200">
                  <span className={getStatusColorClass(driver.status)}>
                    {driver.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex justify-center space-x-2">
                    <Link to={`/UserDetails/${driver._id}`}>
                      <button
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                    </Link>
                    <Link to={`/EditDriver/${driver._id}`}>
                      <button
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-600 hover:text-green-600"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(driver._id)}
                      className="p-1 rounded-full hover:bg-gray-100 text-gray-600 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" flex items-end justify-end mt-4">
        {selectedRows.length > 0 && (
          <button
            onClick={handleDownloadCSV}
            className="bg-black text-white rounded-md px-4 py-2"
          >
            Download TPH
          </button>
        )}
      </div>

      {/* Add New Button */}
      <div className="mt-6 flex justify-between items-center">
        <Link to="/AddDriver">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center transition-colors">
            <Plus size={18} className="mr-1" />
            Add New
          </button>
        </Link>
      </div>
    </div>
  );
}

function getStatusColorClass(status) {
  switch (status) {
    case "Active":
      return "text-green-800";
    case "Deleted":
      return "text-red-800";
    case "Expired":
      return "text-red-900";
    case "Suspended":
      return "text-yellow-800";
    case "Pending":
      return "text-blue-800";
    default:
      return "text-gray-800";
  }
}
