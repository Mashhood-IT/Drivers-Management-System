



const mongoose = require("mongoose");

const driverProfileSchema = new mongoose.Schema({
employeeNumber: {type:String},
status: {type: String},
firstName: { type: String, required: true },
surName: { type: String},
driverPrivateHireLicense: { type: String },   
driverPrivateHireLicenseExpiry: { type: Date },
driverPicture: { type: String },
privateHireCardNo: { type: String },
privateHireCard: { type: String },
dvlaCard: { type: String },
NationalInsurance: { type: String },
dateOfBirth: { type: Date },
carRegistration: { type: String },
carPicture: { type: String },
privateHireCarPaper: { type: String },
driverPrivateHirePaper: { type: String },
insurance: { type: String },
motExpiry: { type: String }, //upload
motExpiryDate: {type:Date},
V5:{type:String}, //upload
email: { type: String},
address: { type: String },
vehicleTypes: { type: [String] }, 
carMake: { type: String },
carModal: { type: String },
carColor: { type: String },
carPrivateHireLicense: { type: String },
carPrivateHireLicenseExpiry: { type: Date },
carInsuranceExpiry: { type: Date },
contact: { type: String },
driverLicense: { type: String },
driverLicenseExpiry: { type: Date },
availability: {
    type: [
      {
        from: { type: Date, required: true },
        to: { type: Date, required: true }
      }
    ] ,
    _id: false
  } ,
createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DriverProfile", driverProfileSchema);
