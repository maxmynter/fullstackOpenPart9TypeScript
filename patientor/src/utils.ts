import { newPatient } from "./types";

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

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const toNewPatient = (object: unknown): newPatient => {
  console.log(object);

  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  }
  throw new Error("Faulty Data");
};

export default toNewPatient;
