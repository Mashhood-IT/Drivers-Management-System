

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "./utilities/Api";
import { toast } from "react-toastify";
import { downloadSecurePDF } from "./pdfDownloader";
import { FileText, CheckCircle, AlertCircle, Download } from "lucide-react";
import { CAR_FIELDS, FILE_FIELDS, TEXT_FIELDS } from "./Helpers/Data";

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

  // Function to download images from Cloudinary
  const downloadImage = async (imageUrl, fileName) => {
    try {
      // Show loading feedback
      toast.info("Preparing download...");

      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      // Create a local URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create an anchor element and trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl); // Free up memory

      toast.success("Download started!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image. Please try again.");
    }
  };

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
    return (
      <div className="mb-4" key={field.key}>
        <div className="flex items-center mb-1">
          <div className="mr-2 text-blue-600">{field.icon}</div>
          <label className="font-medium text-gray-700">{field.label}:</label>
        </div>
        <div className="ml-7 text-gray-800 bg-gray-50 p-2 rounded-md border border-gray-100">
          {Array.isArray(value)
            ? value.join(", ")
            : value || (
                <span className="text-gray-400 italic">Not provided</span>
              )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <div className="bg-black text-white px-4 w-44 py-2 my-4 rounded-md font-semibold">
        <Link to="/">Back to Driver Lists</Link>
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

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-6 py-2 font-medium text-sm  ${
              activeTab === "personal"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Details
          </button>
          <button
            className={`px-6 py-2 font-medium ${
              activeTab === "vehicle"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("vehicle")}
          >
            Vehicle Details
          </button>
          <button
            className={`px-6 py-2 font-medium ${
              activeTab === "documents"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
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
                              downloadImage(
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
  