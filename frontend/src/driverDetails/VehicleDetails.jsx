


import { Calendar, FileText, Truck, Upload } from "lucide-react";
import React from "react";
import { FILE_FIELDS } from "../Helpers/Data";


const VehicleDetails = ({ formData = {}, handleInputChange = () => {}, filePreviews = {} }) => {
 
  
  
  const isPDF = (fileUrl) => {
    if (!fileUrl) return false;
    return typeof fileUrl === 'string' && 
           (fileUrl.toLowerCase().includes('.pdf') || 
            fileUrl.toLowerCase().includes('pdf'));
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h2 className="lg:text-2xl text-sm font-bold text-gray-900 flex items-center">
          <div className="bg-blue-100 p-3 rounded-xl mr-4">
            <Truck size={24} className="text-blue-600" />
          </div>
          Vehicle Information
        </h2>
        <p className="text-gray-600 text-xs mt-2">Please provide your vehicle details and upload required documents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Vehicle Info */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="lg:text-lg text-md font-semibold text-gray-800 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Make</label>
                <input
                  name="carMake"
                  value={formData.carMake || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. Toyota"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model</label>
                <input
                  name="carModal"
                  value={formData.carModal || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. Camry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Color</label>
                <input
                  name="carColor"
                  value={formData.carColor || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. Black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Car Registration</label>
                <input
                  name="carRegistration"
                  value={formData.carRegistration || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter registration number"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="lg:text-lg text-md font-semibold text-gray-800 mb-4">License & Card Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Private Hire Card Number</label>
                <input
                  name="privateHireCardNo"
                  value={formData.privateHireCardNo || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter card number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Private Hire License</label>
                <input
                  name="carPrivateHireLicense"
                  value={formData.carPrivateHireLicense || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter license number"
                />
              </div>
            </div>
          </div>

          {/* // */}


          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Expiry Dates</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MOT Expiry Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="motExpiryDate"
                    value={formData.motExpiryDate.split("T")[0] || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 pl-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Expiry</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="carInsuranceExpiry"
                    value={formData.carInsuranceExpiry.split("T")[0] || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 pl-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Private Hire License Expiry</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
  type="date"
  name="carPrivateHireLicenseExpiry"
  value={formData.carPrivateHireLicenseExpiry.split("T")[0] || ""}
  onChange={handleInputChange}
  className="w-full border border-gray-300 p-3 pl-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
/>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Dates & Documents */}
        <div className="space-y-6">
         
          {/* Vehicle Documents */}
          <div className="bg-gray-50 lg:p-6 p-3 rounded-xl">
            <h3 className="lg:text-lg text-sm font-semibold text-gray-800 mb-4 flex items-center">
              <FileText size={20} className="mr-2 text-blue-600" />
              Vehicle Documents
            </h3>
            
            <div className="space-y-4">
  {FILE_FIELDS.map(({ key, label }) => {
    const fileUrl = filePreviews?.[key] || formData?.[key];
    const isFilePDF = isPDF(fileUrl);
         
    return (
      <div key={key} className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0 p-4 bg-white rounded-lg border border-gray-200">
        {isFilePDF ? (
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-red-100 border border-gray-300 shadow-sm flex items-center justify-center flex-shrink-0">
            <FileText size={24} className="sm:w-8 sm:h-8 text-red-600" />
          </div>
        ) : (
          <img
            src={fileUrl || "/dummyImg.webp"}
            alt={label}
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-300 shadow-sm flex-shrink-0"
          />
        )}
         
        <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
          <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
          {isFilePDF && (
            <p className="text-xs text-gray-500 mb-2">
              PDF file uploaded
            </p>
          )}
          <label className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg cursor-pointer transition-colors text-xs sm:text-sm">
            <Upload size={14} className="sm:w-4 sm:h-4 mr-2" />
            Choose File
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
      </div>
    );
  })}
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;