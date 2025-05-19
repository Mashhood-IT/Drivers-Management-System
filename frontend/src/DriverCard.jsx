import React from "react"
import { Trash2, Edit } from 'lucide-react';
import { deleteDriver } from './utilities/Api';

const DriverCard = ({ driver, onEdit }) => {
  const handleDelete = async () => {
    try {
      await deleteDriver(driver._id);
      alert('Driver deleted');
    } catch (error) {
      console.error('Failed to delete driver:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={driver.driverPicture || '/assets/default-avatar.jpg'}
        alt={driver.fullName}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h3 className="text-xl font-semibold text-center mt-2">{driver.fullName}</h3>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(driver)}
          className="text-blue-500 hover:text-blue-700"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DriverCard;
