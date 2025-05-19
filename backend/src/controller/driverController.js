


const Driver = require("../modal/driverModal");


const createDriver = async (req, res) => {
  try {
    const {
      employeeNumber,
     status,
      firstName,
      surName,
      driverPrivateHireLicense,
      driverPrivateHireLicenseExpiry,
      privateHireCardNo,
      dateOfBirth,
      carRegistration,
      email,
      address,
      vehicleTypes,
      carMake,
      carModal,
      carColor,
      carPrivateHireLicense,
      carPrivateHireLicenseExpiry,
      carInsuranceExpiry,
      contact,
      driverLicense,
      driverLicenseExpiry,
      NationalInsurance
    } = req.body;


// ✅ Rename these to avoid conflicts
const driverPicturePath = req.files["driverPicture"]?.[0]?.path || null;
const privateHireCardPath = req.files["privateHireCard"]?.[0]?.path || null;
const dvlaCardPath = req.files["dvlaCard"]?.[0]?.path || null;
const carPicturePath = req.files["carPicture"]?.[0]?.path || null;
const privateHireCarPaperPath = req.files["privateHireCarPaper"]?.[0]?.path || null;
const driverPrivateHirePaperPath = req.files["driverPrivateHirePaper"]?.[0]?.path || null;
const insurancePath = req.files["insurance"]?.[0]?.path || null;
const motExpiryPath = req.files["motExpiry"]?.[0]?.path || null;
const V5Path = req.files["V5"]?.[0]?.path || null;
if (
  !employeeNumber ||
  !status ||
  !firstName ||
  !surName ||
  !driverPrivateHireLicense ||
  !driverPrivateHireLicenseExpiry ||
  !privateHireCardNo ||
  !dateOfBirth ||
  !carRegistration ||
  !email ||
  !address ||
  !vehicleTypes ||
  !carMake ||
  !carModal ||
  !carColor ||
  !carPrivateHireLicense ||
  !carPrivateHireLicenseExpiry ||
  !carInsuranceExpiry ||
  !contact ||
  !driverLicense ||
  !driverLicenseExpiry ||
  !NationalInsurance ||
  !req.files["driverPicture"]?.[0]?.path ||
  !req.files["privateHireCard"]?.[0]?.path ||
  !req.files["dvlaCard"]?.[0]?.path ||
  !req.files["carPicture"]?.[0]?.path ||
  !req.files["privateHireCarPaper"]?.[0]?.path ||
  !req.files["driverPrivateHirePaper"]?.[0]?.path ||
  !req.files["insurance"]?.[0]?.path ||
  !req.files["motExpiry"]?.[0]?.path ||
  !req.files["V5"]?.[0]?.path
) {
  return res.status(400).json({ error: "All fields are required" });
}

const newDriver = new Driver({
  employeeNumber,
  status,
  firstName,
  surName,
  driverPrivateHireLicense,
  driverPrivateHireLicenseExpiry,
  driverPicture: driverPicturePath,
  privateHireCardNo,
  privateHireCard: privateHireCardPath,
  dvlaCard: dvlaCardPath,
  NationalInsurance,
  dateOfBirth,
  carRegistration,
  carPicture: carPicturePath,
  privateHireCarPaper: privateHireCarPaperPath,
  driverPrivateHirePaper: driverPrivateHirePaperPath,
  insurance: insurancePath,
  motExpiry: motExpiryPath,
  V5: V5Path,
  email,
  address,
  vehicleTypes: vehicleTypes?.split(",") || [],
  carMake,
  carModal,
  carColor,
  carPrivateHireLicense,
  carPrivateHireLicenseExpiry,
  carInsuranceExpiry,
  contact,
  driverLicense,
  driverLicenseExpiry,
});

    await newDriver.save();

    return res.status(201).json({
      message: "Driver profile created successfully",
      driver: newDriver,
    });
  } catch (err) {
    console.error("Error creating driver:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json({ message: "Driver fetched successfully", driver });
  } catch (error) {
    console.error('Error in getDriverById controller:', error);
    return res.status(500).json({ message: 'Server error while fetching driver', error: error.message });
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (err) {
    console.error("Error fetching drivers:", err);
    res.status(500).json({ error: "Server error" });
  }
};



const deleteDriverById = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await Driver.findById(id);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    if (driver.status !== "Delete") {
      // Soft delete: update status to 'Delete'
      driver.status = "Delete";
      await driver.save();
      return res.status(200).json({ message: "Driver status set to 'Delete'" });
    } else {
      // Hard delete: remove from DB
      await Driver.findByIdAndDelete(id);
      return res.status(200).json({ message: "Driver permanently deleted" });
    }
  } catch (err) {
    console.error("Error deleting driver:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


const updateDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;

    const updateData = {
      ...req.body,
    };

    // Optional: Split comma-separated vehicleTypes
    if (updateData.vehicleTypes) {
      updateData.vehicleTypes = updateData.vehicleTypes.split(",");
    }

    // Check and update file fields if new files are uploaded
    if (req.files) {
      if (req.files["driverPicture"]) {
        updateData.driverPicture = req.files["driverPicture"][0].path;
      }
      if (req.files["privateHireCard"]) {
        updateData.privateHireCard = req.files["privateHireCard"][0].path;
      }
      if (req.files["dvlaCard"]) {
        updateData.dvlaCard = req.files["dvlaCard"][0].path;
      }
      if (req.files["carPicture"]) {
        updateData.carPicture = req.files["carPicture"][0].path;
      }
      if (req.files["privateHireCarPaper"]) {
        updateData.privateHireCarPaper = req.files["privateHireCarPaper"][0].path;
      }
      if (req.files["driverPrivateHirePaper"]) {
        updateData.driverPrivateHirePaper = req.files["driverPrivateHirePaper"][0].path;
      }
      if (req.files["insurance"]) {
        updateData.insurance = req.files["insurance"][0].path;
      }
      if (req.files["motExpiry"]) {
        updateData.motExpiry = req.files["motExpiry"][0].path;
      }
      if (req.files["V5"]) {
        updateData.V5 = req.files["V5"][0].path;
      }
    }

    const updatedDriver = await Driver.findByIdAndUpdate(driverId, updateData, {
      new: true,
    });

    if (!updatedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.status(200).json({
      message: "Driver profile updated successfully",
      driver: updatedDriver,
    });
  } catch (err) {
    console.error("Error updating driver:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createDriver,
  getAllDrivers,
  deleteDriverById,
  updateDriverById,
  getDriverById,


};
