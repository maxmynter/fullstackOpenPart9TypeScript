import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const DisplayPatient = ({ patient }: { patient: Patient }) => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h1>{patient.name}</h1>
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </div>
      <p>SSN: {patient.ssn}</p>
      <p> Occupation: {patient.occupation}</p>
    </div>
  );
};

const PatientPage = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState<Patient | undefined>(
    undefined
  );
  console.log(
    "🚀 ~ file: index.tsx:12 ~ PatientPage ~ patientData:",
    patientData
  );

  useEffect(() => {
    const getPatientData = async () => {
      if (patientId !== undefined) {
        const returnedPatientData = await patientService.getByID(patientId);
        setPatientData(returnedPatientData);
      }
    };
    getPatientData();
  }, [patientId]);
  return (
    <div>
      {patientData ? (
        <DisplayPatient patient={patientData} />
      ) : (
        <p>No patient Data for id {patientId} </p>
      )}
    </div>
  );
};

export default PatientPage;
