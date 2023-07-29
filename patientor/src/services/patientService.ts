import { NonSensitivePatient, Patient, newPatient } from "../types";
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

export default {
  getPatientEntries,
  getNonSensitiveDPatientEntries,
  addPatientEntry,
  getPatientByID,
};
