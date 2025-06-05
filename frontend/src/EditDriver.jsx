import React, { useEffect, useState } from "react";
import { getUserById ,  updateDriver } from "./utilities/Api";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import DriverPersonalDetails from "./driverDetails/DriverPersonalDetails";
import VehicleDetails from "./driverDetails/VehicleDetails";

const EditDriver = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
const navigate = useNavigate()
  const [formData, setFormData] = useState({
    motExpiryDate: "",
    status: "",
    firstName: "",
    surName: "",
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
    vehicleTypes: [],
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
    availability: [{ from: "", to: "" }],
  });

  const handleInputChange = (e, index, field) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files?.[0];
      if (file) {
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
          toast.error("Only PDF and JPEG/PNG files are supported.");
          return;
        }
        setFormData((prevData) => ({
          ...prevData,
          [name]: file,
        }));

        if (file.type.startsWith("image/")) {
          const previewUrl = URL.createObjectURL(file);
          setFilePreviews((prevPreviews) => ({
            ...prevPreviews,
            [name]: previewUrl,
          }));
        } else {
          setFilePreviews((prevPreviews) => ({
            ...prevPreviews,
            [name]: null,
          }));
        }
        return;
      }
    }

    if (index !== undefined && field) {
      const updatedAvailability = [...formData.availability];
      updatedAvailability[index] = {
        ...updatedAvailability[index],
        [field]: value,
      };
      setFormData((prevData) => ({
        ...prevData,
        availability: updatedAvailability,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddAvailability = () => {
    setFormData((prevData) => ({
      ...prevData,
      availability: [...prevData.availability, { from: "", to: "" }],
    }));
  };

  const handleRemoveAvailability = (index) => {
    const updatedAvailability = [...formData.availability];
    updatedAvailability.splice(index, 1);

    setFormData((prevData) => ({
      ...prevData,
      availability: updatedAvailability,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "availability") {
        value.forEach((slot, index) => {
          form.append(`availability[${index}].from`, slot.from);
          form.append(`availability[${index}].to`, slot.to);
        });
      } else if (value) {
        form.append(key, value);
      }
    });

    try {
      await updateDriver(id, form);
      toast.success("Driver profile updated successfully!");
      navigate("/DriverListTable")
    } catch (error) {
      console.error("Error updating driver:", error);
      toast.error("Failed to update driver profile.");
    } finally {
      setLoading(false);
    }
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
  
  
  
  const [filePreviews, setFilePreviews] = useState({});


  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserById(id);
        console.log("Fetched driver data:", response.data); 
        setFormData(response.data.driver);
      } catch (error) {
        console.error("Failed to fetch driver data:", error);
        toast.error("Failed to fetch driver data.");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchUser();
  }, [id]);
  
  
  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg">
      <div className="my-4">
        <Link to="/DriverListTable">
          <button className="px-4 py-2 font-semibold text-white bg-black">
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
  );
};

export default EditDriver;
