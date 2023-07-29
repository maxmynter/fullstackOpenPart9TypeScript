import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Entry, Patient } from "../../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const DisplayEntry = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ marginRight: 5 }}>{entry.date}</p>{" "}
        <p>{entry.description}</p>
      </div>
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li>{code}</li>
        ))}
      </ul>
    </div>
  );
};

const DisplayPatient = ({ patient }: { patient: Patient }) => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h1>{patient.name}</h1>
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </div>
      <p>SSN: {patient.ssn}</p>
      <p> Occupation: {patient.occupation}</p>

      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <DisplayEntry entry={entry} />
      ))}
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
