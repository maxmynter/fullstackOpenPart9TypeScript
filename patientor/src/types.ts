export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export enum EntryType {
  Occupational = "OccupationalHealthcare",
  Check = "HealthCheck",
  hospital = "Hospital",
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Entry {
  id: string;
  date: string;
  type: EntryType;
  specialist: string;
  description: string;
  diagnosisCodes: string[];
}
export interface OccupationalHealthcareEntry extends Entry {
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends Entry {
  discharge: Discharge;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type newPatient = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
