import React from 'react';
import { useState, useEffect } from 'react';
import { updateDriver } from './utilities/Api';

const DriverForm = ({ driver, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    driverPicture: null,
    pcoCard: null,
    dvlaCard: null,
    carPicture: null,
    pcoCarPaper: null,
    pcoCarCard: null,
    insurance: null,
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        fullName: driver.fullName,
        driverPicture: driver.driverPicture,
        pcoCard: driver.pcoCard,
        dvlaCard: driver.dvlaCard,
        carPicture: driver.carPicture,
        pcoCarPaper: driver.pcoCarPaper,
        pcoCarCard: driver.pcoCarCard,
        insurance: driver.insurance,
      });
    }
  }, [driver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await updateDriver(driver._id, formDataToSend);
      onSave();
    } catch (error) {
      console.error('Failed to update driver:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-2 border rounded"
      />
      {/* Add file inputs for each file field */}
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default DriverForm;
