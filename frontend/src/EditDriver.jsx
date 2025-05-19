import React, { useEffect, useState } from "react";
import { updateDriver } from "./utilities/Api";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const EditDriver = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    status: "",
    firstName: "",
    surName: "",
    driverPrivateHireLicense: "",
    driverPrivateHireLicenseExpiry: "",
    driverPicture: "",
    privateHireCardNo: "",
    privateHireCard: "",
    dvlaCard: "",
    NationalInsurance: "",
    dateOfBirth: "",
    carRegistration: "",
    carPicture: "",
    privateHireCarPaper: "",
    driverPrivateHirePaper: "",
    insurance: "",
    motExpiry: "",
    V5: "",
    email: "",
    address: "",
    vehicleTypes: "",
    carMake: "",
    carModal: "",
    carColor: "",
    carPrivateHireLicense: "",
    carPrivateHireLicenseExpiry: "",
    carInsuranceExpiry: "",
    contact: "",
    driverLicense: "",
    driverLicenseExpiry: "",
    employeeNumber: "",
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];

    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg"];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF and JPEG files are supported.");
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        form.append(key, value);
      }
    });

    try {
      await updateDriver(id, form);
      toast.success("Driver profile updated successfully!");
    } catch (error) {
      console.error("Error updating driver:", error);
      toast.error("Failed to update driver profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg">
      <div className=" my-4">
        <Link to="/">
          <button className=" px-4 py-2 font-semibold text-white bg-black">
            Back to Drivers List{" "}
          </button>
        </Link>
      </div>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit Driver Profile
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="employeeNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Employee Number
              </label>
              <input
                id="employeeNumber"
                name="employeeNumber"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.employeeNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="surName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Surname
              </label>
              <input
                id="surName"
                name="surName"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.surName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.dateOfBirth?.substring(0, 10) || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Image Uploads
          </h2>
          {[
            { label: "Driver Picture", name: "driverPicture" },
            { label: "Car Picture", name: "carPicture" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              {typeof formData[name] === "string" && formData[name] && (
                <img
                  src={formData[name]}
                  alt={name}
                  className="w-24 h-24 object-cover rounded-md mb-2"
                />
              )}
              <input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={handleFileChange}
              />
            </div>
          ))}
        </div>

        {/* PDF Uploads with Preview Link */}
        <div className="space-y-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            PDF Uploads
          </h2>
          {[
            { label: "Private Hire Card", name: "privateHireCard" },
            { label: "DVLA Card", name: "dvlaCard" },
            { label: "Insurance", name: "insurance" },
            { label: "Driver Picture", name: "driverPicture" },
            { label: "Car Picture", name: "carPicture" },
            { label: "Private Hire Car Paper", name: "privateHireCarPaper" },
            {
              label: "Driver Private Hire Paper",
              name: "driverPrivateHirePaper",
            },
            { label: "MOT Expiry", name: "motExpiry" },
            { label: "V5", name: "V5" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              {typeof formData[name] === "string" && formData[name] && (
                <a
                  href={formData[name]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline block mb-2"
                >
                  View uploaded file
                </a>
              )}
              <input
                id={name}
                name={name}
                type="file"
                accept="application/pdf"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={handleFileChange}
              />
            </div>
          ))}
        </div>
        {/* Status */}
        <div className="mt-6">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            value={formData.status || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Delete">Delete</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-6 rounded-md transition-colors ${
              loading
                ? "cursor-progress bg-gray-400 text-black"
                : "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDriver;
