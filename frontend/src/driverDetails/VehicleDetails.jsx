import { Calendar, FileText, Truck } from "lucide-react";
import React from "react";
import { FILE_FIELDS } from "../Helpers/Data";

const VehicleDetails = ({ formData, handleInputChange, filePreviews }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-800">
        <Truck size={20} className="mr-3 text-blue-600" />
        Vehicle Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Vehicle Information Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Make</label>
            <input
              name="carMake"
              value={formData.carMake || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Toyota"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
            <input
              name="carModal"
              value={formData.carModal || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Camry"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Color</label>
            <input
              name="carColor"
              value={formData.carColor || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Black"
            />
          </div>

         
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Private Hire Card Number</label>
            <input
              name="privateHireCardNo"
              value={formData.privateHireCardNo || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter card number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Registration</label>
            <input
              name="carRegistration"
              value={formData.carRegistration || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter card number"
            />
        </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Expiry</label>
            <div className="flex items-center border border-gray-300 p-2.5 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <Calendar size={18} className="text-gray-400 mr-2" />
              <input
                type="date"
                name="carInsuranceExpiry"
                value={formData.carInsuranceExpiry || ""}
                onChange={handleInputChange}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Private Hire License</label>
            <input
              name="carPrivateHireLicense"
              value={formData.carPrivateHireLicense || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter license number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Private Hire License Expiry</label>
            <div className="flex items-center border border-gray-300 p-2.5 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <Calendar size={18} className="text-gray-400 mr-2" />
              <input
                type="date"
                name="carPrivateHireLicenseExpiry"
                value={formData.carPrivateHireLicenseExpiry || ""}
                onChange={handleInputChange}
                className="flex-1 outline-none"
              />
            </div>
          </div>
          
          {/* Vehicle Documents */}
          <div className="mt-6">
            <h3 className="text-md font-medium mb-4 flex items-center text-gray-700">
              <FileText size={16} className="mr-2 text-blue-600" />
              Vehicle Documents
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {FILE_FIELDS.map(({ key, label }) => (
                <div key={key} className="flex items-center space-x-4">
                  <img
                    src={filePreviews?.[key] || "./dummyImg.webp"}
                    alt={key}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-300"
                  />
                  <label className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                    {label}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      name={key}
                      id={key}
                      onChange={handleInputChange}
                      className="hidden"
                    />
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

export default VehicleDetails;
