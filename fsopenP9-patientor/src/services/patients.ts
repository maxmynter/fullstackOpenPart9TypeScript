import axios from "axios";
import {
  Patient,
  PatientFormValues,
  newHealthCheckEntry,
  newOccupationalHealthcareEntry,
  newHospitalEntry,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getByID = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const addPatientEntry = async (
  id: string,
  object:
    | newOccupationalHealthcareEntry
    | newHospitalEntry
    | newHealthCheckEntry
) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getByID,
  addPatientEntry,
};
