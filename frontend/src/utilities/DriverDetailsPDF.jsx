import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TEXT_FIELDS, CAR_FIELDS } from "../Helpers/Data";

const styles = StyleSheet.create({
  page: { 
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#3b82f6',
    borderBottomStyle: 'solid',
    paddingBottom: 8,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  section: { 
    marginBottom: 15, 
  },
  sectionHeading: { 
    fontSize: 16, 
    marginBottom: 8, 
    fontWeight: 'bold',
    color: '#1e40af',
    backgroundColor: '#eff6ff',
    padding: 5,
    borderRadius: 3,
  },
  field: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: { 
    fontSize: 11, 
    fontWeight: 'bold',
    width: '40%',
  },
  value: { 
    fontSize: 11,
    flex: 1,
  },
  availabilitySlot: {
    fontSize: 11,
    paddingLeft: 10,
    marginBottom: 3,
  },
  italic: {
    fontSize: 11,
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: 4,
  },
  footer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
    paddingTop: 6,
    fontSize: 8,
    color: 'gray',
    textAlign: 'center',
  },
});
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return "Invalid date";

  return date.toLocaleDateString('en-GB'); 
};


const DriverDetailsPDF = ({ driver }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Simple Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Driver Details</Text>
      </View>
      
      {/* Personal Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Personal Details</Text>
        {TEXT_FIELDS.map((field) => (
          field.key !== "availability" && (
            <View key={field.key} style={styles.field}>
              <Text style={styles.label}>{field.label}:</Text>
              <Text style={styles.value}>
                {Array.isArray(driver[field.key])
                  ? driver[field.key].join(", ")
                  : driver[field.key] || "Not provided"}
              </Text>
            </View>
          )
        ))}
      </View>

      {/* Availability Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Availability</Text>
        {Array.isArray(driver.availability) && driver.availability.length > 0 ? (
          driver.availability.slice(0, 3).map((slot, index) => (
            <View key={index} style={styles.availabilitySlot}>
              <Text>
                Slot {index + 1} — From: {formatDate(slot.from)} | To: {formatDate(slot.to)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.italic}>No availability provided</Text>
        )}
      </View>

      {/* Vehicle Details Section */}
      <View style={styles.section}>
  <Text style={styles.sectionHeading}>Vehicle Details</Text>
  {CAR_FIELDS.map((field) => {
    const value = driver[field.key];
    const isDateField = field.key.toLowerCase().includes("date") || field.key.toLowerCase().includes("expiry");

    let displayValue = "Not provided";

    if (value) {
      if (field.key === "vehicleTypes" && Array.isArray(value)) {
        displayValue = value.join(", ");
      } else {
        displayValue = isDateField ? formatDate(value) : value;
      }
    }

    return (
      <View key={field.key} style={styles.field}>
        <Text style={styles.label}>{field.label}:</Text>
        <Text style={styles.value}>{displayValue}</Text>
      </View>
    );
  })}
</View>

      
      {/* Simple Footer */}
      <View style={styles.footer}>
        <Text>Confidential Driver Information</Text>
      </View>
    </Page>
  </Document>
);

export default DriverDetailsPDF;    