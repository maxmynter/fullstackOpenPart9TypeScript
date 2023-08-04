import {
  Entry,
  Gender,
  HospitalEntry,
  OccupationalHealthcareEntry,
  newHospitalEntry,
  newPatient,
  DiagnoseEntry,
  newEntry,
  EntryType,
  newOccupationalHealthcareEntry,
  SickLeave,
  Discharge,
  newHealthCheckEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isObject = (obj: unknown): obj is object => {
  return typeof obj === "object" || obj instanceof Object;
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
  throw new Error("Faulty Data, could not typecheck patient");
};

const parseDiagnosisCodes = (array: unknown): Array<DiagnoseEntry["code"]> => {
  if (!array || typeof array !== "object") {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry["code"]>;
  }

  return array as Array<DiagnoseEntry["code"]>;
};

const parseStringExists = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or entry, ${str}`);
  }
  return str;
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type)) {
    throw new Error(`Incorrect or entry, ${type}`);
  }
  if (
    !(
      type === EntryType.Occupational ||
      type === EntryType.Check ||
      type === EntryType.hospital
    )
  ) {
    throw new Error("Entry type must be of values in EntryType");
  }
  return type;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isObject(sickLeave)) {
    throw new Error("sick Leave must exist and be object");
  }

  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    if (isString(sickLeave.startDate) && isString(sickLeave.endDate)) {
      const newSickLeave: SickLeave = {
        startDate: sickLeave.startDate,
        endDate: sickLeave.endDate,
      };
      return newSickLeave;
    } else {
      throw new Error(
        "Sick Leave start and end date properties must be string"
      );
    }
  } else {
    throw new Error("Sick Leave must have start and end date properties");
  }
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isObject(discharge)) {
    throw new Error("Discharge must exist and be object");
  }
  if ("date" in discharge && "criteria" in discharge) {
    if (isString(discharge.date) && isString(discharge.criteria)) {
      const newDischarge: Discharge = {
        date: discharge.date,
        criteria: discharge.criteria,
      };
      return newDischarge;
    } else {
      throw new Error("Dischare Properties Date and Criteria must be string");
    }
  }
  throw new Error("Faulty Data in Discharge");
};

const parseHealtCheckEntry = (checkEntry: unknown): number => {
  if (!checkEntry || !isNumber(checkEntry)) {
    throw new Error("HealthCheckEntry must be number and exist.");
  }
  return checkEntry;
};

const toNewEntry = (
  object: unknown
): newHealthCheckEntry | newHospitalEntry | newOccupationalHealthcareEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "date" in object &&
    "type" in object &&
    "specialist" in object &&
    "description" in object &&
    "diagnosisCodes" in object
  ) {
    const newEntry: newEntry = {
      date: parseStringExists(object.date),
      type: parseType(object.type),
      specialist: parseStringExists(object.specialist),
      description: parseStringExists(object.description),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    if ("employerName" in object && "sickLeave" in object) {
      const newOccupationalHealthcareEntry: newOccupationalHealthcareEntry = {
        employerName: parseStringExists(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
        ...newEntry,
      };
      return newOccupationalHealthcareEntry;
    }
    if ("discharge" in object) {
      const newHospitalEntry: newHospitalEntry = {
        discharge: parseDischarge(object.discharge),
        ...newEntry,
      };
      return newHospitalEntry;
    }
    if ("healthCheckRating" in object) {
      const newHealthCheckEntry: newHealthCheckEntry = {
        healthCheckEntry: parseHealtCheckEntry(object.healthCheckRating),
        ...newEntry,
      };
      return newHealthCheckEntry;
    }
  }
  throw new Error("Faulty Data, could not typecheck Entry");
};

export default { toNewPatient, toNewEntry };
