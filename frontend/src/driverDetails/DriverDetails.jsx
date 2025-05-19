import { Calendar, Phone, User, FileText } from "lucide-react";
import React from "react";

const DriverDetails = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
  filePreviews,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-800">
        <User size={20} className="mr-3 text-blue-600" />
        Driver Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-6 mb-6">
            <img
              src={filePreviews?.driverPicture || "./dummyImg.webp"}
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

          {/* Personal Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Number
            </label>
            <input
              name="employeeNumber"
              type="text"
              value={formData.employeeNumber || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter employee number"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                value={formData.surName || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <div className="flex items-center border border-gray-300 p-2.5 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
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
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter full address"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              National Insurance
            </label>
            <input
              name="NationalInsurance"
              type="text"
              value={formData.NationalInsurance || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter NI number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <div className="flex items-center border border-gray-300 p-2.5 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <Calendar size={18} className="text-gray-400 mr-2" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
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
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter license number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Expiry
              </label>
              <div className="flex items-center border border-gray-300 p-2.5 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <Calendar size={18} className="text-gray-400 mr-2" />
                <input
                  type="date"
                  name="driverLicenseExpiry"
                  value={formData.driverLicenseExpiry || ""}
                  onChange={handleInputChange}
                  className="flex-1 outline-none"
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
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter license number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Private Hire License
              </label>
              <input
                name="driverPrivateHireLicense"
                type="text"
                value={formData.driverPrivateHireLicense || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter license number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PH License Expiry
              </label>
              <div className="flex items-center border border-gray-300 p-2.5 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <Calendar size={18} className="text-gray-400 mr-2" />
                <input
                  type="date"
                  name="driverPrivateHireLicenseExpiry"
                  value={formData.driverPrivateHireLicenseExpiry || ""}
                  onChange={handleInputChange}
                  className="flex-1 outline-none"
                />
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default DriverDetails;
