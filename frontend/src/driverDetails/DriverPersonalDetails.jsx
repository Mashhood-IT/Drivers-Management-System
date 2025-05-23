import { Calendar, Phone, User, FileText, Plus, X } from "lucide-react";
import React from "react";

const DriverPersonalDetails = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
  filePreviews,
  handleRemoveAvailability,
  handleAddAvailability
}) => {


 
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-800">
        <User size={20} className="mr-3 text-blue-600" />
        Driver Information
      </h2>
      <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-6 mb-6">
      <img
  src={
    filePreviews?.driverPicture || formData.driverPicture || "/dummyImg.webp"
  }
  alt="Profile"
  className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
/>

            <div className="mt-4 sm:mt-0">
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded-lg inline-flex items-center transition-colors">
                <FileText size={16} className="mr-2" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  name="driverPicture"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                JPG, PNG or PDF. Max 5MB.
              </p>
            </div>
          </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Profile Picture Upload */}
         
          {/* Personal Information */}
         

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg "
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sur Name
              </label>
              <input
                name="surName"
                type="text"
                value={formData.surName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg "
                placeholder="Enter surname"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg "
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <div className="flex items-center border border-gray-300 p-2.5 rounded-lg ">
              <Phone size={18} className="text-gray-400 mr-2" />
              <input
                name="contact"
                type="tel"
                value={formData.contact || ""}
                onChange={handleInputChange}
                className="flex-1 outline-none"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              rows="3"
              className="w-full border border-gray-300 p-2.5 rounded-lg "
              placeholder="Enter full address"
            />
          </div>
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Vehicle Types
  </label>
  <div className="grid grid-cols-2 gap-2">
    {[
      "Standard Sedan",
      "Luxury",
      "SUV",
      "Van / MPV",
      "Commercial MPV",
    ].map((type) => (
      <div key={type} className="flex items-center">
        <input
          type="checkbox"
          id={type.toLowerCase().replace(/ /g, "")}
          onChange={handleCheckboxChange}
checked={formData.vehicleTypes.includes(type.toLowerCase().replace(/ /g, ""))}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label
          className="ml-2 text-sm text-gray-700"
          htmlFor={type.toLowerCase().replace(/ /g, "")}
        >
          {type}
        </label>
      </div>
    ))}
  </div>
</div>


        </div>

        <div className="space-y-6">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Number
            </label>
            <input
              name="employeeNumber"
              type="text"
              value={formData.employeeNumber || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg "
              placeholder="Enter employee number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <div className="flex items-center border border-gray-300 p-2.5 rounded-lg ">
              <Calendar size={18} className="text-gray-400 mr-2" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth.split("T")[0] || ""}
                onChange={handleInputChange}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driving License
              </label>
              <input
                name="driverLicense"
                type="text"
                value={formData.driverLicense || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg "
                placeholder="Enter license number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Expiry
              </label>
              <div className="flex items-center border border-gray-300 p-2.5 rounded-lg ">
                <Calendar size={18} className="text-gray-400 mr-2" />
                <input
  type="date"
  name="driverLicenseExpiry"
  value={
    formData.driverLicenseExpiry
      ? formData.driverLicenseExpiry.split("T")[0]
      : ""
  }
  onChange={handleInputChange}
/>

              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Private Hire Card No.
              </label>
              <input
                name="privateHireCardNo"
                type="text"
                value={formData.privateHireCardNo || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg "
                placeholder="Enter license number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driver Private Hire License Expiry
              </label>
              <input
                name="driverPrivateHireLicenseExpiry"
                type="date"
                value={formData.driverPrivateHireLicenseExpiry || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg "
                placeholder="Enter license number"
              />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              National Insurance
            </label>
            <input
              name="NationalInsurance"
              type="text"
              value={formData.NationalInsurance || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg "
              placeholder="Enter NI number"
            />
          </div>
           
          </div>

     
        </div>
      </div>
      {/* Status Section */}

    
<div className="mb-4 md:mb-0 mt-4 w-full md:w-1/3">
  <label
    htmlFor="status"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Status
  </label>
  <select
    id="status"
    name="status"
    className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 "
    value={formData.status || ""}
    onChange={handleInputChange}
  >
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Deleted">Deleted</option>
    <option value="Pending">Pending</option>
    <option value="Suspended">Suspended</option>
    <option value="Expired">Expired</option>
  </select>
</div>
{/* Availability Section */}
<div className="mt-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Holidays
  </label>

  {formData.availability?.map((slot, index) => (
    <div
      key={index}
      className="flex flex-col md:flex-row md:items-center gap-2 mb-3 relative border border-gray-200 rounded-lg p-3"
    >
      <div className="flex flex-col w-full">
        <label className="text-xs mb-1 text-gray-500">From</label>
        <input
          type="date"
          name={`availability[${index}].from`}
          value={slot.from.split("T")[0] || ""}
          onChange={(e) =>
            handleInputChange(e, index, "from")
          }
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      
      <div className="flex flex-col w-full">
        <label className="text-xs mb-1 text-gray-500">To</label>
        <input
          type="date"
          name={`availability[${index}].to`}
          value={slot.to.split("T")[0] || ""}
          onChange={(e) =>
            handleInputChange(e, index, "to")
          }
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      
      {index > 0 && (
        <div className="p-2">

        <button
          type="button"
          onClick={() => handleRemoveAvailability(index)}
          className="absolute top-1 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1"
          >
          <X size={16} />
        </button>
          </div>
      )}
    </div>
  ))}

  {formData.availability?.length < 3 && (
    <button
      type="button"
      onClick={handleAddAvailability}
      className="flex items-center mt-2 text-blue-600 hover:text-blue-800 text-sm"
    >
      <Plus size={16} className="mr-1" />
      Add Availability
    </button>
  )}
</div>

    </div>
  );
};

export default DriverPersonalDetails;
