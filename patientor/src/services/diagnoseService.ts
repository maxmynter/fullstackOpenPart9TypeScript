import diagnoseData from "../../data/diagnoses";
import { DiagnoseEntry } from "../types";

const getDiagnoseEntries = (): DiagnoseEntry[] => {
  return diagnoseData;
};

export default { getDiagnoseEntries };
