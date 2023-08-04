export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
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

export interface OccupationalHealthcareEntry extends Entry {
  type: EntryType.Occupational;
  employerName: string;
  sickLeave?: SickLeave;
}
export type newOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

export interface Entry {
  id: string;
  date: string;
  type: EntryType;
  specialist: string;
  description: string;
  diagnosisCodes: string[];
}

export interface HospitalEntry extends Entry {
  type: EntryType.hospital;
  discharge: Discharge;
}

export type newHospitalEntry = Omit<HospitalEntry, "id">;

export interface HealthCheckEntry extends Entry {
  type: EntryType.Check;
  healthCheckRating: number;
}

export type newHealthCheckEntry = Omit<HealthCheckEntry, "id">;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<
    HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry
  >;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
