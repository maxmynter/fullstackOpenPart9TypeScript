import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import {
  DiagnoseEntry,
  EntryType,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
} from "../../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const entryStyle = { border: "2px solid black", padding: "3px", margin: "5px" };

const DisplayDiagnosisCodes = ({
  entry,
  diagnoseCodes,
}: {
  entry: HospitalEntry;
  diagnoseCodes: DiagnoseEntry[];
}) => {
  return (
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
  );
};

const DisplayHospitalEntry = ({
  entry,
  diagnoseCodes,
}: {
  entry: HospitalEntry;
  diagnoseCodes: DiagnoseEntry[];
}) => {
  return (
    <div>
      <h2>Hospital Entry</h2>
      <DisplayDiagnosisCodes entry={entry} diagnoseCodes={diagnoseCodes} />
      {entry.discharge ? (
        <p>
          Discharged at {entry.discharge.date}, {entry.discharge.criteria}
        </p>
      ) : undefined}
    </div>
  );
};

const DisplayOccupationalEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <h2>Occupational Healthcare Visit</h2>
      {entry.sickLeave ? (
        <p>
          Sick leave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </p>
      ) : undefined}
    </div>
  );
};

const DisplayCheckupEntry = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div>
      <h2>Health Check</h2>
      <p>Health Rating: {entry.healthCheckRating}</p>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(`This should not have happened. Weird value ${value}`);
};

const DisplayEntry = ({
  entry,
  diagnoseCodes,
}: {
  entry: HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;
  diagnoseCodes: DiagnoseEntry[];
}) => {
  const RenderEntryDetails = () => {
    switch (entry.type) {
      case EntryType.hospital:
        return (
          <DisplayHospitalEntry entry={entry} diagnoseCodes={diagnoseCodes} />
        );
      case EntryType.Occupational:
        return <DisplayOccupationalEntry entry={entry} />;
      case EntryType.Check:
        return <DisplayCheckupEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div style={entryStyle}>
      <RenderEntryDetails />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ marginRight: 5 }}>{entry.date}</p>{" "}
        <p>{entry.description}</p>
      </div>
      <p>{entry.specialist}</p>
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
