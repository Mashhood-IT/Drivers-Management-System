import React, { useState } from "react";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import VehicleDetails from "./driverDetails/VehicleDetails";
import { createDriver } from "./utilities/Api";
import { Link, useNavigate } from "react-router-dom";
import DriverPersonalDetails from "./driverDetails/DriverPersonalDetails";

export default function AddDriver() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    motExpiryDate : "",
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
    availability: [{ from: "", to: "" }]
  });

  const [filePreviews, setFilePreviews] = useState({});

  const handleInputChange = (e, index = null, field = null) => {
    const { name, type, files, value } = e.target;
  
    if (name.startsWith("availability") && index !== null) {
      setFormData((prev) => {
        const updatedAvailability = [...prev.availability];
        updatedAvailability[index][field] = value;
        return {
          ...prev,
          availability: updatedAvailability,
        };
      });
      return;
    }
  
    if (type === "file") {
      const file = files[0];
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
      if (file && !allowedTypes.includes(file.type)) {
        toast.error("Only PDF, JPEG, PNG, JPG files are supported.");
        return;
      }
  
      setFormData((prev) => ({ ...prev, [name]: file }));
      setFilePreviews((prev) => ({
        ...prev,
        [name]: file ? URL.createObjectURL(file) : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
   const handleAddAvailability = () => {
      if (formData.availability.length < 3) {
        setFormData((prev) => ({
          ...prev,
          availability: [...prev.availability, { from: "", to: "" }],
        }));
      }
    };
    
    const handleRemoveAvailability = (index) => {
      setFormData((prev) => ({
        ...prev,
        availability: prev.availability.filter((_, i) => i !== index),
      }));
    };

  
  
  
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => {
      const updatedVehicleTypes = checked
        ? [...prev.vehicleTypes, id] // Add vehicle type if checked
        : prev.vehicleTypes.filter((type) => type !== id); // Remove vehicle type if unchecked
  
      return {
        ...prev,
        vehicleTypes: updatedVehicleTypes, // Update vehicleTypes array
      };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const form = new FormData();
  
      // Append fields correctly
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (
          key === 'availability' ||
          key === 'nominatedDrivers' ||
          key === 'experienceHistory'
        ) {
          form.append(key, JSON.stringify(value));
        } else if (value instanceof File || value instanceof Blob) {
          form.append(key, value);
        } else if (value !== "" && value !== null && value !== undefined) {
          form.append(key, value);
        }
      });
  
      await createDriver(form);
      toast.success("Driver profile saved successfully!");
      navigate("/DriverListTable")
    } catch (error) {
      console.error("Error creating driver:", error);
      toast.error(
        error?.response?.data?.message || 
        error?.response?.data?.error || 
        "Something went wrong"
      );
      

    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
     <div className=" my-4">
        <Link to="/DriverListTable">
          <button className=" px-4 py-2 cursor-pointer font-semibold text-white bg-black">
            Back to Drivers List{" "}
          </button>
        </Link>
        </div>
      <div className="flex items-center mb-8">
        <div className="bg-blue-600 rounded-full p-3 mr-4">
          <User size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Driver Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <DriverPersonalDetails
          handleAddAvailability={handleAddAvailability}
          handleRemoveAvailability={handleRemoveAvailability}
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
            </>
  );
}
