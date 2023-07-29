import axios from "axios";

import { apiBaseUrl } from "../constants";
import { DiagnoseEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<DiagnoseEntry[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const exports = { getAll };
export default exports;
