


const Driver = require("../modal/driverModal");

const createDriver = async (req, res) => {
  try {
    const {
      motExpiryDate,
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
      NationalInsurance,
      availability,
    } = req.body;

    // File paths
    const driverPicturePath = req.files["driverPicture"]?.[0]?.path || null;
    const privateHireCardPath = req.files["privateHireCard"]?.[0]?.path || null;
    const dvlaCardPath = req.files["dvlaCard"]?.[0]?.path || null;
    const carPicturePath = req.files["carPicture"]?.[0]?.path || null;
    const privateHireCarPaperPath = req.files["privateHireCarPaper"]?.[0]?.path || null;
    const driverPrivateHirePaperPath = req.files["driverPrivateHirePaper"]?.[0]?.path || null;
    const insurancePath = req.files["insurance"]?.[0]?.path || null;
    const motExpiryPath = req.files["motExpiry"]?.[0]?.path || null;
    const V5Path = req.files["V5"]?.[0]?.path || null;

  // Check if availability is an array, not a string
let parsedAvailability = availability;

// If it's a string, parse it (for safety)
if (typeof availability === "string") {
  try {
    parsedAvailability = JSON.parse(availability);
  } catch (err) {
    return res.status(400).json({ error: "Invalid availability format" });
  }
}

if (
  !Array.isArray(parsedAvailability) ||
  !parsedAvailability.length ||
  !parsedAvailability[0].from ||
  !parsedAvailability[0].to
) {
  return res.status(400).json({ error: "At least one availability period is required." });
}

parsedAvailability = parsedAvailability.map(item => ({
  from: new Date(item.from),
  to: new Date(item.to),
}));



const checkDriverPrivateHireLicenseExpiry =new Date(driverPrivateHireLicenseExpiry) < new Date()
const checkCarPrivateHireLicenseExpiry = new Date(carPrivateHireLicenseExpiry) < new Date()
const checkCarInsuranceExpiry = new Date(carInsuranceExpiry) < new Date()
const checkDriverLicenseExpiry = new Date(driverLicenseExpiry) < new Date()
const checkmotExpiryDate = new Date(motExpiryDate) < new Date()


if(checkDriverPrivateHireLicenseExpiry){
  return res.status(500).json({message: "Driver Private Hire License is expired"})
}
if(checkCarPrivateHireLicenseExpiry){
  return res.status(500).json({message: "Car Private Hire License is expired"})
}
if(checkCarInsuranceExpiry){
  return res.status(500).json({message: "Car Insurance is expired"})
}
if(checkDriverLicenseExpiry){
  return res.status(500).json({message: "Driver License is expired"})
}
if(checkmotExpiryDate){
  return res.status(500).json({message: "MOT  is expired"})
}



    // Check required fields
    if ( !motExpiryDate ||
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
      !NationalInsurance 
      
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newDriver = new Driver({
      motExpiryDate,
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
      vehicleTypes: vehicleTypes ?  vehicleTypes.split(",") :[],
      carMake,
      carModal,
      carColor,
      carPrivateHireLicense,
      carPrivateHireLicenseExpiry,
      carInsuranceExpiry,
      contact,
      driverLicense,
      driverLicenseExpiry,
      availability: parsedAvailability,
    });

    await newDriver.save();

    res.status(201).json({
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

    const currentDate = new Date();

    // Iterate over all drivers to check if any documents have expired
    const updatedDrivers = await Promise.all(drivers.map(async (driver) => {
      const {
        driverPrivateHireLicenseExpiry,
        carPrivateHireLicenseExpiry,
        carInsuranceExpiry,
        driverLicenseExpiry,
        motExpiryDate,
      } = driver;

      const isExpired =
        new Date(driverPrivateHireLicenseExpiry) < currentDate ||
        new Date(carPrivateHireLicenseExpiry) < currentDate ||
        new Date(carInsuranceExpiry) < currentDate ||
        new Date(driverLicenseExpiry) < currentDate ||
        new Date(motExpiryDate) < currentDate;

      // If expired, update the status to 'Expired' and save it in the database
      if (isExpired && driver.status !== "Expired") {
        driver.status = "Expired";
        await driver.save(); // Save the updated status in the database
      }

      return {
        ...driver.toObject(),
        status: isExpired ? "Expired" : driver.status,
      };
    }));

    res.status(200).json(updatedDrivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
};





const deleteDriverById = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await Driver.findById(id);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    if (driver.status === "Deleted" ) {
      await Driver.findByIdAndDelete(id);
      return res.status(200).json({ message: "Driver permanently deleted" });
    } else {
      driver.status = "Deleted";
      await driver.save();
      return res.status(200).json({ message: "Driver status set to 'Deleted'" });
    }
    
  } catch (err) {
    console.error("Error deleting driver:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
const updateDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;
    const updateData = { ...req.body };

    // Parse availability
    if (req.body['availability[0].from']) {
      const availability = [];
      let i = 0;
      while (req.body[`availability[${i}].from`] && req.body[`availability[${i}].to`]) {
        availability.push({
          from: new Date(req.body[`availability[${i}].from`]),
          to: new Date(req.body[`availability[${i}].to`]),
        });
        i++;
      }
      updateData.availability = availability;
    }

    // Parse vehicleTypes if it's a string
    if (updateData.vehicleTypes && typeof updateData.vehicleTypes === "string") {
      updateData.vehicleTypes = updateData.vehicleTypes.split(",");
    }

    // Handle file uploads
    if (req.files) {
      const fileFields = [
        "driverPicture", "privateHireCard", "dvlaCard", "carPicture",
        "privateHireCarPaper", "driverPrivateHirePaper", "insurance",
        "motExpiry", "V5"
      ];
      fileFields.forEach(field => {
        if (req.files[field]) {
          updateData[field] = req.files[field][0].path;
        }
      });
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
