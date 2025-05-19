import React, { useState } from "react";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import DriverDetails from "./driverDetails/DriverDetails";
import VehicleDetails from "./driverDetails/VehicleDetails";
import { createDriver } from "./utilities/Api";

export default function AddDriver() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeNumber: "",
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
  });

  const [filePreviews, setFilePreviews] = useState({});

  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      const file = files[0];
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      if (file && !allowedTypes.includes(file.type)) {
        toast.error("Only PDF, JPEG, PNG, JPG files are supported.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      setFilePreviews((prev) => ({
        ...prev,
        [name]: file ? URL.createObjectURL(file) : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        vehicleTypes: prev.vehicleTypes ? `${prev.vehicleTypes},${id}` : id,
      }));
    } else {
      const updatedTypes = formData.vehicleTypes
        .split(",")
        .filter((type) => type !== id)
        .join(",");
      setFormData((prev) => ({
        ...prev,
        vehicleTypes: updatedTypes,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        form.append(key, value);
      }
    });

    try {
      await createDriver(form);
      toast.success("Driver profile saved successfully!");
    } catch (error) {
      console.error("Error creating driver:", error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to save driver profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-8">
        <div className="bg-blue-600 rounded-full p-3 mr-4">
          <User size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Driver Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <DriverDetails
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            filePreviews={filePreviews}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <VehicleDetails
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            filePreviews={filePreviews}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-6 border-t border-gray-200">
          <div className="mb-4 md:mb-0 w-full md:w-1/3">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

          <button
            type="submit"
            disabled={loading}
            className={`py-3 px-8 rounded-lg text-white font-medium transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save Driver Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
