

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "./utilities/Api";
import { toast } from "react-toastify";
import { downloadSecurePDF } from "./utilities/pdfDownloader";
import { FileText, CheckCircle, AlertCircle, Download } from "lucide-react";
import { CAR_FIELDS, FILE_FIELDS, TEXT_FIELDS } from "./Helpers/Data";
import DriverDetailsPDF from "./utilities/DriverDetailsPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function DriverDetails() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await getUserById(id);
        setDriver(response.data.driver);
      } catch (error) {
        toast.error("Failed to fetch driver details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, [id]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 text-lg font-medium text-blue-600">
          Loading driver details...
        </div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 text-lg font-medium text-red-600 flex items-center">
          <AlertCircle className="mr-2" size={24} />
          Driver not found
        </div>
      </div>
    );
  }

  const renderTextField = (field) => {
    const value = driver[field.key];
  
    // Handle availability separately
    if (field.key === "availability") {
      return (
        <div className="mb-4 md:col-span-2" key={field.key}>
          <div className="flex items-center mb-3">
            <div className="mr-2 text-blue-600">{field.icon}</div>
            <label className="font-medium text-gray-700">{ field.label}:</label>
          </div>
  
          {Array.isArray(value) && value.length > 0 ? (
            <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-3">
              {value.map((slot, index) => (
                <div
                  key={index}
                  className="bg-blue-50 border border-blue-100 p-4 rounded-lg shadow-sm flex flex-col"
                >
                  <span className="text-blue-800 font-semibold text-sm mb-2">
                    Availability Slot {index + 1}
                  </span>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-gray-600 text-sm">From:</div>
                      <div className="font-medium">
                        {slot.from ? new Date(slot.from).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm">To:</div>
                      <div className="font-medium">
                        {slot.to ? new Date(slot.to).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="ml-7 bg-gray-50 p-4 rounded-md border border-gray-100 text-gray-500 italic flex items-center">
              <AlertCircle size={16} className="mr-2 text-gray-400" />
              No availability provided
            </div>
          )}
        </div>
      );
    }
  
    const key = field.key.toLowerCase();
    const isDateField = key.includes("date") || key.includes("expiry");
    const EXPIRY_KEYS = ["motExpiryDate", "driverLicenseExpiry", "carInsuranceExpiry", "carPrivateHireLicenseExpiry"]; // adjust based on your field keys
    const isExpired = EXPIRY_KEYS.includes(field.key) && value && new Date(value) < new Date();
      
    const renderFieldValue = (key, value) => {
      if (!value) return <span className="text-gray-400 italic">Not provided</span>;
      if (Array.isArray(value)) return value.join(", ");
  
      const formattedValue = isDateField ? new Date(value).toLocaleDateString() : value;
      return isExpired ? `${formattedValue} (Expired)` : formattedValue;
    };
  
    return (
      <div className="mb-4" key={field.key}>
        <div className="flex items-center mb-1">
          <div className={`mr-2 ${isExpired ? "text-red-600" : "text-blue-600"}`}>
            {field.icon}
          </div>
          <label className={`font-medium ${isExpired ? "text-red-600" : "text-gray-700"}`}>
            {field.label}:
          </label>
        </div>
  
        <div
          className={`ml-7 text-gray-800 p-2 rounded-md border ${
            isExpired ? "border-red-500 bg-red-50" : "border-gray-100 bg-gray-50"
          }`}
        >
          {renderFieldValue(field.key, value)}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <div className="bg-black text-white px-4 w-44 py-2 my-4 rounded-md font-semibold">
        <Link to="/DriverListTable">Back to Driver Lists</Link>
      </div>
      <div>
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">Driver Details</h2>
            <div>
              <img
                src={
                  driver.driverPicture ? driver.driverPicture : "/dummyImg.webp"
                }
                alt={driver.id}
                className="h-28 w-28 object-contain"
              />
            </div>
          </div>

          {driver.status && (
            <div
              className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                driver.status.toLowerCase() === "active"
                  ? "bg-green-100 text-green-800"
                  : driver.status.toLowerCase() === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <CheckCircle className="mr-1" size={16} />
              {driver.status}
            </div>
          )}
        </div>


        <PDFDownloadLink
  document={<DriverDetailsPDF driver={driver} />}
  fileName={`Driver_${driver.firstName || "Details"}.pdf`}
>
  {({ loading }) =>
    loading ? (
      <button className="px-4 py-2 bg-gray-400 text-white rounded-md">Preparing PDF...</button>
    ) : (
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Download Driver Info PDF
      </button>
    )
  }
</PDFDownloadLink>

        {/* Tabs */}
        <div className="flex flex-col lg:flex-row border-b border-gray-200 mb-6">
  <button
    onClick={() => setActiveTab("personal")}
    className="lg:px-6 px-0 py-4 lg:text-lg text-xs text-left text-gray-500 hover:text-gray-700"
  >
    <span
      className={`inline-block pb-1 ${
        activeTab === "personal"
          ? "text-blue-600 border-b-2 border-blue-600"
          : ""
      }`}
    >
      Personal Details
    </span>
  </button>

  <button
    onClick={() => setActiveTab("vehicle")}
    className="lg:px-6 px-0 py-4 lg:text-lg text-xs text-left text-gray-500 hover:text-gray-700"
  >
    <span
      className={`inline-block pb-1 ${
        activeTab === "vehicle"
          ? "text-blue-600 border-b-2 border-blue-600"
          : ""
      }`}
    >
      Vehicle Details
    </span>
  </button>

  <button
    onClick={() => setActiveTab("documents")}
    className="lg:px-6 px-0 py-4 lg:text-lg text-xs text-left text-gray-500 hover:text-gray-700"
  >
    <span
      className={`inline-block pb-1 ${
        activeTab === "documents"
          ? "text-blue-600 border-b-2 border-blue-600"
          : ""
      }`}
    >
      Documents
    </span>
  </button>
</div>


        {/* Content */}
        <div className="bg-white rounded-lg">
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEXT_FIELDS.map((field) => renderTextField(field))}
              
            </div>
          )}

          {activeTab === "vehicle" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAR_FIELDS.map((field) => renderTextField(field))}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FILE_FIELDS.map((field) => (
                <div
                  key={field.key}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-2 text-blue-600">{field.icon}</div>
                    <h3 className="font-medium text-gray-700">{field.label}</h3>
                  </div>

                  {driver[field.key] ? (
                    <>
                      {driver[field.key].endsWith(".pdf") ? (
                        <button
                          onClick={() =>
                            downloadSecurePDF(
                              driver[field.key],
                              `${field.label}.pdf`
                            )
                          }
                          className="flex items-center text-blue-600 hover:text-blue-800 font-medium underline"
                        >
                          <FileText className="mr-1" size={20} />
                          Download PDF
                        </button>
                      ) : (
                        <div className="mt-2">
                          <img
                            src={driver[field.key]}
                            alt={field.label}
                            className="h-40 w-40 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors duration-200"
                          />
                          <button
                            onClick={() =>
                              downloadSecurePDF(
                                driver[field.key],
                                `${field.label.replace(/\s+/g, "_")}.jpg`
                              )
                            }
                            className="flex items-center mt-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <Download className="mr-1" size={16} />
                            Download Image
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-400 italic">Not uploaded</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
  