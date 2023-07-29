import {
  Entry,
  Gender,
  HospitalEntry,
  OccupationalHealthcareEntry,
  newPatient,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing Name");
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }
  return dateOfBirth;
};

const parseSSN = (SSN: unknown): string => {
  if (!SSN || !isString(SSN)) {
    throw new Error("Incorrect or missing SSN");
  }
  return SSN;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  if (gender === "male" || gender === "female" || gender === "other") {
    return gender as Gender;
  }
  throw new Error("Gender has to be male, female or other");
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseEntries = (
  entries: unknown
): Array<Entry | HospitalEntry | OccupationalHealthcareEntry> => {
  if (!Array.isArray(entries)) {
    throw new Error("Entries must be of type array");
  }
  return entries as Array<Entry | HospitalEntry | OccupationalHealthcareEntry>;
};

const toNewPatient = (object: unknown): newPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };
    return newPatient;
  }
  throw new Error("Faulty Data");
};

export default toNewPatient;
