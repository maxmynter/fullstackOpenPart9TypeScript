import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { DiagnoseEntry, Entry, Patient } from "../../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const DisplayEntry = ({
  entry,
  diagnoseCodes,
}: {
  entry: Entry;
  diagnoseCodes: DiagnoseEntry[];
}) => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ marginRight: 5 }}>{entry.date}</p>{" "}
        <p>{entry.description}</p>
      </div>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code} style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: 3 }}>{code}</p>
              <p>
                {
                  diagnoseCodes.find(
                    (diagnosisEntry) => diagnosisEntry.code === code
                  )?.name
                }
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DisplayPatient = ({
  patient,
  diagnoseCodes,
}: {
  patient: Patient;
  diagnoseCodes: DiagnoseEntry[];
}) => {
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
        <DisplayEntry
          key={entry.id}
          entry={entry}
          diagnoseCodes={diagnoseCodes}
        />
      ))}
    </div>
  );
};

const PatientPage = ({ diagnoseCodes }: { diagnoseCodes: DiagnoseEntry[] }) => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState<Patient | undefined>(
    undefined
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
        <DisplayPatient patient={patientData} diagnoseCodes={diagnoseCodes} />
      ) : (
        <p>No patient Data for id {patientId} </p>
      )}
    </div>
  );
};

export default PatientPage;
