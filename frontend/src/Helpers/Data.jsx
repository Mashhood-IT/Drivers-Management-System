import React from "react";
import {
    User,
    Calendar,
    Mail,
    Phone,
    Car,
    MapPin,
    Award,
    FileText,
    Clock,
    Shield,
    CreditCard,
    CheckCircle,
    PersonStanding,
  } from "lucide-react";
export const FILE_FIELDS = [
  { key: "driverPicture", label: "Driver Picture", icon: <User /> },
  { key: "privateHireCard", label: "Private Hire  Card", icon: <CreditCard /> },
  { key: "dvlaCard", label: "DVLA Card", icon: <CreditCard /> },
  { key: "carPicture", label: "Car Picture", icon: <Car /> },
  {
    key: "privateHireCarPaper",
    label: "Private Hire Car Paper",
    icon: <FileText />,
  },
  {
    key: "driverPrivateHirePaper",
    label: "Driver Private Hire Paper",
    icon: <CreditCard />,
  },
  { key: "insurance", label: "Insurance", icon: <Shield /> },
  { key: "motExpiry", label: "MOT Expiry", icon: <Shield /> },
  { key: "V5", label: "V5", icon: <Shield /> },
];










export  const TEXT_FIELDS = [
  { key: "employeeNumber", label: "Employee Number", icon: <PersonStanding /> },
  { key: "status", label: "Status", icon: <CheckCircle /> },
  { key: "firstName", label: "First Name", icon: <User /> },
  { key: "surName", label: "Surname", icon: <User /> },
  { key: "email", label: "Email", icon: <Mail /> },
  { key: "contact", label: "Contact", icon: <Phone /> },
  { key: "address", label: "Address", icon: <MapPin /> },
  { key: "dateOfBirth", label: "Date of Birth", icon: <Calendar /> },
  {
    key: "driverPrivateHireLicense",
    label: "Driver Private Hire License",
    icon: <Award />,
  },
  {
    key: "driverPrivateHireLicenseExpiry",
    label: "Driver Private Hire License Expiry",
    icon: <Clock />,
  },
  { key: "driverLicense", label: "Driver License", icon: <FileText /> },
  {
    key: "driverLicenseExpiry",
    label: "Driver License Expiry",
    icon: <Clock />,
  },
  {
    key: "privateHireCardNo",
    label: "Private Hire Card Number",
    icon: <CreditCard />,
  },
  { key: "NationalInsurance", label: "National Insurance", icon: <Shield /> },
  {
    key: "availability",
    label: "Availability",
    icon: <CheckCircle />,
  },

];

export  const CAR_FIELDS = [
  { key: "carRegistration", label: "Car Registration", icon: <Car /> },
  { key: "vehicleTypes", label: "Vehicle Types", icon: <Car /> },
  { key: "carMake", label: "Car Make", icon: <Car /> },
  { key: "carModal", label: "Car Model", icon: <Car /> },
  { key: "carColor", label: "Car Color", icon: <Car /> },
  {
    key: "carPrivateHireLicense",
    label: "Car Private Hire License",
    icon: <Award />,
  },
  {
    key: "carPrivateHireLicenseExpiry",
    label: "Car Private Hire License Expiry",
    icon: <Clock />,
  },
  { key: "carInsuranceExpiry", label: "Car Insurance Expiry", icon: <Clock /> },
  { key: "motExpiryDate", label: "MOT Expiry Date", icon: <Clock /> },
];






// const fileFields = [
//   { id: "carPicture", label: "Upload Car Picture" },
//   { id: "privateHireCard", label: "Upload Private Hire Card" },
//   { id: "dvlaCard", label: "Upload DVLA Card" },
//   { id: "privateHireCarPaper", label: "Upload Private Hire Car Paper" },
//   { id: "driverPrivateHirePaper", label: "Upload Driver Private Hire Paper" },
//   { id: "insurance", label: "Upload Insurance Paper" },
//   { id: "motExpiry", label: "Upload MOT Expiry" },
//   { id: "V5", label: "Upload Vehicle Registration No." },
// ];