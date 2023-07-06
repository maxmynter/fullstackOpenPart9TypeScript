import { NonSensitivePatient, Patient } from "../types";
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

export default { getPatientEntries, getNonSensitiveDPatientEntries };
