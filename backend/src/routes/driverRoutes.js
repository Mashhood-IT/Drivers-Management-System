


const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const {getDriverById , createDriver, getAllDrivers, deleteDriverById, updateDriverById, getSecureAssetUrl } = require("../controller/driverController");

router.post(
  "/create-driver",
  upload.fields([
    { name: "driverPicture", maxCount: 1 },
    { name: "privateHireCard", maxCount: 1 },
    { name: "dvlaCard", maxCount: 1 },
    { name: "carPicture", maxCount: 1 },
    { name: "privateHireCarPaper", maxCount: 1 },
    { name: "driverPrivateHirePaper", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
    { name: "motExpiry", maxCount: 1 },
    { name: "V5", maxCount: 1 },
  ]),  
  createDriver
);  

router.get("/getAll-drivers", getAllDrivers);
router.get("/getDriverById/:id", getDriverById);
router.delete("/delete-drivers/:id", deleteDriverById);
router.put("/update-drivers/:id", upload.fields([
  { name: "driverPicture", maxCount: 1 },
  { name: "privateHireCard", maxCount: 1 },
  { name: "dvlaCard", maxCount: 1 },
  { name: "carPicture", maxCount: 1 },
  { name: "privateHireCarPaper", maxCount: 1 },
  { name: "driverPrivateHirePaper", maxCount: 1 },
  { name: "insurance", maxCount: 1 },
  { name: "motExpiry", maxCount: 1 },
  { name: "V5", maxCount: 1 },
])
, updateDriverById);

module.exports = router;
