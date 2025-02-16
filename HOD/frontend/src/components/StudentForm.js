"use client";

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  header: { textAlign: "center", fontSize: 14, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  checkbox: { flexDirection: "row", alignItems: "center" },
});

const StudentRequestPDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.header}>S Dept. App. No Request YYYY</Text>
        <Text style={styles.text}>To</Text>
        <Text style={styles.text}>The Director, Date: {new Date().toLocaleDateString()}</Text>
        <Text style={styles.text}>CMR Technical Campus, Kandlakoya (V), Medchal Road, Hyderabad – 501401.</Text>
        <Text style={styles.text}>Sir,</Text>
        <Text style={styles.text}>Sub: Request for issue of {formData.purpose} - Reg.</Text>
        <Text style={styles.text}>******</Text>
        <Text style={styles.text}>
          I, Mr./Ms. {formData.fullName} S/D/o {formData.fatherName}, am a Student of {formData.courseType} {formData.branchName} Year {formData.yearOfStudy} Sem {formData.semester}, bearing Roll No. {formData.rollNumber}.
        </Text>
        <Text style={styles.text}>I request you to kindly issue the following certificate(s) for the purpose of {formData.purpose}:</Text>
        {formData.certificates.map((cert, index) => (
          <Text key={index} style={styles.text}>• {cert}</Text>
        ))}
        {formData.otherCertificate && <Text style={styles.text}>Other: {formData.otherCertificate}</Text>}
        <Text style={styles.text}>Yours Sincerely,</Text>
        <Text style={styles.text}>Residential Address: {formData.residentialAddress}</Text>
        <Text style={styles.text}>Sign: ________________________</Text>
        <Text style={styles.text}>Name: {formData.fullName}</Text>
        <Text style={styles.text}>Roll No: {formData.rollNumber}</Text>
        <Text style={styles.text}>Mobile No: {formData.mobileNumber}</Text>
        <Text style={styles.text}>Branch: {formData.branchName}</Text>
      </View>
    </Page>
  </Document>
);

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    courseType: "",
    branchName: "",
    yearOfStudy: "",
    semester: "",
    rollNumber: "",
    purpose: "",
    certificates: [],
    otherCertificate: "",
    residentialAddress: "",
    mobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      certificates: checked
        ? [...prevState.certificates, value]
        : prevState.certificates.filter((cert) => cert !== value),
    }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Student Request Form</h2>
      <input type="text" name="fullName" placeholder="Full Name" className="border p-2 w-full mb-2" onChange={handleInputChange} />
      <input type="text" name="fatherName" placeholder="Father's Name" className="border p-2 w-full mb-2" onChange={handleInputChange} />
      <input type="text" name="courseType" placeholder="Course Type" className="border p-2 w-full mb-2" onChange={handleInputChange} />
      <input type="text" name="branchName" placeholder="Branch Name" className="border p-2 w-full mb-2" onChange={handleInputChange} />
      <input type="text" name="yearOfStudy" placeholder="Year of Study" className="border p-2 w-full mb-2" onChange={handleInputChange} />
      <input type="text" name="semester" placeholder="Semester" className="border p-2 w-full mb-2" onChange={handleInputChange} />
      <input type="text" name="rollNumber" placeholder="Roll Number" className="border p-2 w-full mb-2" onChange={handleInputChange} />
      <textarea name="purpose" placeholder="Purpose of Request" className="border p-2 w-full mb-2" onChange={handleInputChange}></textarea>
      <input type="text" name="residentialAddress" placeholder="Residential Address" className="border p-2 w-full mb-2" onChange={handleInputChange} />
      <input type="tel" name="mobileNumber" placeholder="Mobile Number" className="border p-2 w-full mb-2" onChange={handleInputChange} />
      <label>Certificates:</label>
      {["Bonafide", "Custodian", "Transfer Certificate (TC)", "Medium of Instructions", "Internship Letter", "Project Permission Letter", "Letter of Recommendation (LOR)", "Name Correction", "Course Completion", "Transcripts", "Grace Marks"].map((cert) => (
        <div key={cert}>
          <input type="checkbox" value={cert} onChange={handleCheckboxChange} /> {cert}
        </div>
      ))}
      <input type="text" name="otherCertificate" placeholder="Other Certificate" className="border p-2 w-full mt-2" onChange={handleInputChange} />
      <PDFDownloadLink document={<StudentRequestPDF formData={formData} />} fileName="student_request_form.pdf">
        {({ loading }) => (loading ? "Generating PDF..." : <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Download PDF</button>)}
      </PDFDownloadLink>
    </div>
  );
};

export default StudentForm;