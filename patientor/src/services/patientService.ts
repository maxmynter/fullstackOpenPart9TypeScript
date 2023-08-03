import {
  NonSensitivePatient,
  Patient,
  newHealthCheckEntry,
  newHospitalEntry,
  newOccupationalHealthcareEntry,
  newPatient,
} from "../types";
import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";

const getPatientEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveDPatientEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientByID = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addPatientEntry = (patient: newPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };

  patientData.push(newPatient);

  return newPatient;
};

const addEntryToPatient = ({
  targetId,
  entry,
}: {
  targetId: string;
  entry:
    | newHealthCheckEntry
    | newHospitalEntry
    | newOccupationalHealthcareEntry;
}): Patient => {
  const indexOfPatient = patientData.findIndex(
    (patient) => patient.id === targetId
  );
  if (indexOfPatient !== -1) {
    const entryWithId = { id: uuid(), ...entry };

    patientData[indexOfPatient].entries = [
      ...patientData[indexOfPatient].entries,
      entryWithId,
    ];
    return patientData[indexOfPatient];
  } else {
    throw new Error(`No patient with id : ${targetId}`);
  }
};

export default {
  getPatientEntries,
  getNonSensitiveDPatientEntries,
  addPatientEntry,
  getPatientByID,
  addEntryToPatient,
};
